import fs from 'node:fs';
import path from 'node:path';

export interface SavedSessionDriver {
  position: number;
  name: string;
  carName: string;
  carModel: string;
  skinName: string;
  laps: number;
  bestLap: string;
  bestLapMs: number;
  gap: string;
  interval: string;
  lastLap: string;
  sectors: string[];
  sectorStates: string[];
  bestState?: string;
  lastState?: string;
  speedKmh: number;
  hits: number;
  status: string;
  isOnline: boolean;
}

export interface SavedSession {
  id: string;
  savedAt: string;
  championshipName: string;
  trackKey: string;
  trackName: string;
  sessionName: string;
  sessionType: string;
  bestLap: string;
  bestBy: string;
  bestSectors: string[];
  totalDrivers: number;
  totalLaps: number;
  drivers: SavedSessionDriver[];
  events: Array<{
    at: string;
    ago?: number;
    kind: string;
    name: string;
    carName?: string;
    speed?: number;
    where?: string;
    lap?: string;
    cuts?: number;
  }>;
}

export interface SavedSessionSummary {
  id: string;
  savedAt: string;
  championshipName: string;
  trackName: string;
  sessionName: string;
  sessionType: string;
  bestLap: string;
  bestBy: string;
  totalDrivers: number;
  totalLaps: number;
}

const SESSIONS_DIR = path.resolve(process.cwd(), 'data', 'sessions');

export class SessionsService {
  private currentActiveSessionId: string | null = null;
  private sessionCounterByDateAndTrack = new Map<string, { practice: number; race: number }>();

  constructor() {
    this.ensureDir();
  }

  private ensureDir(): void {
    try {
      if (!fs.existsSync(SESSIONS_DIR)) {
        fs.mkdirSync(SESSIONS_DIR, { recursive: true });
      }
    } catch (err) {
      console.error('Error creating sessions directory:', err);
    }
  }

  public getSessionLabel(rawType: string, rawName: string): string {
    const lowerName = (rawName || '').toLowerCase();
    const lowerType = (rawType || '').toLowerCase();

    // Detección de Práctica 1, 2 / Carrera 1, 2 / Clasificación
    if (lowerName.includes('practice 1') || lowerName.includes('práctica 1') || lowerName.includes('fp1')) return 'Práctica 1';
    if (lowerName.includes('practice 2') || lowerName.includes('práctica 2') || lowerName.includes('fp2')) return 'Práctica 2';
    if (lowerName.includes('race 1') || lowerName.includes('carrera 1') || lowerName.includes('r1')) return 'Carrera 1';
    if (lowerName.includes('race 2') || lowerName.includes('carrera 2') || lowerName.includes('r2')) return 'Carrera 2';

    if (lowerType.includes('qual') || lowerType.includes('clasif') || lowerName.includes('qual')) {
      return 'Clasificación';
    }

    if (lowerType.includes('race') || lowerType.includes('carrera')) {
      return 'Carrera';
    }

    if (lowerType.includes('practice') || lowerType.includes('práctica') || lowerType.includes('booking')) {
      return 'Práctica';
    }

    return rawName || rawType || 'Práctica';
  }

  public async saveSession(session: SavedSession): Promise<void> {
    this.ensureDir();
    if (!session || !session.id) return;

    try {
      const filePath = path.join(SESSIONS_DIR, `${session.id}.json`);
      await fs.promises.writeFile(filePath, JSON.stringify(session, null, 2), 'utf-8');
      this.currentActiveSessionId = session.id;
    } catch (err) {
      console.error('Error saving session to disk:', err);
    }
  }

  public async listSessions(): Promise<SavedSessionSummary[]> {
    this.ensureDir();
    try {
      const files = await fs.promises.readdir(SESSIONS_DIR);
      const jsonFiles = files.filter((f) => f.endsWith('.json'));

      const summaries: SavedSessionSummary[] = [];
      for (const file of jsonFiles) {
        try {
          const filePath = path.join(SESSIONS_DIR, file);
          const content = await fs.promises.readFile(filePath, 'utf-8');
          const data = JSON.parse(content) as SavedSession;
          if (data && data.id) {
            summaries.push({
              id: data.id,
              savedAt: data.savedAt,
              championshipName: data.championshipName || 'LSA',
              trackName: data.trackName || '',
              sessionName: data.sessionName || '',
              sessionType: data.sessionType || 'Práctica',
              bestLap: data.bestLap || '—',
              bestBy: data.bestBy || '—',
              totalDrivers: data.totalDrivers || (data.drivers ? data.drivers.length : 0),
              totalLaps: data.totalLaps || 0,
            });
          }
        } catch {
          // Ignorar archivo corrupto
        }
      }

      // Más recientes primero
      return summaries.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()).slice(0, 30);
    } catch {
      return [];
    }
  }

  public async getSession(id: string): Promise<SavedSession | null> {
    this.ensureDir();
    try {
      const sanitized = path.basename(id).replace(/\.json$/, '');
      const filePath = path.join(SESSIONS_DIR, `${sanitized}.json`);
      if (!fs.existsSync(filePath)) return null;

      const content = await fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(content) as SavedSession;
    } catch {
      return null;
    }
  }
}

export const sessionsService = new SessionsService();
