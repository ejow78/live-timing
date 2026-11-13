export const PORTAL_HTML = `<!DOCTYPE html>
<html lang="es" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latam Simracing Alliance · Campeonatos de Simracing de Latinoamérica</title>
  <meta name="description" content="Comunidad y ligas oficiales de simracing en Latinoamérica. Assetto Corsa Competizione y Assetto Corsa con Live Timing, comisarios y telemetría en tiempo real.">
  <link rel="icon" type="image/png" href="/logo.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              red: '#e10600',
              accent: '#38bdf8',
              card: '#0b1120',
              dark: '#030712'
            }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #030712; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .glass-nav { background: rgba(3, 7, 18, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .glass-card { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.07); }
    .glass-card:hover { border-color: rgba(225, 6, 0, 0.35); }
    .motorsport-glow { text-shadow: 0 0 20px rgba(225, 6, 0, 0.5); }
    .purple-sector { color: #d946ef; font-weight: 700; }
  </style>
</head>
<body class="text-slate-100 min-h-screen flex flex-col selection:bg-red-600 selection:text-white">

  <!-- NAVBAR -->
  <nav class="glass-nav sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3 group">
        <img src="/logo.png" alt="LATAM Simracing Alliance" class="h-11 w-auto object-contain transition group-hover:scale-105">
        <div class="hidden sm:block">
          <span class="text-sm font-black tracking-wider text-white uppercase block leading-tight">LATAM SIMRACING</span>
          <span class="text-[10px] tracking-widest text-red-500 font-bold uppercase block">ALLIANCE</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="/" class="text-white hover:text-red-400 transition">Inicio</a>
        <a href="#campeonatos" class="text-slate-300 hover:text-red-400 transition">Campeonatos</a>
        <a href="#clasificacion" class="text-slate-300 hover:text-red-400 transition">Clasificación</a>
        <a href="#calendario" class="text-slate-300 hover:text-red-400 transition">Calendario</a>
        <a href="/live" class="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-800/40">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Live Timing
        </a>
        <a href="#reglamento" class="text-slate-300 hover:text-red-400 transition">Reglamento</a>
      </div>

      <div class="flex items-center gap-3">
        <a href="#inscripcion" class="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center gap-2">
          <i class="fa-solid fa-flag-checkered"></i> Inscribirse
        </a>
        <a href="https://discord.gg/V9hq2EBSA" target="_blank" class="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white flex items-center justify-center transition" title="Discord Oficial">
          <i class="fa-brands fa-discord text-base"></i>
        </a>
        <a href="/admin" class="w-9 h-9 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition" title="Panel Staff">
          <i class="fa-solid fa-gear text-sm"></i>
        </a>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/60">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-slate-950 to-slate-950 -z-10"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6">
          <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> TEMPORADA 2026 EN DISPUTA
        </div>
        <h1 class="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6">
          Construyendo el futuro del <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">simracing</span> en Latam
        </h1>
        <p class="text-lg text-slate-400 mb-8 leading-relaxed">
          Ligas oficiales de <strong>Assetto Corsa Competizione</strong> y <strong>Assetto Corsa</strong> con comisarios deportivos, telemetría en tiempo real, tablas actualizadas y clasificación por marcas.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#inscripcion" class="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition shadow-xl shadow-red-600/30 flex items-center gap-2">
            <i class="fa-solid fa-helmet-un"></i> Inscríbete al GT3
          </a>
          <a href="/live" class="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl text-sm font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-satellite-dish"></i> Ver Live Timing
          </a>
          <a href="https://discord.gg/V9hq2EBSA" target="_blank" class="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800 text-slate-300 rounded-xl text-sm font-bold transition flex items-center gap-2">
            <i class="fa-brands fa-discord"></i> Discord LSA
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- HIGHLIGHT CARDS -->
  <section class="py-12 bg-slate-950 border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-card p-6 rounded-2xl transition">
        <div class="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center text-xl mb-4">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Campeonatos Oficiales</h3>
        <p class="text-sm text-slate-400">Ligas profesionales con calendario, comisarios dedicados, formato sprint & endurance y clasificación por marcas.</p>
      </div>
      <div class="glass-card p-6 rounded-2xl transition">
        <div class="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center text-xl mb-4">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Live Timing Instantáneo</h3>
        <p class="text-sm text-slate-400">Telemetría en vivo sin demora, tiempos de vuelta, sectores S1/S2/S3 morados y mapa de trazado interactivo.</p>
      </div>
      <div class="glass-card p-6 rounded-2xl transition">
        <div class="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center text-xl mb-4">
          <i class="fa-solid fa-users"></i>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">Comunidad Latinoamericana</h3>
        <p class="text-sm text-slate-400">Pilotos de toda la región: comparte setups, encuentra rivales en pista y compite en un ambiente limpio y de respeto.</p>
      </div>
    </div>
  </section>

  <!-- NOTICIAS Y CRÓNICAS -->
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black uppercase tracking-tight text-white">Últimas Noticias & Crónicas</h2>
          <p class="text-sm text-slate-400">Resúmenes de carreras y novedades oficiales de la liga</p>
        </div>
      </div>
      <div id="posts-container" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Poblado dinámicamente -->
      </div>
    </div>
  </section>

  <!-- CLASIFICACIÓN GT3 2026 -->
  <section id="clasificacion" class="py-16 bg-slate-950 border-t border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-red-500">ACC · Temporada 2026</span>
          <h2 class="text-3xl font-black uppercase tracking-tight text-white">Clasificación GT3 2026</h2>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="filterCategory('PRO')" id="btn-cat-pro" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-red-600 text-white shadow">PRO</button>
          <button onclick="filterCategory('Rookie')" id="btn-cat-rookie" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-white bg-slate-900 border border-slate-800">Rookie</button>
          <button onclick="filterCategory('Marca')" id="btn-cat-marca" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-white bg-slate-900 border border-slate-800">Marcas</button>
        </div>
      </div>

      <div class="glass-card rounded-2xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase bg-slate-900/90 text-slate-400 border-b border-slate-800">
              <tr>
                <th class="py-3.5 px-4">Pos</th>
                <th class="py-3.5 px-4">#</th>
                <th class="py-3.5 px-4">Piloto / Equipo</th>
                <th class="py-3.5 px-4">Vehículo</th>
                <th class="py-3.5 px-4">Cat.</th>
                <th class="py-3.5 px-4 text-center">Vic.</th>
                <th class="py-3.5 px-4 text-center">Pod.</th>
                <th class="py-3.5 px-4 text-center">Pole</th>
                <th class="py-3.5 px-4 text-right font-black text-white">Puntos</th>
              </tr>
            </thead>
            <tbody id="standings-tbody" class="divide-y divide-slate-800/60 font-mono text-xs">
              <!-- Cargando datos -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- CALENDARIO -->
  <section id="calendario" class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <span class="text-xs font-bold uppercase tracking-wider text-red-500">Temporada 2026</span>
        <h2 class="text-3xl font-black uppercase tracking-tight text-white">Calendario Oficial</h2>
        <p class="text-sm text-slate-400">8 fechas puntuables con diferentes formatos de carrera</p>
      </div>

      <div id="calendar-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Poblado dinámicamente -->
      </div>
    </div>
  </section>

  <!-- FORMULARIO DE INSCRIPCIÓN -->
  <section id="inscripcion" class="py-16 bg-slate-950 border-t border-slate-800/60">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <span class="text-xs font-bold uppercase tracking-wider text-red-500">Únete a la grilla oficial</span>
        <h2 class="text-3xl font-black uppercase tracking-tight text-white mt-1">Formulario de Inscripción</h2>
        <p class="text-sm text-slate-400 mt-2">Completa tus datos para competir en nuestros campeonatos. Los comisarios revisarán tu solicitud para asignarte cupo.</p>
      </div>

      <form onsubmit="handleRegistration(event)" class="glass-card p-8 rounded-2xl space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Nombre Completo / Piloto *</label>
            <input type="text" id="reg-name" required placeholder="Ej: Juan Pérez" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Usuario / Tag de Discord *</label>
            <input type="text" id="reg-discord" required placeholder="Ej: juanperez#1234 o @juanperez" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Campeonato *</label>
            <select id="reg-champ" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="gt3-2026">GT3 2026 (ACC)</option>
              <option value="ginetta-gt4">Ginetta GT4 (AC)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Vehículo Elegido *</label>
            <select id="reg-car" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="Mercedes-AMG GT3 Evo">Mercedes-AMG GT3 Evo</option>
              <option value="Porsche 992 GT3 R">Porsche 992 GT3 R</option>
              <option value="Aston Martin Vantage AMR GT3">Aston Martin Vantage AMR GT3</option>
              <option value="Ferrari 296 GT3">Ferrari 296 GT3</option>
              <option value="Audi R8 LMS Evo II">Audi R8 LMS Evo II</option>
              <option value="BMW M4 GT3">BMW M4 GT3</option>
              <option value="Lamborghini Huracán GT3 Evo2">Lamborghini Huracán GT3 Evo2</option>
              <option value="McLaren 720S GT3 Evo">McLaren 720S GT3 Evo</option>
              <option value="Ginetta G55 GT4">Ginetta G55 GT4 (AC)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Dorsal Deseado (1-999) *</label>
            <input type="number" id="reg-number" min="1" max="999" required placeholder="Ej: 24" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Categoría</label>
            <select id="reg-cat" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="PRO">PRO (Pilotos con experiencia previa)</option>
              <option value="Rookie" selected>Rookie (Pilotos en iniciación)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-400 mb-1">Steam ID (opcional)</label>
            <input type="text" id="reg-steam" placeholder="7656119..." class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono">
          </div>
        </div>

        <button type="submit" id="btn-submit-reg" class="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center justify-center gap-2">
          <i class="fa-solid fa-paper-plane"></i> Enviar Inscripción
        </button>
      </form>
    </div>
  </section>

  <!-- REGLAMENTO -->
  <section id="reglamento" class="py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <span class="text-xs font-bold uppercase tracking-wider text-red-500">Normativa LSA</span>
        <h2 class="text-3xl font-black uppercase tracking-tight text-white mt-1">Reglamento Oficial</h2>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-6 text-sm text-slate-300 leading-relaxed">
        <div>
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-flag text-red-500"></i> 1. Formatos de Carrera
          </h3>
          <p>• <strong>Doble Sprint:</strong> 2 mangas de 25 minutos con clasificación previa. La Carrera 2 puede contar con inversión de los 10 primeros clasificados.</p>
          <p class="mt-1">• <strong>Sprint + Mini Endurance:</strong> 1 carrera sprint de 20 min y 1 carrera de 40 min con parada de boxes obligatoria.</p>
          <p class="mt-1">• <strong>Endurance Pro:</strong> Carrera especial de 60 minutos con estrategia libre de neumáticos y carga de combustible.</p>
        </div>

        <div class="border-t border-slate-800 pt-4">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-star text-amber-400"></i> 2. Sistema de Puntuación
          </h3>
          <p>1º: 35 pts | 2º: 30 pts | 3º: 26 pts | 4º: 23 pts | 5º: 20 pts | 6º: 17 pts | 7º: 14 pts | 8º: 12 pts | 9º: 10 pts | 10º: 8 pts.</p>
          <p class="mt-1 text-xs text-slate-400">• Vuelta Rápida: +2 puntos | Pole Position: +2 puntos.</p>
        </div>

        <div class="border-t border-slate-800 pt-4">
          <h3 class="text-base font-bold text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-cyan-400"></i> 3. Superlicencia y Comisarios
          </h3>
          <p>Cada piloto arranca con 12 puntos en su Superlicencia. Los incidentes bajo investigación conllevan advertencias, recargos de tiempo o suspensión de mangas según la gravedad.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-slate-950 border-t border-slate-800/80 py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="LSA" class="h-9 w-auto object-contain">
        <div class="text-xs text-slate-500">
          © 2026 LATAM Simracing Alliance. Todos los derechos reservados.
        </div>
      </div>
      <div class="flex items-center gap-6 text-sm text-slate-400">
        <a href="#inscripcion" class="hover:text-white transition">Inscribirse</a>
        <a href="/live" class="hover:text-cyan-400 transition">Live Timing</a>
        <a href="https://discord.gg/V9hq2EBSA" target="_blank" class="hover:text-indigo-400 transition">Discord</a>
        <a href="https://www.instagram.com/latam_simracing_alliance/" target="_blank" class="hover:text-pink-400 transition">Instagram</a>
      </div>
    </div>
  </footer>

  <script>
    let currentCategory = 'PRO';

    async function init() {
      await Promise.all([loadStandings(), loadCalendar(), loadPosts()]);
    }

    async function loadStandings() {
      try {
        const res = await fetch('/api/standings?championship=gt3-2026&category=' + currentCategory);
        const data = await res.json();
        const tbody = document.getElementById('standings-tbody');

        if (!data || !data.length) {
          tbody.innerHTML = '<tr><td colspan="9" class="py-6 text-center text-slate-500">No hay datos registrados aún.</td></tr>';
          return;
        }

        tbody.innerHTML = data.map((d, idx) => \`
          <tr class="hover:bg-slate-800/40 transition">
            <td class="py-3 px-4 font-bold \${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-slate-400'}">P\${d.position || idx + 1}</td>
            <td class="py-3 px-4 text-slate-400 font-bold">\${d.race_number ? '#' + d.race_number : '—'}</td>
            <td class="py-3 px-4 font-semibold text-white">\${d.driver_name}</td>
            <td class="py-3 px-4 text-slate-300">\${d.car_name}</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700 font-sans">\${d.category}</span></td>
            <td class="py-3 px-4 text-center text-slate-300">\${d.wins ?? 0}</td>
            <td class="py-3 px-4 text-center text-slate-300">\${d.podiums ?? 0}</td>
            <td class="py-3 px-4 text-center text-slate-300">\${d.poles ?? 0}</td>
            <td class="py-3 px-4 text-right font-black text-white text-sm">\${d.points}</td>
          </tr>
        \`).join('');
      } catch (e) {
        console.error(e);
      }
    }

    function filterCategory(cat) {
      currentCategory = cat;
      ['pro', 'rookie', 'marca'].forEach(c => {
        const btn = document.getElementById('btn-cat-' + c);
        if (c.toLowerCase() === cat.toLowerCase()) {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-red-600 text-white shadow';
        } else {
          btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-white bg-slate-900 border border-slate-800';
        }
      });
      loadStandings();
    }

    async function loadCalendar() {
      try {
        const res = await fetch('/api/rounds?championship=gt3-2026');
        const data = await res.json();
        const grid = document.getElementById('calendar-grid');

        grid.innerHTML = data.map(r => {
          const isNext = r.status === 'next';
          const isCompleted = r.status === 'completed';
          return \`
            <div class="glass-card p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between \${isNext ? 'border-red-500/50 bg-red-950/10' : ''}">
              \${isNext ? '<div class="absolute top-2 right-2 px-2 py-0.5 bg-red-600 text-[10px] font-black uppercase text-white rounded">Próxima Fecha</div>' : ''}
              <div>
                <div class="text-xs font-mono font-bold text-slate-400 mb-1">FECHA 0\${r.round_number}</div>
                <div class="text-base font-black text-white leading-tight mb-2">\${r.track_name}</div>
                <div class="text-xs text-slate-400 mb-4">\${r.format_desc}</div>
              </div>
              <div class="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span class="text-slate-400">\${r.country_code}</span>
                <span class="font-bold \${isCompleted ? 'text-slate-500' : isNext ? 'text-red-400' : 'text-slate-400'} uppercase text-[10px]">
                  \${isCompleted ? 'Disputada' : isNext ? 'Por Disputar' : 'Próximamente'}
                </span>
              </div>
            </div>
          \`;
        }).join('');
      } catch (e) {
        console.error(e);
      }
    }

    async function loadPosts() {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        const container = document.getElementById('posts-container');
        if (!data || !data.length) return;

        container.innerHTML = data.map(p => \`
          <div class="glass-card p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition duration-200">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/20 uppercase">\${p.category}</span>
                \${p.round_ref ? '<span class="text-xs text-slate-500 font-mono font-bold">' + p.round_ref + '</span>' : ''}
              </div>
              <h3 class="text-base font-bold text-white mb-2 leading-snug">\${p.title}</h3>
              <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">\${p.summary}</p>
            </div>
            <div class="text-[11px] text-slate-500 font-mono">Por \${p.author || 'Staff LSA'}</div>
          </div>
        \`).join('');
      } catch (e) {
        console.error(e);
      }
    }

    async function handleRegistration(e) {
      e.preventDefault();
      const btn = document.getElementById('btn-submit-reg');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

      const payload = {
        championship_slug: document.getElementById('reg-champ').value,
        driver_name: document.getElementById('reg-name').value.trim(),
        discord_tag: document.getElementById('reg-discord').value.trim(),
        car_choice: document.getElementById('reg-car').value,
        race_number: parseInt(document.getElementById('reg-number').value),
        category: document.getElementById('reg-cat').value,
        steam_id: document.getElementById('reg-steam').value.trim() || null
      };

      try {
        const res = await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al enviar la inscripción');

        alert('🏁 ¡Inscripción enviada con éxito! Los comisarios la revisarán en breve. Bienvenido a LSA.');
        e.target.reset();
      } catch (err) {
        alert('Error: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Inscripción';
      }
    }

    init();
  </script>
</body>
</html>`;
