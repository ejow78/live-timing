import { env } from '../config/env.js';
import { emperorService } from './emperor.service.js';

export interface DriverLapRecord {
  lapNumber: number;
  lapTimeMs: number;
  lapFormatted: string;
  isPersonalBest: boolean;
  topSpeedKmh: number;
  tyre: string;
  timestamp: string;
}

export interface LiveChatMessage {
  id: string;
  time: string;
  timeFormatted: string;
  driverGuid: string;
  driverName: string;
  message: string;
}

export interface LiveServerLog {
  id: string;
  time: string;
  timeFormatted: string;
  type: string;
  name: string;
  driverName: string;
  carModel: string;
  lap: number | string;
  triggeredBy: string;
  context: string;
}

export interface LiveMapDriver {
  guid: string;
  carId: number;
  name: string;
  initials: string;
  raceNumber: number;
  carModel: string;
  carName: string;
  tyres: string;
  position: number;
  isInPits: boolean;
  ping: number;
  speedKmh: number;
  topSpeedKmh: number;
  gear: number;
  gearDisplay: string;
  rpm: number;
  maxRpm: number;
  rpmPct: number;
  steerAngle: number;
  steerDeg: number;
  throttlePct: number;
  brakePct: number;
  longitudinalG: number;
  drsActive: boolean;
  blueFlag: boolean;
  yellowFlag: boolean;
  hasCompletedSession: boolean;
  currentSector: number;
  splinePct: number;
  deltaToBestMs: number;
  deltaToSelfMs: number;
  deltaToBestFormatted: string;
  deltaToSelfFormatted: string;
  headingDeg: number;
  numLaps: number;
  bestLapMs: number;
  bestLapFormatted: string;
  lastLapFormatted: string;
  gap: string;
  ballast: number;
  restrictor: number;
  incidentsCount: number;
  hasPosition: boolean;
  worldX: number;
  worldZ: number;
  mapPixelX: number;
  mapPixelY: number;
  mapPercentX: number;
  mapPercentY: number;
  color: string;
  laps: DriverLapRecord[];
}

export interface StoredSessionTime {
  guid: string;
  name: string;
  carModel: string;
  carName: string;
  tyres: string;
  bestLapMs: number;
  bestLapFormatted: string;
  lastLapFormatted: string;
  numLaps: number;
  topSpeedKmh: number;
  isOnline: boolean;
}

export interface LiveCollisionEvent {
  id: string;
  timestamp: string;
  timeFormatted: string;
  epochMs: number;
  driverGuid: string;
  driverName: string;
  carName: string;
  otherDriverName: string;
  type: 'car' | 'environment';
  typeLabel: string;
  speedKmh: number;
  sector: number;
  worldX: number;
  worldZ: number;
  mapPercentX: number;
  mapPercentY: number;
  damageZones: [number, number, number, number];
}

export interface LiveTelemetryState {
  connectedToWs: boolean;
  realtimePosIntervalMs: number;
  serverName: string;
  trackId: string;
  trackLayout: string;
  trackTitle: string;
  trackCity: string;
  trackCountry: string;
  trackLength: string;
  sessionType: string;
  sessionDurationMinutes: number;
  sessionWaitTimeSeconds: number;
  sessionLaps: number;
  sessionStartTime: string;
  elapsedSeconds: number;
  ambientTemp: number;
  roadTemp: number;
  joinUrl: string;
  password: string;
  mapImageUrl: string;
  previewImageUrl: string;
  trackFlag: 'green' | 'yellow' | 'blue' | 'checkered';
  trackFlagTitle: string;
  trackFlagSubtitle: string;
  yellowSectors: number[];
  mapData: {
    width: number;
    height: number;
    margin: number;
    scaleFactor: number;
    offsetX: number;
    offsetY: number;
    padding: number;
  };
  drivers: LiveMapDriver[];
  storedTimes: StoredSessionTime[];
  collisions: LiveCollisionEvent[];
  chat: LiveChatMessage[];
  serverLogs: LiveServerLog[];
  updatedAt: string;
}

interface RawLiveJsonPlayer {
  id: number;
  name: string;
  nation?: string;
  model: string;
  skin?: string;
  modelName?: string;
  skinName?: string;
  for?: string;
  loaded?: boolean;
  speed?: number;
  gear?: string;
  laps?: number;
  lastLap?: string;
  bestLap?: string;
  collisions?: number;
  x?: number;
  y?: number;
  onMap?: boolean;
  heading?: number;
  moving?: boolean;
  position?: number;
  posChange?: number;
  gap?: string;
  interval?: string;
  bestState?: string;
  lastState?: string;
  lastCuts?: number;
  sectors?: string[];
  sectorStates?: string[];
  progress?: number;
  status?: string;
  badge?: string;
}

interface RawLiveJsonEvent {
  at: string;
  ago?: number;
  kind: string;
  name: string;
  carName?: string;
  speed?: number;
  where?: string;
  lap?: string;
  cuts?: number;
}

interface RawLiveJson {
  running: boolean;
  online: boolean;
  feedEnabled?: boolean;
  feedActive?: boolean;
  session?: {
    name?: string;
    type?: string;
    track?: string;
    layout?: string;
    trackName?: string;
    weatherName?: string;
    timeLeft?: string;
    timeLeftSec?: number;
    laps?: number;
    timeOfDay?: string;
    weather?: string;
    ambient?: number;
    road?: number;
    grip?: number;
    wind?: number;
    clients?: number;
    slots?: number;
  };
  players?: RawLiveJsonPlayer[];
  chat?: Array<{ at?: string; name?: string; text?: string; message?: string }>;
  collisions?: unknown[];
  map?: { width: number; height: number };
  race?: boolean;
  bestLap?: string;
  bestBy?: string;
  bestSectors?: string[];
  leaderLaps?: number;
  events?: RawLiveJsonEvent[];
  corners?: Array<{ name: string; x: number; y: number }>;
  trackLength?: string;
  uptime?: string;
  trackKey?: string;
  trackName?: string;
  pluginStarted?: boolean;
}

const DRIVER_COLORS = [
  '#00f5d4',
  '#f59e0b',
  '#ec4899',
  '#3b82f6',
  '#a855f7',
  '#10b981',
  '#ef4444',
  '#06b6d4',
  '#84cc16',
  '#f97316',
];

type StateListener = (state: LiveTelemetryState) => void;

function parseLapTimeToMs(lap: string | undefined): number {
  if (!lap || typeof lap !== 'string') return 0;
  const trimmed = lap.trim();
  if (!trimmed || trimmed === '-' || trimmed === 'Sin tiempo') return 0;
  const parts = trimmed.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0]!, 10) || 0;
    const secParts = parts[1]!.split('.');
    const seconds = parseInt(secParts[0]!, 10) || 0;
    const millis = parseInt((secParts[1] || '0').padEnd(3, '0').slice(0, 3), 10) || 0;
    return minutes * 60000 + seconds * 1000 + millis;
  }
  if (parts.length === 1) {
    const secParts = parts[0]!.split('.');
    const seconds = parseInt(secParts[0]!, 10) || 0;
    const millis = parseInt((secParts[1] || '0').padEnd(3, '0').slice(0, 3), 10) || 0;
    return seconds * 1000 + millis;
  }
  return 0;
}

export class LiveTimingService {
  private pollTimer: NodeJS.Timeout | null = null;
  private isPolling = false;
  private currentSessionFingerprint = '';

  private driversByGuid = new Map<string, LiveMapDriver>();
  private storedTimesList: StoredSessionTime[] = [];
  private collisionsList: LiveCollisionEvent[] = [];
  private chatList: LiveChatMessage[] = [];
  private serverLogList: LiveServerLog[] = [];
  private driverLapsMap = new Map<string, DriverLapRecord[]>();
  private listeners = new Set<StateListener>();
  private processedEventKeys = new Set<string>();

  private state: LiveTelemetryState = {
    connectedToWs: false,
    realtimePosIntervalMs: 1000,
    serverName: 'LATAM SimRacing Alliance',
    trackId: '',
    trackLayout: '',
    trackTitle: 'Cargando circuito...',
    trackCity: '',
    trackCountry: '',
    trackLength: '',
    sessionType: 'Práctica',
    sessionDurationMinutes: 0,
    sessionWaitTimeSeconds: 0,
    sessionLaps: 0,
    sessionStartTime: new Date().toISOString(),
    elapsedSeconds: 0,
    ambientTemp: 20,
    roadTemp: 26,
    joinUrl: emperorService.getContentManagerJoinButtonUrl(),
    password: env.AC_SERVER_PASSWORD || '',
    mapImageUrl: '',
    previewImageUrl: '',
    trackFlag: 'green',
    trackFlagTitle: 'BANDERA VERDE',
    trackFlagSubtitle: 'Pista libre en todos los sectores',
    yellowSectors: [],
    mapData: {
      width: 1600,
      height: 1600,
      margin: 20,
      scaleFactor: 1,
      offsetX: 0,
      offsetY: 0,
      padding: 20,
    },
    drivers: [],
    storedTimes: [],
    collisions: [],
    chat: [],
    serverLogs: [],
    updatedAt: new Date().toISOString(),
  };

  public start(): void {
    if (this.pollTimer) return;
    console.log('🏁 Iniciando LiveTimingService con polling a /public/live.json...');
    void this.pollLiveJson();
    this.pollTimer = setInterval(() => {
      void this.pollLiveJson();
    }, 1000);
  }

  public stop(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private cleanCarModel(carModel: string): string {
    if (!carModel) return 'Auto';
    return carModel
      .replace(/^ks_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  public getState(): LiveTelemetryState {
    const drivers = Array.from(this.driversByGuid.values())
      .map((d) => ({
        ...d,
        laps: this.driverLapsMap.get(d.guid) || [],
      }))
      .sort((a, b) => (a.position || 999) - (b.position || 999));

    return {
      ...this.state,
      drivers,
      storedTimes: this.storedTimesList,
      collisions: this.collisionsList.slice(0, 20),
      chat: this.chatList.slice(0, 60),
      serverLogs: this.serverLogList.slice(0, 60),
      updatedAt: new Date().toISOString(),
    };
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emitUpdate(): void {
    this.recomputeFlags();
    if (this.listeners.size === 0) return;
    const snapshot = this.getState();
    for (const listener of this.listeners) {
      try {
        listener(snapshot);
      } catch {
        // Ignorar listener con error
      }
    }
  }

  private recomputeFlags(): void {
    const now = Date.now();
    const drivers = Array.from(this.driversByGuid.values());
    const yellowSectorsSet = new Set<number>();
    let hasCheckered = false;
    let hasBlue = false;

    for (const d of drivers) {
      if (d.hasCompletedSession) hasCheckered = true;
      if (d.blueFlag) hasBlue = true;
      if (!d.isInPits && d.hasPosition && d.speedKmh > 0 && d.speedKmh < 25) {
        d.yellowFlag = true;
        yellowSectorsSet.add(d.currentSector || 1);
      } else {
        d.yellowFlag = false;
      }
    }

    for (const c of this.collisionsList) {
      if (now - c.epochMs <= 15000) {
        yellowSectorsSet.add(c.sector || 1);
      }
    }

    const yellowSectors = Array.from(yellowSectorsSet).sort();
    this.state.yellowSectors = yellowSectors;

    if (hasCheckered) {
      this.state.trackFlag = 'checkered';
      this.state.trackFlagTitle = 'BANDERA A CUADROS';
      this.state.trackFlagSubtitle = 'Sesión finalizada';
    } else if (yellowSectors.length > 0) {
      this.state.trackFlag = 'yellow';
      this.state.trackFlagTitle = `BANDERA AMARILLA — SECTOR ${yellowSectors.join(', ')}`;
      this.state.trackFlagSubtitle = 'Precaución: vehículo lento o incidente en pista';
    } else if (hasBlue) {
      this.state.trackFlag = 'blue';
      this.state.trackFlagTitle = 'BANDERA AZUL EN PISTA';
      this.state.trackFlagSubtitle = 'Ceder el paso a un vehículo más rápido';
    } else {
      this.state.trackFlag = 'green';
      this.state.trackFlagTitle = 'BANDERA VERDE';
      this.state.trackFlagSubtitle = 'Pista libre en todos los sectores';
    }
  }

  private translateSessionType(type?: string): string {
    if (!type) return 'Práctica';
    const lower = type.toLowerCase();
    if (lower.includes('race') || lower.includes('carrera')) return 'Carrera';
    if (lower.includes('qual') || lower.includes('clasif')) return 'Clasificación';
    return 'Práctica';
  }

  private async pollLiveJson(): Promise<void> {
    if (this.isPolling) return;
    this.isPolling = true;

    try {
      const baseUrl = env.EMPEROR_WEB_URL.replace(/\/+$/, '');
      const response = await fetch(`${baseUrl}/public/live.json`, {
        headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
        signal: AbortSignal.timeout(4000),
      });

      if (!response.ok) {
        this.state.connectedToWs = false;
        return;
      }

      const data = (await response.json()) as RawLiveJson;
      if (!data) return;

      this.state.connectedToWs = Boolean(data.online && data.running);

      const session = data.session || {};
      const trackKey = data.trackKey || (session.track ? (session.layout ? `${session.track}/${session.layout}` : session.track) : '');
      const sessionName = session.name || 'Sesión LSA';
      const sessionType = this.translateSessionType(session.type);

      // Detección de cambio de sesión / campeonato / circuito
      const fingerprint = `${trackKey}|${sessionName}|${sessionType}`;
      if (this.currentSessionFingerprint && this.currentSessionFingerprint !== fingerprint) {
        console.log(`🔄 Cambio de sesión detectado (${this.currentSessionFingerprint} ➔ ${fingerprint}). Limpiando datos de sesión previa...`);
        this.driversByGuid.clear();
        this.storedTimesList = [];
        this.collisionsList = [];
        this.chatList = [];
        this.driverLapsMap.clear();
        this.processedEventKeys.clear();
      }
      this.currentSessionFingerprint = fingerprint;

      this.state.serverName = data.trackName || session.trackName || 'LATAM Simracing Alliance';
      this.state.trackId = session.track || trackKey.split('/')[0] || '';
      this.state.trackLayout = session.layout || trackKey.split('/')[1] || '';
      this.state.trackTitle = data.trackName || session.trackName || this.state.trackId || 'Circuito en vivo';
      this.state.trackLength = data.trackLength || '';
      this.state.sessionType = sessionType;
      this.state.sessionLaps = session.laps || 0;
      this.state.sessionDurationMinutes = session.timeLeftSec ? Math.round(session.timeLeftSec / 60) : 0;
      this.state.ambientTemp = typeof session.ambient === 'number' ? session.ambient : 20;
      this.state.roadTemp = typeof session.road === 'number' ? session.road : 26;

      const mapWidth = data.map?.width && data.map.width > 0 ? data.map.width : 1600;
      const mapHeight = data.map?.height && data.map.height > 0 ? data.map.height : 1600;
      this.state.mapData = {
        width: mapWidth,
        height: mapHeight,
        margin: 20,
        scaleFactor: 1,
        offsetX: 0,
        offsetY: 0,
        padding: 20,
      };

      if (trackKey) {
        this.state.mapImageUrl = `${baseUrl}/public/live/map.png?t=${encodeURIComponent(trackKey)}`;
        this.state.previewImageUrl = `${baseUrl}/content/tracks/${trackKey}/ui/preview.png`;
      }

      // Procesar pilotos
      const activeGuids = new Set<string>();
      const storedMap = new Map<string, StoredSessionTime>();

      const players = Array.isArray(data.players) ? data.players : [];
      players.forEach((p, idx) => {
        const guid = String(p.id ?? idx);
        const isOnline = p.status !== 'gone';
        const bestLapMs = parseLapTimeToMs(p.bestLap);
        const lastLapMs = parseLapTimeToMs(p.lastLap);
        const numLaps = Number(p.laps ?? 0);
        const speedKmh = Math.round(Number(p.speed ?? 0));
        const carModel = p.model || '';
        const carName = p.modelName || this.cleanCarModel(carModel);

        // Actualizar StoredSessionTimes si dio vueltas o marcó tiempo
        if (numLaps > 0 || bestLapMs > 0) {
          storedMap.set(`${guid}_${carModel}`, {
            guid,
            name: p.name || 'Piloto',
            carModel,
            carName,
            tyres: p.skinName || p.skin || '-',
            bestLapMs,
            bestLapFormatted: p.bestLap && p.bestLap.trim() ? p.bestLap : 'Sin tiempo',
            lastLapFormatted: p.lastLap && p.lastLap.trim() ? p.lastLap : 'Sin tiempo',
            numLaps,
            topSpeedKmh: speedKmh,
            isOnline,
          });
        }

        // Si está en la sesión (conectado)
        if (isOnline) {
          activeGuids.add(guid);

          const posX = Number(p.x ?? 0);
          const posY = Number(p.y ?? 0);
          const hasPos = Boolean(p.onMap && (posX !== 0 || posY !== 0));
          const pctX = mapWidth > 0 ? Math.max(0, Math.min(100, (posX / mapWidth) * 100)) : 0;
          const pctY = mapHeight > 0 ? Math.max(0, Math.min(100, (posY / mapHeight) * 100)) : 0;
          const spline = Number(p.progress ?? 0);
          const sector = spline < 0.333 ? 1 : spline < 0.666 ? 2 : 3;

          let driverLaps = this.driverLapsMap.get(guid);
          if (!driverLaps) {
            driverLaps = [];
            if (bestLapMs > 0) {
              driverLaps.push({
                lapNumber: numLaps || 1,
                lapTimeMs: bestLapMs,
                lapFormatted: p.bestLap || '',
                isPersonalBest: true,
                topSpeedKmh: speedKmh,
                tyre: p.skinName || '-',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              });
            }
            this.driverLapsMap.set(guid, driverLaps);
          }

          const existing = this.driversByGuid.get(guid);

          this.driversByGuid.set(guid, {
            guid,
            carId: Math.abs(Number(p.id ?? idx)),
            name: p.name || 'Piloto',
            initials: (p.name || 'PIL').slice(0, 3).toUpperCase(),
            raceNumber: idx + 1,
            carModel,
            carName,
            tyres: p.skinName || p.skin || '-',
            position: Number(p.position || idx + 1),
            isInPits: p.status === 'pit' || (!hasPos && speedKmh === 0),
            ping: 0,
            speedKmh,
            topSpeedKmh: Math.max(speedKmh, existing?.topSpeedKmh || 0),
            gear: p.gear === 'R' ? 0 : p.gear === 'N' ? 1 : parseInt(p.gear || '1', 10) + 1,
            gearDisplay: p.gear || 'N',
            rpm: 0,
            maxRpm: 8000,
            rpmPct: 0,
            steerAngle: 0,
            steerDeg: 0,
            throttlePct: 0,
            brakePct: 0,
            longitudinalG: 0,
            drsActive: false,
            blueFlag: false,
            yellowFlag: false,
            hasCompletedSession: false,
            currentSector: sector,
            splinePct: Math.round(spline * 1000) / 10,
            deltaToBestMs: 0,
            deltaToSelfMs: 0,
            deltaToBestFormatted: '0.000s',
            deltaToSelfFormatted: '0.000s',
            headingDeg: Math.round(Number(p.heading ?? 0)),
            numLaps,
            bestLapMs,
            bestLapFormatted: p.bestLap || 'Sin tiempo',
            lastLapFormatted: p.lastLap || 'Sin tiempo',
            gap: p.gap || p.interval || '',
            ballast: 0,
            restrictor: 0,
            incidentsCount: Number(p.collisions ?? 0),
            hasPosition: hasPos,
            worldX: posX,
            worldZ: posY,
            mapPixelX: posX,
            mapPixelY: posY,
            mapPercentX: Math.round(pctX * 100) / 100,
            mapPercentY: Math.round(pctY * 100) / 100,
            color: existing?.color || DRIVER_COLORS[idx % DRIVER_COLORS.length]!,
            laps: driverLaps,
          });
        }
      });

      // Eliminar pilotos que ya no están online
      for (const [guid] of this.driversByGuid) {
        if (!activeGuids.has(guid)) {
          this.driversByGuid.delete(guid);
        }
      }

      // Ordenar storedTimes
      this.storedTimesList = Array.from(storedMap.values()).sort((a, b) => {
        if (a.bestLapMs > 0 && b.bestLapMs > 0) return a.bestLapMs - b.bestLapMs;
        if (a.bestLapMs > 0) return -1;
        if (b.bestLapMs > 0) return 1;
        return b.numLaps - a.numLaps;
      });

      // Procesar eventos de incidentes y registro
      if (Array.isArray(data.events)) {
        for (const ev of data.events) {
          const evKey = `${ev.at}_${ev.kind}_${ev.name}_${ev.where || ''}_${ev.lap || ''}`;
          if (this.processedEventKeys.has(evKey)) continue;
          this.processedEventKeys.add(evKey);

          const now = new Date();
          let typeLabel = 'Incidente';
          if (ev.kind === 'wall') typeLabel = `Impacto contra muro (${ev.where || 'Pista'})`;
          else if (ev.kind === 'contact') typeLabel = 'Choque con otro vehículo';
          else if (ev.kind === 'cut') typeLabel = `Corte de pista (${ev.cuts || 1} cortes)`;
          else if (ev.kind === 'personal') typeLabel = `Mejor vuelta personal (${ev.lap || ''})`;
          else if (ev.kind === 'join') typeLabel = 'Piloto ingresó al servidor';
          else if (ev.kind === 'leave') typeLabel = 'Piloto salió del servidor';

          this.serverLogList.unshift({
            id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            time: now.toISOString(),
            timeFormatted: ev.at || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            type: ev.kind === 'cut' ? 'Corte' : ev.kind === 'join' || ev.kind === 'leave' ? 'Conexión' : 'Incidente',
            name: typeLabel,
            driverName: ev.name || 'Piloto',
            carModel: ev.carName || '',
            lap: ev.lap || 0,
            triggeredBy: 'Race Control',
            context: ev.speed ? `${ev.speed} km/h` : ev.where || '',
          });

          if (ev.kind === 'wall' || ev.kind === 'contact') {
            const collisionItem: LiveCollisionEvent = {
              id: `col-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              timestamp: now.toISOString(),
              timeFormatted: ev.at || now.toLocaleTimeString(),
              epochMs: now.getTime() - (ev.ago ? ev.ago * 1000 : 0),
              driverGuid: ev.name,
              driverName: ev.name,
              carName: ev.carName || '',
              otherDriverName: '',
              type: ev.kind === 'contact' ? 'car' : 'environment',
              typeLabel,
              speedKmh: Number(ev.speed ?? 0),
              sector: 1,
              worldX: 0,
              worldZ: 0,
              mapPercentX: 0,
              mapPercentY: 0,
              damageZones: [0, 0, 0, 0],
            };
            this.collisionsList.unshift(collisionItem);
          }
        }

        if (this.serverLogList.length > 80) this.serverLogList.length = 80;
        if (this.collisionsList.length > 30) this.collisionsList.length = 30;
      }

      this.emitUpdate();
    } catch (err) {
      this.state.connectedToWs = false;
      // No saturar consola en caso de timeouts normales
    } finally {
      this.isPolling = false;
    }
  }
}

export const liveTimingService = new LiveTimingService();
