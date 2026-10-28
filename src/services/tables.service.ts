import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../../data/tables.json');

export interface TableRow {
  position?: number;
  dorsal?: string;
  driver: string;
  car?: string;
  points: number;
  extra?: string;
}

export interface CustomTable {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  rows: TableRow[];
}

export class TablesService {
  private tables: Map<string, CustomTable> = new Map();
  private loaded = false;

  constructor() {
    this.ensureDataFile();
  }

  private ensureDataFile(): void {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
  }

  public async getAllTables(): Promise<CustomTable[]> {
    await this.load();
    return Array.from(this.tables.values());
  }

  public async getTableById(id: string): Promise<CustomTable | null> {
    await this.load();
    return this.tables.get(id) || null;
  }

  public async saveTable(table: CustomTable): Promise<void> {
    await this.load();
    this.tables.set(table.id, {
      ...table,
      updatedAt: new Date().toISOString(),
    });
    await this.save();
  }

  public async deleteTable(id: string): Promise<boolean> {
    await this.load();
    const deleted = this.tables.delete(id);
    if (deleted) {
      await this.save();
    }
    return deleted;
  }

  public async publishTableToDiscord(
    _client: unknown,
    _tableId: string
  ): Promise<boolean> {
    return false;
  }

  private async load(): Promise<void> {
    if (this.loaded) return;
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = await fs.promises.readFile(DATA_FILE, 'utf-8');
        const list: CustomTable[] = JSON.parse(raw);
        this.tables.clear();
        for (const t of list) {
          this.tables.set(t.id, t);
        }
      }
      this.loaded = true;
    } catch (error) {
      console.error('Error cargando tablas:', error);
      this.tables.clear();
      this.loaded = true;
    }
  }

  private async save(): Promise<void> {
    try {
      const list = Array.from(this.tables.values());
      await fs.promises.writeFile(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error guardando tablas:', error);
    }
  }
}

export const tablesService = new TablesService();
