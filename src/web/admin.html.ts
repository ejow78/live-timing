export const ADMIN_HTML = `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin & Comisariato · LATAM Simracing Alliance</title>
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
              card: '#0f172a',
              dark: '#030712'
            }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #030712; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .purple-sector { color: #d946ef; font-weight: 700; }
  </style>
</head>
<body class="text-slate-100 min-h-screen flex flex-col">

  <!-- TOPBAR -->
  <header class="border-b border-slate-800 bg-slate-950/80 sticky top-0 z-50 backdrop-blur">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="LSA" class="h-9 w-auto object-contain">
        <div class="border-l border-slate-800 pl-3">
          <div class="text-sm font-bold tracking-wider text-white uppercase flex items-center gap-2">
            Panel de Administración
            <span class="px-2 py-0.5 text-[10px] bg-red-600/20 text-red-400 border border-red-500/30 rounded font-mono">STAFF</span>
          </div>
          <div class="text-xs text-slate-400">LATAM Simracing Alliance</div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <a href="/" target="_blank" class="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Web Pública
        </a>
        <a href="/live" target="_blank" class="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition">
          <i class="fa-solid fa-satellite-dish"></i> Live Timing
        </a>
      </div>
    </div>
  </header>

  <!-- NAVIGATION TABS -->
  <div class="bg-slate-900/60 border-b border-slate-800 px-4">
    <div class="max-w-7xl mx-auto flex gap-2 sm:gap-4 overflow-x-auto text-sm py-2">
      <button onclick="switchTab('upload')" id="tab-btn-upload" class="tab-btn px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 bg-red-600 text-white shadow-lg shadow-red-600/30">
        <i class="fa-solid fa-cloud-arrow-up"></i> Subir Telemetría / Resultados
      </button>
      <button onclick="switchTab('registrations')" id="tab-btn-registrations" class="tab-btn px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-2">
        <i class="fa-solid fa-id-card"></i> Inscripciones
      </button>
      <button onclick="switchTab('championships')" id="tab-btn-championships" class="tab-btn px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-2">
        <i class="fa-solid fa-trophy"></i> Campeonatos & Calendario
      </button>
      <button onclick="switchTab('posts')" id="tab-btn-posts" class="tab-btn px-4 py-2 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-2">
        <i class="fa-solid fa-newspaper"></i> Noticias & Crónicas
      </button>
    </div>
  </div>

  <!-- MAIN CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">

    <!-- 1. TAB: SUBIR TELEMETRIA -->
    <div id="tab-upload" class="tab-content space-y-6">
      <div class="glass-panel p-6 rounded-2xl">
        <h2 class="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <i class="fa-solid fa-file-circle-check text-red-500"></i> Importador Inteligente de Carreras (ACC & Assetto Corsa)
        </h2>
        <p class="text-sm text-slate-400 mb-6">
          Arrastra o selecciona el archivo <code>.json</code> exportado por el servidor de ACC o Emperor Server. El sistema detectará las vueltas rápidas, sectores récord y calculará automáticamente los puntos del campeonato.
        </p>

        <!-- Formulario de asociación -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Campeonato</label>
            <select id="upload-champ" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="gt3-2026">Campeonato GT3 2026 (ACC)</option>
              <option value="ginetta-gt4">Campeonato Ginetta GT4 (AC)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Fecha / Round</label>
            <select id="upload-round" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="1">Fecha 1 · Indianapolis</option>
              <option value="2">Fecha 2 · COTA</option>
              <option value="3">Fecha 3 · Suzuka</option>
              <option value="4">Fecha 4 · Valencia</option>
              <option value="5">Fecha 5 · Paul Ricard</option>
              <option value="6">Fecha 6 · Brands Hatch</option>
              <option value="7" selected>Fecha 7 · Nürburgring GP</option>
              <option value="8">Fecha 8 · Spa-Francorchamps</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Manga / Sesión</label>
            <select id="upload-session" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
              <option value="Carrera 1">Carrera 1</option>
              <option value="Carrera 2">Carrera 2</option>
              <option value="Clasificación">Clasificación</option>
              <option value="Endurance">Endurance Final</option>
            </select>
          </div>
        </div>

        <!-- DROPZONE -->
        <div id="dropzone" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" onclick="document.getElementById('file-input').click()"
          class="border-2 border-dashed border-slate-700 hover:border-red-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition group">
          <input type="file" id="file-input" accept=".json" class="hidden" onchange="handleFileSelect(event)">
          <div class="h-16 w-16 mx-auto mb-4 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center text-2xl group-hover:scale-110 transition">
            <i class="fa-solid fa-file-arrow-up"></i>
          </div>
          <div class="text-base font-semibold text-white mb-1">
            Arrastra el archivo JSON aquí o <span class="text-red-400 underline">haz clic para examinar</span>
          </div>
          <div class="text-xs text-slate-500">
            Compatible con resultados de servidores ACC y Emperor / ACSM (Assetto Corsa)
          </div>
        </div>
      </div>

      <!-- PREVIEW RESULTADOS PARSEADOS -->
      <div id="preview-container" class="hidden glass-panel p-6 rounded-2xl space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span id="preview-badge" class="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-mono">ACC</span>
              Vista Previa de Resultados Calculados
            </h3>
            <p id="preview-info" class="text-xs text-slate-400 mt-0.5">Circuito: -- | Sesión: --</p>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="publishResults()" id="btn-publish" class="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-red-600/30">
              <i class="fa-solid fa-check-double"></i> Publicar Resultados y Actualizar Campeonato
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th class="py-3 px-3">Pos</th>
                <th class="py-3 px-3">#</th>
                <th class="py-3 px-3">Piloto</th>
                <th class="py-3 px-3">Vehículo</th>
                <th class="py-3 px-3">Cat.</th>
                <th class="py-3 px-3">Mejor Vuelta</th>
                <th class="py-3 px-3">S1</th>
                <th class="py-3 px-3">S2</th>
                <th class="py-3 px-3">S3</th>
                <th class="py-3 px-3">Bonif.</th>
                <th class="py-3 px-3 text-right">Pts</th>
              </tr>
            </thead>
            <tbody id="preview-tbody" class="divide-y divide-slate-800 font-mono text-xs">
              <!-- Se puebla dinámicamente -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 2. TAB: INSCRIPCIONES -->
    <div id="tab-registrations" class="tab-content hidden space-y-6">
      <div class="glass-panel p-6 rounded-2xl">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-lg font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-id-card text-cyan-400"></i> Pilotos Inscritos
            </h2>
            <p class="text-sm text-slate-400">Solicitudes enviadas a través del formulario de la web.</p>
          </div>
          <button onclick="exportEntryList()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-2">
            <i class="fa-solid fa-download"></i> Exportar EntryList.json para Servidor
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th class="py-3 px-3">Piloto</th>
                <th class="py-3 px-3">Discord</th>
                <th class="py-3 px-3">Auto Elegido</th>
                <th class="py-3 px-3">Dorsal</th>
                <th class="py-3 px-3">Categoría</th>
                <th class="py-3 px-3">Estado</th>
                <th class="py-3 px-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody id="registrations-tbody" class="divide-y divide-slate-800 text-xs">
              <tr>
                <td colspan="7" class="py-6 text-center text-slate-500">Cargando inscripciones desde Supabase...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 3. TAB: CAMPEONATOS & CALENDARIO -->
    <div id="tab-championships" class="tab-content hidden space-y-6">
      <div class="glass-panel p-6 rounded-2xl">
        <h2 class="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <i class="fa-solid fa-trophy text-amber-400"></i> Calendario Oficial GT3 2026
        </h2>
        <div id="rounds-list" class="space-y-3">
          <!-- Rounds list -->
        </div>
      </div>
    </div>

    <!-- 4. TAB: NOTICIAS & CRONICAS -->
    <div id="tab-posts" class="tab-content hidden space-y-6">
      <div class="glass-panel p-6 rounded-2xl">
        <h2 class="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <i class="fa-solid fa-feather text-emerald-400"></i> Publicar Nueva Crónica o Noticia
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Título</label>
            <input type="text" id="post-title" placeholder="Ej: Doblete de Jose Miguel en Brands Hatch" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Resumen / Bajada</label>
            <input type="text" id="post-summary" placeholder="Breve descripción para la portada de la web" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500">
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase text-slate-400 mb-1">Contenido (Markdown)</label>
            <textarea id="post-content" rows="6" placeholder="Escribe el texto de la crónica aquí..." class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"></textarea>
          </div>
          <button onclick="publishPost()" class="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition">
            Publicar en la Web
          </button>
        </div>
      </div>
    </div>

  </main>

  <script>
    let currentParsedData = null;

    function switchTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(el => {
        el.classList.remove('bg-red-600', 'text-white', 'shadow-lg', 'shadow-red-600/30');
        el.classList.add('text-slate-400');
      });

      document.getElementById('tab-' + tab).classList.remove('hidden');
      const btn = document.getElementById('tab-btn-' + tab);
      btn.classList.add('bg-red-600', 'text-white', 'shadow-lg', 'shadow-red-600/30');
      btn.classList.remove('text-slate-400');

      if (tab === 'registrations') loadRegistrations();
      if (tab === 'championships') loadRounds();
    }

    // DRAG AND DROP
    function handleDragOver(e) {
      e.preventDefault();
      document.getElementById('dropzone').classList.add('border-red-500', 'bg-slate-900/90');
    }
    function handleDragLeave(e) {
      e.preventDefault();
      document.getElementById('dropzone').classList.remove('border-red-500', 'bg-slate-900/90');
    }
    function handleDrop(e) {
      e.preventDefault();
      document.getElementById('dropzone').classList.remove('border-red-500', 'bg-slate-900/90');
      if (e.dataTransfer.files.length) {
        processFile(e.dataTransfer.files[0]);
      }
    }
    function handleFileSelect(e) {
      if (e.target.files.length) {
        processFile(e.target.files[0]);
      }
    }

    async function processFile(file) {
      const text = await file.text();
      try {
        const res = await fetch('/api/admin/parse-telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rawJson: text })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al procesar el archivo');
        
        currentParsedData = data;
        renderPreview(data);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

    function renderPreview(data) {
      const container = document.getElementById('preview-container');
      const tbody = document.getElementById('preview-tbody');
      const info = document.getElementById('preview-info');
      const badge = document.getElementById('preview-badge');

      container.classList.remove('hidden');
      badge.textContent = data.game.toUpperCase();
      info.textContent = 'Circuito: ' + data.trackName + ' | Sesión: ' + data.sessionType + ' | Mejor Vuelta: ' + data.bestLapOverall;

      tbody.innerHTML = data.results.map(r => \`
        <tr class="hover:bg-slate-800/40 transition">
          <td class="py-2.5 px-3 font-bold \${r.position <= 3 ? 'text-amber-400' : 'text-slate-300'}">P\${r.position}</td>
          <td class="py-2.5 px-3 text-slate-400">#\${r.raceNumber}</td>
          <td class="py-2.5 px-3 font-semibold text-white">\${r.driverName}</td>
          <td class="py-2.5 px-3 text-slate-300">\${r.carName}</td>
          <td class="py-2.5 px-3"><span class="px-1.5 py-0.5 rounded text-[10px] \${r.category === 'PRO' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}">\${r.category}</span></td>
          <td class="py-2.5 px-3 font-bold \${r.isVR ? 'purple-sector' : 'text-slate-200'}">\${r.bestLap}</td>
          <td class="py-2.5 px-3 \${r.isPurpleS1 ? 'purple-sector' : 'text-slate-400'}">\${r.s1}</td>
          <td class="py-2.5 px-3 \${r.isPurpleS2 ? 'purple-sector' : 'text-slate-400'}">\${r.s2}</td>
          <td class="py-2.5 px-3 \${r.isPurpleS3 ? 'purple-sector' : 'text-slate-400'}">\${r.s3}</td>
          <td class="py-2.5 px-3">
            \${r.isVR ? '<span class="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded text-[10px] font-bold">VR +2</span> ' : ''}
            \${r.isPole ? '<span class="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px] font-bold">POLE +2</span>' : ''}
          </td>
          <td class="py-2.5 px-3 text-right font-bold text-white">\${r.points} pts</td>
        </tr>
      \`).join('');
    }

    async function publishResults() {
      if (!currentParsedData) return;
      const champ = document.getElementById('upload-champ').value;
      const round = parseInt(document.getElementById('upload-round').value);
      const session = document.getElementById('upload-session').value;

      const btn = document.getElementById('btn-publish');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publicando en Supabase...';

      try {
        const res = await fetch('/api/admin/publish-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            championship_slug: champ,
            round_number: round,
            race_name: session,
            results: currentParsedData.results
          })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al publicar');
        alert('✅ ¡Resultados publicados con éxito en Supabase! La clasificación del campeonato se ha actualizado.');
      } catch (e) {
        alert('Error: ' + e.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Publicar Resultados y Actualizar Campeonato';
      }
    }

    async function loadRegistrations() {
      try {
        const res = await fetch('/api/admin/registrations');
        const data = await res.json();
        const tbody = document.getElementById('registrations-tbody');
        if (!data.length) {
          tbody.innerHTML = '<tr><td colspan="7" class="py-6 text-center text-slate-500">No hay inscripciones registradas aún.</td></tr>';
          return;
        }
        tbody.innerHTML = data.map(r => \`
          <tr class="hover:bg-slate-800/40 transition">
            <td class="py-3 px-3 font-semibold text-white">\${r.driver_name}</td>
            <td class="py-3 px-3 text-slate-400">\${r.discord_tag}</td>
            <td class="py-3 px-3 text-slate-300">\${r.car_choice}</td>
            <td class="py-3 px-3 font-mono text-amber-400 font-bold">#\${r.race_number}</td>
            <td class="py-3 px-3"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">\${r.category || 'Rookie'}</span></td>
            <td class="py-3 px-3"><span class="px-2 py-0.5 rounded text-[10px] \${r.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'} font-semibold uppercase">\${r.status}</span></td>
            <td class="py-3 px-3 text-right">
              <button onclick="approveRegistration('\${r.id}')" class="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold transition">Aprobar</button>
            </td>
          </tr>
        \`).join('');
      } catch (e) {
        console.error(e);
      }
    }

    async function loadRounds() {
      try {
        const res = await fetch('/api/rounds?championship=gt3-2026');
        const data = await res.json();
        const list = document.getElementById('rounds-list');
        list.innerHTML = data.map(r => \`
          <div class="flex items-center justify-between p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">F0\${r.round_number}</span>
              <div>
                <div class="text-sm font-semibold text-white">\${r.track_name}</div>
                <div class="text-xs text-slate-400">\${r.format_desc}</div>
              </div>
            </div>
            <span class="px-2 py-1 rounded text-[10px] uppercase font-bold \${r.status === 'completed' ? 'bg-slate-800 text-slate-400' : r.status === 'next' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800/40 text-slate-500'}">\${r.status}</span>
          </div>
        \`).join('');
      } catch (e) {
        console.error(e);
      }
    }

    async function exportEntryList() {
      try {
        const res = await fetch('/api/admin/export-entrylist');
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'entrylist.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (e) {
        alert('Error: ' + e.message);
      }
    }
  </script>
</body>
</html>`;
