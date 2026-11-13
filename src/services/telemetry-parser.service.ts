export interface ParsedDriverResult {
  position: number;
  raceNumber: number;
  driverName: string;
  carName: string;
  category: 'PRO' | 'Rookie';
  bestLap: string;
  bestLapMs: number;
  s1: string;
  s2: string;
  s3: string;
  isPurpleS1?: boolean;
  isPurpleS2?: boolean;
  isPurpleS3?: boolean;
  isVR?: boolean;
  isPole?: boolean;
  penalty?: string;
  points: number;
}

export interface ParsedSessionResult {
  game: 'acc' | 'ac' | 'unknown';
  trackName: string;
  sessionType: 'RACE' | 'QUALIFY' | 'PRACTICE';
  bestLapOverall: string;
  bestS1Overall: string;
  bestS2Overall: string;
  bestS3Overall: string;
  results: ParsedDriverResult[];
}

export function formatMsToLaptime(ms: number): string {
  if (!ms || ms <= 0 || ms === 2147483647) return '--:--.---';
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = ms % 1000;
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
}

export function formatMsToSector(ms: number): string {
  if (!ms || ms <= 0 || ms === 2147483647) return '--.---';
  const seconds = Math.floor(ms / 1000);
  const millis = ms % 1000;
  return `${seconds}.${millis.toString().padStart(3, '0')}`;
}

// Escala de puntos estándar de LSA GT3
export const LSA_POINTS_SCALE = [35, 30, 26, 23, 20, 17, 14, 12, 10, 8, 6, 5, 4, 3, 2, 1];

export class TelemetryParserService {
  parseJson(rawContent: string): ParsedSessionResult {
    let data: any;
    try {
      data = typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
    } catch (e: any) {
      throw new Error(`El archivo no es un JSON válido: ${e.message}`);
    }

    if (data.sessionResult && Array.isArray(data.sessionResult.leaderBoardLines)) {
      return this.parseAccResult(data);
    } else if (Array.isArray(data.Result) || Array.isArray(data.Laps)) {
      return this.parseAcResult(data);
    } else if (Array.isArray(data.results) || Array.isArray(data.drivers)) {
      return this.parseGenericResult(data);
    }

    throw new Error('Formato de telemetría no reconocido. Asegúrate de que sea un resultado de ACC o Assetto Corsa.');
  }

  private parseAccResult(data: any): ParsedSessionResult {
    const sessionType = (data.sessionType === 'R' ? 'RACE' : data.sessionType === 'Q' ? 'QUALIFY' : 'PRACTICE') as any;
    const trackName = data.trackName || 'Pista ACC';
    const lines = data.sessionResult.leaderBoardLines;

    let bestOverallLapMs = Infinity;
    let bestOverallS1Ms = Infinity;
    let bestOverallS2Ms = Infinity;
    let bestOverallS3Ms = Infinity;
    let vrDriverIndex = -1;

    // Primer pase: encontrar récords y sectores morados
    lines.forEach((line: any, idx: number) => {
      const bestLap = line.timing?.bestLap || 0;
      if (bestLap > 0 && bestLap < bestOverallLapMs) {
        bestOverallLapMs = bestLap;
        vrDriverIndex = idx;
      }
      const splits = line.timing?.bestSplits || [];
      if (splits[0] && splits[0] < bestOverallS1Ms) bestOverallS1Ms = splits[0];
      if (splits[1] && splits[1] < bestOverallS2Ms) bestOverallS2Ms = splits[1];
      if (splits[2] && splits[2] < bestOverallS3Ms) bestOverallS3Ms = splits[2];
    });

    const results: ParsedDriverResult[] = lines.map((line: any, index: number) => {
      const driver = line.car?.drivers?.[0] || line.currentDriver || {};
      const firstName = driver.firstName || '';
      const lastName = driver.lastName || '';
      const driverName = `${firstName} ${lastName}`.trim() || 'Piloto desconocido';
      const raceNumber = line.car?.raceNumber || index + 1;
      const carName = this.resolveAccCarName(line.car?.carModel);
      const category = (line.car?.cupCategory === 0 ? 'PRO' : 'Rookie') as 'PRO' | 'Rookie';

      const timing = line.timing || {};
      const bestLapMs = timing.bestLap || 0;
      const splits = timing.bestSplits || [];

      const isVR = index === vrDriverIndex && bestLapMs > 0;
      const isPole = index === 0 && sessionType === 'QUALIFY';

      // Calcular puntos LSA
      let points = 0;
      if (sessionType === 'RACE') {
        points = LSA_POINTS_SCALE[index] || (index < 25 ? 1 : 0);
        if (isVR) points += 2;
      } else if (sessionType === 'QUALIFY' && isPole) {
        points = 2; // Bonificación de pole
      }

      return {
        position: index + 1,
        raceNumber,
        driverName,
        carName,
        category,
        bestLap: formatMsToLaptime(bestLapMs),
        bestLapMs,
        s1: formatMsToSector(splits[0]),
        s2: formatMsToSector(splits[1]),
        s3: formatMsToSector(splits[2]),
        isPurpleS1: splits[0] && splits[0] <= bestOverallS1Ms,
        isPurpleS2: splits[1] && splits[1] <= bestOverallS2Ms,
        isPurpleS3: splits[2] && splits[2] <= bestOverallS3Ms,
        isVR,
        isPole,
        points,
      };
    });

    return {
      game: 'acc',
      trackName,
      sessionType,
      bestLapOverall: formatMsToLaptime(bestOverallLapMs),
      bestS1Overall: formatMsToSector(bestOverallS1Ms),
      bestS2Overall: formatMsToSector(bestOverallS2Ms),
      bestS3Overall: formatMsToSector(bestOverallS3Ms),
      results,
    };
  }

  private parseAcResult(data: any): ParsedSessionResult {
    const rawResults = data.Result || [];
    const rawLaps = data.Laps || [];
    const trackName = data.TrackName ? this.formatTrackName(data.TrackName, data.TrackConfig) : 'Assetto Corsa';
    const sessionType = (data.Type?.toUpperCase().includes('RACE') ? 'RACE' : 'QUALIFY') as any;

    let bestOverallLapMs = Infinity;
    let bestOverallS1Ms = Infinity;
    let bestOverallS2Ms = Infinity;
    let bestOverallS3Ms = Infinity;
    let vrDriverIndex = -1;

    // Mapa de mejores sectores por piloto desde laps
    const driverBestSplits: Record<string, number[]> = {};
    rawLaps.forEach((lap: any) => {
      const driver = lap.DriverName || '';
      if (!driver) return;
      if (!driverBestSplits[driver]) driverBestSplits[driver] = [Infinity, Infinity, Infinity];
      const sectors = lap.Sectors || [];
      if (sectors[0] && sectors[0] > 0 && sectors[0] < driverBestSplits[driver][0]) {
        driverBestSplits[driver][0] = sectors[0];
        if (sectors[0] < bestOverallS1Ms) bestOverallS1Ms = sectors[0];
      }
      if (sectors[1] && sectors[1] > 0 && sectors[1] < driverBestSplits[driver][1]) {
        driverBestSplits[driver][1] = sectors[1];
        if (sectors[1] < bestOverallS2Ms) bestOverallS2Ms = sectors[1];
      }
      if (sectors[2] && sectors[2] > 0 && sectors[2] < driverBestSplits[driver][2]) {
        driverBestSplits[driver][2] = sectors[2];
        if (sectors[2] < bestOverallS3Ms) bestOverallS3Ms = sectors[2];
      }
    });

    rawResults.forEach((r: any, idx: number) => {
      const bestLap = r.BestLap || 0;
      if (bestLap > 0 && bestLap < bestOverallLapMs) {
        bestOverallLapMs = bestLap;
        vrDriverIndex = idx;
      }
    });

    const results: ParsedDriverResult[] = rawResults.map((r: any, index: number) => {
      const driverName = r.DriverName || 'Piloto desconocido';
      const carName = this.formatCarName(r.CarModel || 'Ginetta G55 GT4');
      const bestLapMs = r.BestLap || 0;
      const isVR = index === vrDriverIndex && bestLapMs > 0;
      const splits = driverBestSplits[driverName] || [0, 0, 0];

      let points = 0;
      if (sessionType === 'RACE') {
        points = LSA_POINTS_SCALE[index] || (index < 25 ? 1 : 0);
        if (isVR) points += 2;
      } else if (sessionType === 'QUALIFY' && index === 0) {
        points = 2; // Pole position
      }

      return {
        position: index + 1,
        raceNumber: index + 1,
        driverName,
        carName,
        category: 'PRO',
        bestLap: formatMsToLaptime(bestLapMs),
        bestLapMs,
        s1: formatMsToSector(splits[0]),
        s2: formatMsToSector(splits[1]),
        s3: formatMsToSector(splits[2]),
        isPurpleS1: splits[0] > 0 && splits[0] <= bestOverallS1Ms,
        isPurpleS2: splits[1] > 0 && splits[1] <= bestOverallS2Ms,
        isPurpleS3: splits[2] > 0 && splits[2] <= bestOverallS3Ms,
        isVR,
        points,
      };
    });

    return {
      game: 'ac',
      trackName,
      sessionType,
      bestLapOverall: formatMsToLaptime(bestOverallLapMs),
      bestS1Overall: formatMsToSector(bestOverallS1Ms),
      bestS2Overall: formatMsToSector(bestOverallS2Ms),
      bestS3Overall: formatMsToSector(bestOverallS3Ms),
      results,
    };
  }

  private formatTrackName(track: string, config?: string): string {
    const clean = track.replace(/^ks_/, '').replace(/_/g, ' ');
    const title = clean.charAt(0).toUpperCase() + clean.slice(1);
    return config ? `${title} (${config})` : title;
  }

  private parseGenericResult(data: any): ParsedSessionResult {
    const items = data.results || data.drivers || [];
    const results: ParsedDriverResult[] = items.map((item: any, idx: number) => ({
      position: item.position || idx + 1,
      raceNumber: item.raceNumber || idx + 1,
      driverName: item.driverName || item.name || 'Piloto',
      carName: item.carName || item.car || 'Auto',
      category: item.category || 'PRO',
      bestLap: item.bestLap || '--:--.---',
      bestLapMs: item.bestLapMs || 0,
      s1: item.s1 || '--.---',
      s2: item.s2 || '--.---',
      s3: item.s3 || '--.---',
      isVR: !!item.isVR,
      isPole: !!item.isPole,
      penalty: item.penalty,
      points: item.points ?? LSA_POINTS_SCALE[idx] ?? 0,
    }));

    return {
      game: 'unknown',
      trackName: data.trackName || 'Circuito',
      sessionType: 'RACE',
      bestLapOverall: '--:--.---',
      bestS1Overall: '--.---',
      bestS2Overall: '--.---',
      bestS3Overall: '--.---',
      results,
    };
  }

  private resolveAccCarName(modelId: number | string): string {
    const carMap: Record<string, string> = {
      '0': 'Porsche 991 GT3 R',
      '1': 'Mercedes-AMG GT3',
      '2': 'Ferrari 488 GT3',
      '3': 'Audi R8 LMS',
      '4': 'Lamborghini Huracán GT3',
      '5': 'McLaren 650S GT3',
      '6': 'Nissan GT-R Nismo GT3',
      '7': 'BMW M6 GT3',
      '8': 'Bentley Continental GT3',
      '9': 'Porsche 991 II GT3 Cup',
      '10': 'Nissan GT-R Nismo GT3 2018',
      '11': 'Bentley Continental GT3 2018',
      '12': 'Aston Martin Vantage V12 GT3',
      '13': 'Aston Martin Vantage V8 GT3',
      '14': 'Audi R8 LMS Evo',
      '15': 'Honda NSX GT3',
      '16': 'Lamborghini Huracán GT3 Evo',
      '17': 'Aston Martin Vantage AMR GT3',
      '18': 'Audi R8 LMS Evo II',
      '19': 'Ferrari 488 GT3 Evo',
      '20': 'BMW M4 GT3',
      '21': 'Ferrari 296 GT3',
      '22': 'Porsche 992 GT3 R',
      '23': 'Lamborghini Huracán GT3 Evo2',
      '24': 'McLaren 720S GT3 Evo',
      '25': 'Mercedes-AMG GT3 Evo',
    };
    return carMap[String(modelId)] || `GT3 #${modelId}`;
  }

  private formatCarName(raw: string): string {
    return raw
      .replace(/^ks_/, '')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export const telemetryParser = new TelemetryParserService();
