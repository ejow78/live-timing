import { env } from '../config/env.js';
import { emperorService } from './emperor.service.js';
import { sessionsService, type SavedSession, type SavedSessionDriver } from './sessions.service.js';

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
  agoSeconds?: number;
  type: string;
  kind?: string;
  name: string;
  driverName: string;
  carModel: string;
  carName?: string;
  lap: number | string;
  cuts?: number;
  speed?: number;
  where?: string;
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
  skinName: string;
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
  bestState: string;
  lastLapFormatted: string;
  lastState: string;
  lastCuts: number;
  gap: string;
  interval: string;
  sectors: [string, string, string];
  sectorStates: [string, string, string];
  ballast: number;
  restrictor: number;
  incidentsCount: number;
  hits: number;
  status: string;
  isOnline: boolean;
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
  skinName: string;
  tyres: string;
  bestLapMs: number;
  bestLapFormatted: string;
  bestState?: string;
  lastLapFormatted: string;
  lastState?: string;
  lastCuts?: number;
  gap?: string;
  interval?: string;
  sectors?: [string, string, string];
  sectorStates?: [string, string, string];
  numLaps: number;
  topSpeedKmh: number;
  hits?: number;
  status?: string;
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
  championshipName: string;
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
  bestLap: string;
  bestBy: string;
  bestSectors: [string, string, string];
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
  private currentSessionId = '';
  private lastDiskSaveTime = 0;

  private allPlayersByGuid = new Map<string, LiveMapDriver>();
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
    championshipName: '',
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
    bestLap: '',
    bestBy: '',
    bestSectors: ['', '', ''],
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
    console.log('🏁 Iniciando LiveTimingService con polling a /public/live.json y auto-guardado de sesiones...');
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

  private extractChampionshipName(rawServerName: string): string {
    if (!rawServerName) return '';
    // Format: "LATAM Simracing Alliance - Ginetta GT4 Supercup" -> "Ginetta GT4 Supercup"
    const cleaned = rawServerName.replace(/^LATAM\s+Simracing\s+Alliance\s*[-–:]\s*/i, '').trim();
    if (cleaned && cleaned.toLowerCase() !== rawServerName.toLowerCase()) {
      return cleaned;
    }
    return '';
  }

  public getState(): LiveTelemetryState {
    const drivers = Array.from(this.allPlayersByGuid.values())
      .filter((d) => {
        // Pilotos online siempre se muestran
        if (d.isOnline && d.status !== 'gone') return true;
        // Pilotos desconectados (LEFT) solo se muestran si tienen vueltas o tiempos registrados en la sesión
        return d.numLaps > 0 || (d.bestLapMs && d.bestLapMs > 0);
      })
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
    const drivers = Array.from(this.allPlayersByGuid.values());
    const yellowSectorsSet = new Set<number>();
    let hasCheckered = false;
    let hasBlue = false;

    for (const d of drivers) {
      if (!d.isOnline) continue;
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

  private async persistCurrentSessionToDisk(data: RawLiveJson, sessionLabel: string, championshipName: string): Promise<void> {
    const trackKey = data.trackKey || '';
    if (!this.currentSessionId) {
      const now = new Date();
      const datePart = now.toISOString().split('T')[0]!;
      const timePart = now.toTimeString().split(' ')[0]!.replace(/:/g, '-');
      const safeLabel = sessionLabel.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const safeTrack = (data.trackKey || 'track').replace(/[^a-z0-9]+/g, '_');
      this.currentSessionId = `session_${datePart}_${timePart}_${safeTrack}_${safeLabel}`;
    }

    const drivers: SavedSessionDriver[] = Array.from(this.allPlayersByGuid.values())
      .filter((d) => d.numLaps > 0 || d.bestLapMs > 0)
      .map((d) => ({
        position: d.position,
        name: d.name,
        carName: d.carName,
        carModel: d.carModel,
        skinName: d.skinName,
        laps: d.numLaps,
        bestLap: d.bestLapFormatted,
        bestLapMs: d.bestLapMs,
        gap: d.gap,
        interval: d.interval,
        lastLap: d.lastLapFormatted,
        sectors: d.sectors,
        sectorStates: d.sectorStates,
        bestState: d.bestState,
        lastState: d.lastState,
        speedKmh: d.speedKmh,
        hits: d.hits,
        status: d.status,
        isOnline: d.isOnline,
      }))
      .sort((a, b) => a.position - b.position);

    if (drivers.length === 0) return;

    const sessionRecord: SavedSession = {
      id: this.currentSessionId,
      savedAt: new Date().toISOString(),
      championshipName: championshipName || 'LATAM Simracing Alliance',
      trackKey,
      trackName: data.trackName || data.session?.trackName || 'Circuito',
      sessionName: data.session?.name || 'Sesión',
      sessionType: sessionLabel,
      bestLap: data.bestLap || '',
      bestBy: data.bestBy || '',
      bestSectors: (data.bestSectors || ['', '', '']) as [string, string, string],
      totalDrivers: drivers.length,
      totalLaps: drivers.reduce((acc, d) => acc + d.laps, 0),
      drivers,
      events: data.events || [],
    };

    await sessionsService.saveSession(sessionRecord);
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
      const rawServerName = data.trackName || session.trackName || 'LATAM Simracing Alliance';
      const championshipName = this.extractChampionshipName(rawServerName);
      const sessionLabel = sessionsService.getSessionLabel(session.type || '', session.name || '');

      // Detección de cambio de sesión
      const fingerprint = `${trackKey}|${session.name || ''}|${sessionLabel}`;
      if (this.currentSessionFingerprint && this.currentSessionFingerprint !== fingerprint) {
        console.log(`🔄 Cambio de sesión detectado (${this.currentSessionFingerprint} ➔ ${fingerprint}).`);
        this.allPlayersByGuid.clear();
        this.storedTimesList = [];
        this.collisionsList = [];
        this.chatList = [];
        this.driverLapsMap.clear();
        this.processedEventKeys.clear();
        this.currentSessionId = '';
      }
      this.currentSessionFingerprint = fingerprint;

      this.state.serverName = rawServerName;
      this.state.championshipName = championshipName;
      this.state.trackId = session.track || trackKey.split('/')[0] || '';
      this.state.trackLayout = session.layout || trackKey.split('/')[1] || '';
      this.state.trackTitle = data.trackName || session.trackName || this.state.trackId || 'Circuito en vivo';
      this.state.trackLength = data.trackLength || '';
      this.state.sessionType = sessionLabel;
      this.state.sessionLaps = session.laps || 0;
      this.state.sessionDurationMinutes = session.timeLeftSec ? Math.round(session.timeLeftSec / 60) : 0;
      this.state.ambientTemp = typeof session.ambient === 'number' ? session.ambient : 20;
      this.state.roadTemp = typeof session.road === 'number' ? session.road : 26;

      this.state.bestLap = data.bestLap || '';
      this.state.bestBy = data.bestBy || '';
      const rawBestSectors = data.bestSectors || ['', '', ''];
      this.state.bestSectors = [
        rawBestSectors[0] || '',
        rawBestSectors[1] || '',
        rawBestSectors[2] || '',
      ];

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
      const storedMap = new Map<string, StoredSessionTime>();
      const players = Array.isArray(data.players) ? data.players : [];
      const serverClientsCount = typeof data.session?.clients === 'number' ? data.session.clients : null;

      // Si el servidor reporta 0 clientes conectados en total, nos aseguramos de que nadie quede 'online'
      if (serverClientsCount === 0) {
        for (const d of this.allPlayersByGuid.values()) {
          d.isOnline = false;
          d.status = 'gone';
          d.isInPits = false;
        }
      }

      players.forEach((p, idx) => {
        const rawName = (p.name || '').trim();
        const driverName = rawName || 'Piloto';
        const driverKey = rawName.toLowerCase() || String(p.id ?? idx);
        const guid = driverKey;
        const isOnline = p.status !== 'gone' && serverClientsCount !== 0;

        // Limpiar cualquier entrada previa con distinta clave (por ejemplo el slot ID cuando estaba conectado)
        for (const [oldKey, oldDriver] of this.allPlayersByGuid.entries()) {
          if (oldKey !== driverKey && oldDriver.name.trim().toLowerCase() === rawName.toLowerCase()) {
            this.allPlayersByGuid.delete(oldKey);
          }
        }
        const bestLapMs = parseLapTimeToMs(p.bestLap);
        const lastLapMs = parseLapTimeToMs(p.lastLap);
        const numLaps = Number(p.laps ?? 0);
        const speedKmh = Math.round(Number(p.speed ?? 0));
        const carModel = p.model || '';
        const carName = p.modelName || this.cleanCarModel(carModel);
        const skinName = p.skinName || p.skin || 'Default';

        const posX = Number(p.x ?? 0);
        const posY = Number(p.y ?? 0);
        const hasPos = Boolean(p.onMap && (posX !== 0 || posY !== 0));
        const pctX = mapWidth > 0 ? Math.max(0, Math.min(100, (posX / mapWidth) * 100)) : 0;
        const pctY = mapHeight > 0 ? Math.max(0, Math.min(100, (posY / mapHeight) * 100)) : 0;
        const spline = Number(p.progress ?? 0);
        const sector = spline < 0.333 ? 1 : spline < 0.666 ? 2 : 3;

        const rawSectors = Array.isArray(p.sectors) ? p.sectors : ['', '', ''];
        const sectors: [string, string, string] = [
          rawSectors[0] || '',
          rawSectors[1] || '',
          rawSectors[2] || '',
        ];

        const rawSectorStates = Array.isArray(p.sectorStates) ? p.sectorStates : ['', '', ''];
        const sectorStates: [string, string, string] = [
          rawSectorStates[0] || '',
          rawSectorStates[1] || '',
          rawSectorStates[2] || '',
        ];

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
              tyre: skinName,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
          }
          this.driverLapsMap.set(guid, driverLaps);
        }

        const existing = this.allPlayersByGuid.get(guid);

        const driverObj: LiveMapDriver = {
          guid,
          carId: Math.abs(Number(p.id ?? idx)),
          name: p.name || 'Piloto',
          initials: (p.name || 'PIL').slice(0, 3).toUpperCase(),
          raceNumber: idx + 1,
          carModel,
          carName,
          skinName,
          tyres: skinName,
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
          bestLapFormatted: p.bestLap && p.bestLap.trim() ? p.bestLap : '—',
          bestState: p.bestState || (p.bestLap && p.bestLap === data.bestLap ? 'session' : ''),
          lastLapFormatted: p.lastLap && p.lastLap.trim() ? p.lastLap : '—',
          lastState: p.lastState || '',
          lastCuts: Number(p.lastCuts ?? 0),
          gap: p.gap || '',
          interval: p.interval || '',
          sectors,
          sectorStates,
          ballast: 0,
          restrictor: 0,
          incidentsCount: Number(p.collisions ?? 0),
          hits: Number(p.collisions ?? 0),
          status: p.status || (isOnline ? 'track' : 'gone'),
          isOnline,
          hasPosition: hasPos,
          worldX: posX,
          worldZ: posY,
          mapPixelX: posX,
          mapPixelY: posY,
          mapPercentX: Math.round(pctX * 100) / 100,
          mapPercentY: Math.round(pctY * 100) / 100,
          color: existing?.color || DRIVER_COLORS[idx % DRIVER_COLORS.length]!,
          laps: driverLaps,
        };

        this.allPlayersByGuid.set(guid, driverObj);

        if (numLaps > 0 || bestLapMs > 0) {
          storedMap.set(`${guid}_${carModel}`, {
            guid,
            name: driverObj.name,
            carModel,
            carName,
            skinName,
            tyres: skinName,
            bestLapMs,
            bestLapFormatted: driverObj.bestLapFormatted,
            bestState: driverObj.bestState,
            lastLapFormatted: driverObj.lastLapFormatted,
            lastState: driverObj.lastState,
            lastCuts: driverObj.lastCuts,
            gap: driverObj.gap,
            interval: driverObj.interval,
            sectors,
            sectorStates,
            numLaps,
            topSpeedKmh: driverObj.topSpeedKmh,
            hits: driverObj.hits,
            status: driverObj.status,
            isOnline,
          });
        }
      });

      this.storedTimesList = Array.from(storedMap.values()).sort((a, b) => {
        if (a.bestLapMs > 0 && b.bestLapMs > 0) return a.bestLapMs - b.bestLapMs;
        if (a.bestLapMs > 0) return -1;
        if (b.bestLapMs > 0) return 1;
        return b.numLaps - a.numLaps;
      });

      // Procesar eventos de incidentes, récords y registro
      if (Array.isArray(data.events)) {
        for (const ev of data.events) {
          const evKey = `${ev.at}_${ev.kind}_${ev.name}_${ev.where || ''}_${ev.lap || ''}_${ev.cuts || ''}`;
          if (this.processedEventKeys.has(evKey)) continue;
          this.processedEventKeys.add(evKey);

          const now = new Date();
          let category = 'Incidente';
          let typeLabel = '';
          const driver = ev.name || 'Piloto';
          const lapTime = ev.lap ? String(ev.lap).trim() : '';
          const carName = ev.carName || '';

          switch (ev.kind) {
            case 'personal':
              category = 'Mejora';
              typeLabel = `mejora a ${lapTime}`;
              break;
            case 'session':
            case 'fastest':
              category = 'Récord';
              typeLabel = `récord de sesión en ${lapTime}`;
              break;
            case 'cut': {
              category = 'Corte';
              const cutsCount = Number(ev.cuts ?? 1);
              typeLabel = `vuelta ${lapTime} no cuenta: ${cutsCount} ${cutsCount === 1 ? 'corte' : 'cortes'}`;
              break;
            }
            case 'wall':
              category = 'Incidente';
              typeLabel = `choca contra el muro${ev.speed ? ` a ${ev.speed} km/h` : ''}${ev.where ? ` en ${ev.where}` : ''}`;
              break;
            case 'contact':
              category = 'Incidente';
              typeLabel = `contacto con otro vehículo${ev.speed ? ` a ${ev.speed} km/h` : ''}`;
              break;
            case 'join':
              category = 'Conexión';
              typeLabel = 'se unió al servidor';
              break;
            case 'leave':
              category = 'Conexión';
              typeLabel = 'salió del servidor';
              break;
            default:
              category = 'Evento';
              typeLabel = ev.kind || 'evento registrado';
              break;
          }

          this.serverLogList.unshift({
            id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            time: now.toISOString(),
            timeFormatted: ev.at || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            agoSeconds: typeof ev.ago === 'number' ? ev.ago : 0,
            type: category,
            kind: ev.kind || 'unknown',
            name: typeLabel,
            driverName: driver,
            carModel: carName,
            carName,
            lap: lapTime,
            cuts: typeof ev.cuts === 'number' ? ev.cuts : undefined,
            speed: typeof ev.speed === 'number' ? ev.speed : undefined,
            where: ev.where || '',
            triggeredBy: 'Race Control',
            context: ev.speed ? `${ev.speed} km/h` : (ev.where || ''),
          });

          if (ev.kind === 'wall' || ev.kind === 'contact') {
            const collisionItem: LiveCollisionEvent = {
              id: `col-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              timestamp: now.toISOString(),
              timeFormatted: ev.at || now.toLocaleTimeString(),
              epochMs: now.getTime() - (ev.ago ? ev.ago * 1000 : 0),
              driverGuid: ev.name,
              driverName: ev.name,
              carName,
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

        // Ordenar serverLogList por agoSeconds (menor tiempo = más reciente primero)
        this.serverLogList.sort((a, b) => {
          if (typeof a.agoSeconds === 'number' && typeof b.agoSeconds === 'number' && a.agoSeconds !== b.agoSeconds) {
            return a.agoSeconds - b.agoSeconds;
          }
          return new Date(b.time).getTime() - new Date(a.time).getTime();
        });

        if (this.serverLogList.length > 100) this.serverLogList.length = 100;
        if (this.collisionsList.length > 40) this.collisionsList.length = 40;
      }

      // Procesar y FILTRAR chat
      if (Array.isArray(data.chat)) {
        const cleanChat: LiveChatMessage[] = [];
        for (const c of data.chat) {
          const rawMsg = (c.text || c.message || '').trim();
          if (!rawMsg) continue;

          // Filtrar protocolos internos de CSP y ACP
          if (rawMsg.includes('$CSP0:') || rawMsg.includes('ACP:') || rawMsg.startsWith('Server → Spotter')) {
            continue;
          }

          cleanChat.push({
            id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            time: c.at || new Date().toISOString(),
            timeFormatted: c.at || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            driverGuid: '',
            driverName: c.name || 'Piloto',
            message: rawMsg,
          });
        }
        if (cleanChat.length > 0) {
          this.chatList = cleanChat.slice(0, 60);
        }
      }

      // Auto-guardado en disco cada 20 segundos mientras haya datos
      const nowMs = Date.now();
      if (nowMs - this.lastDiskSaveTime >= 20000 && this.storedTimesList.length > 0) {
        this.lastDiskSaveTime = nowMs;
        void this.persistCurrentSessionToDisk(data, sessionLabel, championshipName);
      }

      this.emitUpdate();
    } catch {
      this.state.connectedToWs = false;
    } finally {
      this.isPolling = false;
    }
  }
}

export const liveTimingService = new LiveTimingService();
