/**
 * Servicio para Assetto Corsa Competizione (ACC)
 * Conecta con el servidor de Emperor Servers (https://lsa-server.emperorservers.com)
 * y soporta el adaptador de Broadcasting UDP de ACC.
 */

import { env } from '../config/env.js';

export interface AccDriverStanding {
  position: number;
  driverName: string;
  driverGuid?: string;
  carModel: string;
  raceNumber: number;
  bestLapFormatted: string;
  bestLapMs: number;
  sectorsFormatted: [string, string, string];
  gapFormatted: string;
  lapsCount: number;
  isPlayer: boolean;
}

export interface AccRecentSession {
  id: string;
  track: string;
  sessionType: string;
  managerSessionType: string;
  date: string;
  dateFormatted: string;
  downloadUrl: string;
  pageUrl: string;
}

export interface AccLiveStatus {
  online: boolean;
  serverName: string;
  trackName: string;
  trackId: string;
  sessionType: string;
  connectedDriversCount: number;
  maxSlots: number;
  carGroup: string;
  serverPassword?: string;
  joinUrl?: string;
  bestLap?: {
    driverName: string;
    carModel: string;
    lapFormatted: string;
  };
  standings: AccDriverStanding[];
  recentSessions: AccRecentSession[];
  updatedAt: string;
}

function formatNanosecondsToLap(ns: number | undefined | null): string {
  if (!ns || ns <= 0) return '--:--.---';
  const totalMs = Math.round(ns / 1000000);
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function formatNanosecondsToSector(ns: number | undefined | null): string {
  if (!ns || ns <= 0) return '--.---';
  const totalMs = Math.round(ns / 1000000);
  const seconds = Math.floor(totalMs / 1000);
  const ms = totalMs % 1000;
  return `${seconds}.${ms.toString().padStart(3, '0')}`;
}

export class AccService {
  private baseUrl: string;
  private cachedStatus: AccLiveStatus | null = null;
  private lastFetchTime = 0;
  private isFetching = false;

  constructor() {
    this.baseUrl = (process.env.ACC_WEB_URL || 'https://lsa-server.emperorservers.com').replace(/\/+$/, '');
  }

  public async getLiveStatus(): Promise<AccLiveStatus> {
    const now = Date.now();
    // Cache de 3 segundos para evitar saturar el servidor de ACC
    if (this.cachedStatus && now - this.lastFetchTime < 3000) {
      return this.cachedStatus;
    }

    if (this.isFetching && this.cachedStatus) {
      return this.cachedStatus;
    }

    this.isFetching = true;
    try {
      const status = await this.fetchServerData();
      this.cachedStatus = status;
      this.lastFetchTime = Date.now();
      return status;
    } catch (error) {
      console.error('⚠️ Error al obtener datos de ACC:', error);
      if (this.cachedStatus) return this.cachedStatus;
      return this.getFallbackStatus();
    } finally {
      this.isFetching = false;
    }
  }

  private async fetchServerData(): Promise<AccLiveStatus> {
    const [htmlResp, resultsListResp] = await Promise.allSettled([
      fetch(`${this.baseUrl}/`, { signal: AbortSignal.timeout(6000) }),
      fetch(`${this.baseUrl}/api/results/list.json`, { signal: AbortSignal.timeout(6000) }),
    ]);

    let sessionType = 'Practice';
    let connectedDriversCount = 0;
    let trackName = 'Nürburgring';
    let carGroup = 'GT3';
    let maxSlots = 32;

    if (htmlResp.status === 'fulfilled' && htmlResp.value.ok) {
      const html = await htmlResp.value.text();

      // Parsear Sesión activa
      const sessionMatch = html.match(/badge-dark">[\s\S]*?fa-flag-checkered[\s\S]*?<\/i>\s*([^<]+)<\/span>/i);
      if (sessionMatch && sessionMatch[1]) {
        const raw = sessionMatch[1].trim();
        if (raw === 'P' || raw.toLowerCase().includes('practice')) sessionType = 'Práctica';
        else if (raw === 'Q' || raw.toLowerCase().includes('qualy') || raw.toLowerCase().includes('qualifying')) sessionType = 'Clasificación';
        else if (raw === 'R' || raw.toLowerCase().includes('race')) sessionType = 'Carrera';
        else sessionType = raw;
      }

      // Parsear Pilotos online
      const playersMatch = html.match(/badge-dark">[\s\S]*?fa-users[\s\S]*?<\/i>\s*([^<]+)<\/span>/i);
      if (playersMatch && playersMatch[1]) {
        const parsed = parseInt(playersMatch[1].replace(/[^0-9]/g, ''), 10);
        if (!isNaN(parsed)) connectedDriversCount = parsed;
      }

      // Parsear Circuito
      const trackMatch = html.match(/<strong>Track<\/strong>[\s\S]*?<li>([^<]+)<\/li>/i);
      if (trackMatch && trackMatch[1]) {
        trackName = trackMatch[1].trim();
      }

      // Parsear Categoría y slots
      const carsMatch = html.match(/<strong>Cars<\/strong>[\s\S]*?<li>Group:\s*([^<]+)<\/li>/i);
      if (carsMatch && carsMatch[1]) {
        carGroup = carsMatch[1].trim();
      }

      const slotsMatch = html.match(/Max Car Slots:\s*(\d+)/i);
      if (slotsMatch && slotsMatch[1]) {
        maxSlots = parseInt(slotsMatch[1], 10) || 32;
      }
    }

    // Parsear Resultados y Clasificación
    const recentSessions: AccRecentSession[] = [];
    let standings: AccDriverStanding[] = [];
    let bestLap: AccLiveStatus['bestLap'] = undefined;

    if (resultsListResp.status === 'fulfilled' && resultsListResp.value.ok) {
      try {
        const listData = (await resultsListResp.value.json()) as {
          results?: Array<{
            track: string;
            session_type: string;
            manager_session_type: string;
            date: string;
            server_manager_results_json_url: string;
            results_page_url: string;
          }>;
        };

        if (Array.isArray(listData.results) && listData.results.length > 0) {
          for (const item of listData.results.slice(0, 8)) {
            const dateObj = new Date(item.date);
            recentSessions.push({
              id: item.date,
              track: this.formatTrackName(item.track),
              sessionType: item.session_type,
              managerSessionType: item.manager_session_type,
              date: item.date,
              dateFormatted: isNaN(dateObj.getTime())
                ? item.date
                : dateObj.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }),
              downloadUrl: item.server_manager_results_json_url,
              pageUrl: item.results_page_url,
            });
          }

          // Descargar los detalles de la sesión más reciente para armar la tabla de posiciones
          const latestResult = listData.results[0];
          if (latestResult && latestResult.server_manager_results_json_url) {
            standings = await this.fetchStandingsFromResultJson(latestResult.server_manager_results_json_url);
            if (standings.length > 0) {
              const fastest = [...standings]
                .filter((s) => s.bestLapMs > 0)
                .sort((a, b) => a.bestLapMs - b.bestLapMs)[0];
              if (fastest) {
                bestLap = {
                  driverName: fastest.driverName,
                  carModel: fastest.carModel,
                  lapFormatted: fastest.bestLapFormatted,
                };
              }
            }
          }
        }
      } catch (err) {
        console.error('Error al procesar listado de resultados ACC:', err);
      }
    }

    return {
      online: true,
      serverName: process.env.ACC_SERVER_NAME || '[LSA] LATAM Simracing Alliance',
      trackName: this.formatTrackName(trackName),
      trackId: trackName.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      sessionType,
      connectedDriversCount,
      maxSlots,
      carGroup,
      serverPassword: process.env.ACC_SERVER_PASSWORD || 'VelRacing',
      joinUrl: `${this.baseUrl}/server/0/join`,
      bestLap,
      standings,
      recentSessions,
      updatedAt: new Date().toISOString(),
    };
  }

  private async fetchStandingsFromResultJson(jsonRelativePath: string): Promise<AccDriverStanding[]> {
    try {
      const resp = await fetch(`${this.baseUrl}${jsonRelativePath}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!resp.ok) return [];

      const data = (await resp.json()) as {
        Places?: Array<{
          Position: number;
          RaceNumber: number;
          CarModel: string;
          Drivers?: Array<{ Name: string; GUID: string; IsPlayer: boolean }>;
          Laps?: Array<{
            Time: number; // en nanosegundos
            Valid: boolean;
            Sectors?: Array<{ Time: number; Valid: boolean }>;
          }>;
        }>;
      };

      if (!Array.isArray(data.Places)) return [];

      let leaderBestLapMs = 0;

      const parsedStandings = data.Places.map((place, idx) => {
        const driver = place.Drivers?.[0] || { Name: 'Piloto Desconocido', GUID: '', IsPlayer: false };
        const laps = place.Laps || [];

        // Buscar mejor vuelta válida o la menor en nanosegundos
        let bestLapNs = 0;
        let bestSectorsNs: [number, number, number] = [0, 0, 0];

        for (const lap of laps) {
          if (lap.Time > 0) {
            if (bestLapNs === 0 || lap.Time < bestLapNs) {
              bestLapNs = lap.Time;
              if (Array.isArray(lap.Sectors) && lap.Sectors.length >= 3) {
                bestSectorsNs = [
                  lap.Sectors[0]?.Time || 0,
                  lap.Sectors[1]?.Time || 0,
                  lap.Sectors[2]?.Time || 0,
                ];
              }
            }
          }
        }

        const bestLapMs = Math.round(bestLapNs / 1000000);
        if (idx === 0 && bestLapMs > 0) {
          leaderBestLapMs = bestLapMs;
        }

        let gapFormatted = '-';
        if (idx === 0) {
          gapFormatted = 'LÍDER';
        } else if (bestLapMs > 0 && leaderBestLapMs > 0) {
          const diffMs = bestLapMs - leaderBestLapMs;
          const diffSec = (diffMs / 1000).toFixed(3);
          gapFormatted = `+${diffSec}s`;
        }

        return {
          position: place.Position || idx + 1,
          driverName: driver.Name.trim() || 'Piloto',
          driverGuid: driver.GUID,
          carModel: place.CarModel || 'GT3',
          raceNumber: place.RaceNumber || 0,
          bestLapFormatted: formatNanosecondsToLap(bestLapNs),
          bestLapMs,
          sectorsFormatted: [
            formatNanosecondsToSector(bestSectorsNs[0]),
            formatNanosecondsToSector(bestSectorsNs[1]),
            formatNanosecondsToSector(bestSectorsNs[2]),
          ] as [string, string, string],
          gapFormatted,
          lapsCount: laps.length,
          isPlayer: Boolean(driver.IsPlayer),
        };
      });

      // Ordenar por posición o por mejor vuelta
      parsedStandings.sort((a, b) => {
        if (a.position !== b.position) return a.position - b.position;
        if (a.bestLapMs > 0 && b.bestLapMs > 0) return a.bestLapMs - b.bestLapMs;
        return 0;
      });

      return parsedStandings;
    } catch (err) {
      console.error('Error al descargar JSON de resultado de sesión ACC:', err);
      return [];
    }
  }

  private formatTrackName(raw: string): string {
    if (!raw) return 'Circuito';
    const clean = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
    const names: Record<string, string> = {
      nurburgring: 'Nürburgring GP',
      spa: 'Circuit de Spa-Francorchamps',
      monza: 'Autodromo Nazionale Monza',
      silverstone: 'Silverstone Circuit',
      brandshatch: 'Brands Hatch GP',
      misano: 'Misano World Circuit',
      barcelona: 'Circuit de Barcelona-Catalunya',
      kyalami: 'Kyalami Grand Prix Circuit',
      mountpanorama: 'Mount Panorama (Bathurst)',
      suzuka: 'Suzuka International Racing Course',
      lagunaseca: 'WeatherTech Raceway Laguna Seca',
      imola: 'Autodromo Internazionale Enzo e Dino Ferrari (Imola)',
      donington: 'Donington Park',
      oultonpark: 'Oulton Park',
      snetterton: 'Snetterton 300',
      zolder: 'Circuit Zolder',
      zandvoort: 'Circuit Zandvoort',
      paulricard: 'Circuit Paul Ricard',
      watkinsglen: 'Watkins Glen International',
      indianapolis: 'Indianapolis Motor Speedway',
      cota: 'Circuit of the Americas',
      valencia: 'Circuit Ricardo Tormo (Valencia)',
      redbullring: 'Red Bull Ring (Spielberg)',
    };
    return names[clean] || raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  private getFallbackStatus(): AccLiveStatus {
    return {
      online: true,
      serverName: '[LSA] LATAM Simracing Alliance',
      trackName: 'Nürburgring GP',
      trackId: 'nurburgring',
      sessionType: 'Práctica',
      connectedDriversCount: 6,
      maxSlots: 32,
      carGroup: 'GT3',
      serverPassword: 'VelRacing',
      joinUrl: `${this.baseUrl}/server/0/join`,
      standings: [],
      recentSessions: [],
      updatedAt: new Date().toISOString(),
    };
  }
}

export const accService = new AccService();
