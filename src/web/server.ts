import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';
import { emperorService } from '../services/emperor.service.js';
import { liveTimingService } from '../services/livetiming.service.js';
import { sessionsService } from '../services/sessions.service.js';
import crypto from 'node:crypto';
import { tablesService, type CustomTable } from '../services/tables.service.js';
import { supabaseService, getSupabase } from '../services/supabase.service.js';
import { telemetryParser } from '../services/telemetry-parser.service.js';
import { DASHBOARD_HTML, ACC_COMING_SOON_HTML } from './dashboard.html.js';
import { ADMIN_HTML } from './admin.html.js';
import { renderRegistrationPage } from './pages/registration.page.js';
import { renderAdminLoginPage } from './pages/login.page.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function startWebServer(discordClient: any = null): http.Server {
  liveTimingService.start();

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      // 0. Servir Logo LSA Oficial
      if (req.method === 'GET' && (pathname === '/logo.png' || pathname === '/Logo_LSA.png' || pathname === '/favicon.ico')) {
        try {
          let logoPath = path.join(__dirname, 'logo.png');
          if (!fs.existsSync(logoPath)) {
            const fallback = path.resolve(process.cwd(), 'src/web/logo.png');
            if (fs.existsSync(fallback)) logoPath = fallback;
          }
          const logoBuf = await fs.promises.readFile(logoPath);
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400',
          });
          res.end(logoBuf);
          return;
        } catch {
          res.writeHead(404);
          res.end('Logo not found');
          return;
        }
      }

      const host = req.headers.host || '';
      const isLiveSubdomain = host.startsWith('live.');
      const isAdminSubdomain = host.startsWith('admin.');

      // ==========================================
      // AUTENTICACIÓN Y ACCESO STAFF / ADMIN
      // ==========================================

      // Login de Admin (Página)
      if (req.method === 'GET' && pathname === '/admin/login') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderAdminLoginPage());
        return;
      }

      // Procesar Login de Admin
      if (req.method === 'POST' && pathname === '/api/admin/login') {
        const raw = await readRawBody(req);
        let username = '';
        let password = '';
        if (req.headers['content-type']?.includes('application/json')) {
          try {
            const parsed = JSON.parse(raw);
            username = parsed.username || '';
            password = parsed.password || '';
          } catch {}
        } else {
          const params = new URLSearchParams(raw);
          username = params.get('username') || '';
          password = params.get('password') || '';
        }

        const userNames: Record<string, string> = {
          javi: 'Javier Weimann',
          'javier.weimann': 'Javier Weimann',
          alonso: 'Alonso Cabezas',
          'alonso.cabezas': 'Alonso Cabezas',
          felipe: 'Felipe Olivares',
          'felipe.olivares': 'Felipe Olivares',
          tiojota: 'El Tío Jota',
          jota: 'El Tío Jota',
          benjamin: 'Benjamín Braun',
          'benjamin.braun': 'Benjamín Braun',
        };

        const displayName = userNames[username.toLowerCase().trim()] || 'Staff LSA';

        if (password === env.ADMIN_PASSWORD) {
          const token = getAdminAuthToken();
          res.writeHead(302, {
            Location: '/admin',
            'Set-Cookie': [
              `lsa_auth=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
              `lsa_user=${encodeURIComponent(displayName)}; Path=/; SameSite=Lax; Max-Age=2592000`,
            ],
          });
          res.end();
          return;
        } else {
          res.writeHead(401, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(renderAdminLoginPage('Contraseña incorrecta.'));
          return;
        }
      }

      // Logout de Admin
      if (req.method === 'GET' && (pathname === '/api/admin/logout' || pathname === '/admin/logout')) {
        res.writeHead(302, {
          Location: '/admin/login',
          'Set-Cookie': [
            'lsa_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
            'lsa_user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
          ],
        });
        res.end();
        return;
      }

      // Panel de Administración (Protegido con Login)
      if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/admin' || pathname === '/admin/')) {
        if (!isAuthenticatedAdmin(req)) {
          res.writeHead(302, { Location: '/admin/login' });
          res.end();
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : ADMIN_HTML);
        return;
      }

      // ==========================================
      // RUTAS PÚBLICAS (LIVE TIMING E INSCRIPCIONES)
      // ==========================================

      // 1. Portada / Inicio: Muestra directamente el Live Timing
      if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/' || pathname === '/index.html')) {
        if (isAdminSubdomain) {
          if (!isAuthenticatedAdmin(req)) {
            res.writeHead(302, { Location: '/admin/login' });
            res.end();
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(req.method === 'HEAD' ? '' : ADMIN_HTML);
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : DASHBOARD_HTML);
        return;
      }

      // 2. Formulario de Inscripciones (Assetto Corsa)
      if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/inscribirse' || pathname === '/inscripcion')) {
        const champ = url.searchParams.get('championship') || 'ginetta-gt4';
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : renderRegistrationPage(champ));
        return;
      }

      // 3. Live Timing en Vivo (ruta explícita)
      if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/live' || pathname === '/live/' || pathname === '/timing')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : DASHBOARD_HTML);
        return;
      }

      // 4. Página Proximamente Assetto Corsa Competizione
      if ((req.method === 'GET' || req.method === 'HEAD') && (pathname === '/acc' || pathname === '/competizione' || pathname === '/acc/')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : ACC_COMING_SOON_HTML);
        return;
      }

      // ==========================================
      // RUTAS API DE SUPABASE Y PLATAFORMA LSA
      // ==========================================

      // API: Clasificación / Standings
      if (req.method === 'GET' && pathname === '/api/standings') {
        const champ = url.searchParams.get('championship') || 'gt3-2026';
        const cat = url.searchParams.get('category') || undefined;
        const data = await supabaseService.getStandings(champ, cat);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
        return;
      }

      // API: Calendario / Fechas
      if (req.method === 'GET' && pathname === '/api/rounds') {
        const champ = url.searchParams.get('championship') || 'gt3-2026';
        const data = await supabaseService.getRounds(champ);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
        return;
      }

      // API: Noticias y Crónicas
      if (req.method === 'GET' && pathname === '/api/posts') {
        const data = await supabaseService.getPosts();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
        return;
      }

      // API: Reglamentos
      if (req.method === 'GET' && pathname === '/api/regulations') {
        const champ = url.searchParams.get('championship') || 'gt3-2026';
        const data = await supabaseService.getRegulations(champ);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
        return;
      }

      // API: Formulario de Inscripción de Piloto (Público)
      if (req.method === 'POST' && pathname === '/api/registrations') {
        const body = await readJsonBody<any>(req);
        if (!body.driver_name || !body.discord_tag || !body.car_choice || !body.race_number) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Faltan campos obligatorios' }));
          return;
        }
        const created = await supabaseService.registerDriver(body);
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(created));
        return;
      }

      // API: Ver Inscripciones (Admin)
      if (req.method === 'GET' && pathname === '/api/admin/registrations') {
        const data = await supabaseService.getRegistrations();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
        return;
      }

      // API: Parser de Telemetría (Admin - analiza JSON subido de ACC / AC)
      if (req.method === 'POST' && pathname === '/api/admin/parse-telemetry') {
        const body = await readJsonBody<any>(req);
        if (!body.rawJson) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'No se envió contenido JSON' }));
          return;
        }
        try {
          const parsed = telemetryParser.parseJson(body.rawJson);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(parsed));
        } catch (e: any) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }

      // API: Publicar Resultados a Supabase (Admin)
      if (req.method === 'POST' && pathname === '/api/admin/publish-results') {
        const body = await readJsonBody<any>(req);
        const { championship_slug, round_number, race_name, results } = body;
        if (!championship_slug || !round_number || !Array.isArray(results)) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Parámetros incompletos' }));
          return;
        }

        const supabase = getSupabase();
        // Guardar cada resultado en la tabla 'results'
        const rows = results.map((r: any) => ({
          championship_slug,
          round_number,
          race_name: race_name || 'Carrera',
          position: r.position,
          race_number: r.raceNumber,
          driver_name: r.driverName,
          car_name: r.carName,
          category: r.category,
          best_lap: r.bestLap,
          best_lap_ms: r.bestLapMs,
          s1: r.s1,
          s2: r.s2,
          s3: r.s3,
          is_vr: !!r.isVR,
          is_pole: !!r.isPole,
          penalty: r.penalty || null,
          points: r.points || 0,
        }));

        const { error: insertErr } = await supabase.from('results').insert(rows);
        if (insertErr) {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: insertErr.message }));
          return;
        }

        // Marcar la fecha como completed
        await supabase
          .from('rounds')
          .update({ status: 'completed' })
          .eq('championship_slug', championship_slug)
          .eq('round_number', round_number);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, inserted: rows.length }));
        return;
      }

      // API: Exportar EntryList en formato JSON (Admin)
      if (req.method === 'GET' && pathname === '/api/admin/export-entrylist') {
        const registrations = await supabaseService.getRegistrations();
        const entrylist = {
          entries: registrations.map((r: any) => ({
            drivers: [
              {
                firstName: r.driver_name.split(' ')[0] || r.driver_name,
                lastName: r.driver_name.split(' ').slice(1).join(' ') || '',
                playerID: r.steam_id || '',
              },
            ],
            raceNumber: r.race_number,
            forcedCarModel: -1,
            overrideCarModelForCustomCar: 0,
            ballastKG: 0,
            restrictor: 0,
            customCar: '',
            overrideDriverInfo: 1,
            defaultGridPosition: -1,
          })),
        };

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': 'attachment; filename="entrylist.json"',
        });
        res.end(JSON.stringify(entrylist, null, 2));
        return;
      }

      // 2. Estado y Mapa en Tiempo Real (snapshot HTTP)
      if ((req.method === 'GET' || req.method === 'HEAD') && pathname === '/api/live') {
        const state = liveTimingService.getState();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(req.method === 'HEAD' ? '' : JSON.stringify(state));
        return;
      }

      // 2b. Stream SSE instantáneo en Tiempo Real (0ms latencia en cada paquete de telemetría)
      if (req.method === 'GET' && pathname === '/api/live/stream') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        });

        // Enviar estado inicial de inmediato
        res.write(`data: ${JSON.stringify(liveTimingService.getState())}\n\n`);

        const unsubscribe = liveTimingService.subscribe((state) => {
          res.write(`data: ${JSON.stringify(state)}\n\n`);
        });

        req.on('close', () => {
          unsubscribe();
        });
        return;
      }

      // 2c. Historial de sesiones guardadas
      if (req.method === 'GET' && pathname === '/api/sessions') {
        const list = await sessionsService.listSessions();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(list));
        return;
      }

      // 2d. Detalle de una sesión guardada
      if (req.method === 'GET' && pathname.startsWith('/api/sessions/')) {
        const sessionId = pathname.replace('/api/sessions/', '').trim();
        const sessionDetail = await sessionsService.getSession(sessionId);
        if (!sessionDetail) {
          res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Session not found' }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(sessionDetail));
        return;
      }

      // 3. Resumen completo de Assetto Corsa
      if (req.method === 'GET' && pathname === '/api/ac/overview') {
        const [hotlaps, hotlapsByCar, championships, entryList, latestResult] =
          await Promise.all([
            emperorService.getTrackHotlaps(false),
            emperorService.getTrackHotlaps(true),
            emperorService.getChampionships(),
            emperorService.getEntryList(),
            emperorService.getLatestSessionResult(),
          ]);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(
          JSON.stringify({
            hotlaps,
            hotlapsByCar,
            championships,
            entryList,
            latestResult,
          })
        );
        return;
      }

      // 4. Perfil de Telemetría por Piloto
      if (req.method === 'GET' && pathname === '/api/ac/driver') {
        const nameQuery = url.searchParams.get('name') || undefined;
        const profile = await emperorService.getDriverProfile(nameQuery);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(profile));
        return;
      }

      // 5. Obtener todas las tablas (AC y ACC)
      if (req.method === 'GET' && pathname === '/api/tables') {
        const tables = await tablesService.getAllTables();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(tables));
        return;
      }

      // 6. Crear o Editar una Tabla (requiere contraseña de Admin)
      if (req.method === 'POST' && pathname === '/api/tables') {
        const adminPass = req.headers['x-admin-password'];
        if (adminPass !== env.ADMIN_PASSWORD) {
          res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }));
          return;
        }

        const body = await readJsonBody<CustomTable>(req);
        const saved = await tablesService.saveTable(body);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(saved));
        return;
      }

      // 7. Eliminar una Tabla
      const deleteMatch = pathname.match(/^\/api\/tables\/([^/]+)$/);
      if (req.method === 'DELETE' && deleteMatch) {
        const adminPass = req.headers['x-admin-password'];
        if (adminPass !== env.ADMIN_PASSWORD) {
          res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }));
          return;
        }

        const id = decodeURIComponent(deleteMatch[1]);
        const deleted = await tablesService.deleteTable(id);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ deleted }));
        return;
      }

      // 8. Publicar una Tabla directamente en Discord desde el Panel Web
      const publishMatch = pathname.match(/^\/api\/tables\/([^/]+)\/publish-discord$/);
      if (req.method === 'POST' && publishMatch) {
        const adminPass = req.headers['x-admin-password'];
        if (adminPass !== env.ADMIN_PASSWORD) {
          res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Contraseña de administrador incorrecta' }));
          return;
        }

        const id = decodeURIComponent(publishMatch[1]);
        const ok = await tablesService.publishTableToDiscord(discordClient, id);
        res.writeHead(ok ? 200 : 400, {
          'Content-Type': 'application/json; charset=utf-8',
        });
        res.end(JSON.stringify({ published: ok }));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    } catch (error) {
      console.error('Error en servidor web:', error);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Error interno del servidor' }));
    }
  });

  server.listen(env.WEB_PORT, '0.0.0.0', () => {
    console.log(`🌐 Portal Web & Live Timing corriendo en http://0.0.0.0:${env.WEB_PORT}`);
  });

  return server;
}

function readJsonBody<T>(req: http.IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += String(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw) as T);
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function readRawBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += String(chunk);
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

function parseCookies(req: http.IncomingMessage): Record<string, string> {
  const list: Record<string, string> = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      const name = parts.shift()?.trim();
      if (name) list[name] = decodeURIComponent(parts.join('=').trim());
    });
  }
  return list;
}

function getAdminAuthToken(): string {
  return crypto.createHash('sha256').update(env.ADMIN_PASSWORD + '_lsa_salt').digest('hex');
}

function isAuthenticatedAdmin(req: http.IncomingMessage): boolean {
  const cookies = parseCookies(req);
  if (cookies.lsa_auth && cookies.lsa_auth === getAdminAuthToken()) return true;
  if (req.headers['x-admin-password'] === env.ADMIN_PASSWORD) return true;
  return false;
}

