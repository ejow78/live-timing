export const ADMIN_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Administrativo · Latam Simracing Alliance</title>
  <link rel="icon" type="image/png" href="/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Saira:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #060A13;
      color: #E8EEF7;
      font-family: "Saira", system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    a { color: inherit; text-decoration: none; }

    /* NAVBAR */
    .admin-navbar {
      background: #0C1322;
      border-bottom: 1px solid #1D2940;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .admin-navbar-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .navbar-brand img {
      height: 40px;
      width: auto;
      mix-blend-mode: lighten;
      object-fit: contain;
    }
    .brand-title {
      border-left: 1px solid #1D2940;
      padding-left: 14px;
    }
    .brand-title h1 {
      font-family: "Chakra Petch", sans-serif;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin: 0;
      color: #fff;
    }
    .brand-title span {
      font-size: 12px;
      color: #8D9AB0;
    }
    .user-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
    }
    .user-pill {
      background: #111A2D;
      border: 1px solid #1D2940;
      padding: 6px 12px;
      border-radius: 4px;
      color: #fff;
      font-family: "Chakra Petch", sans-serif;
      font-weight: 600;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .btn-logout {
      background: transparent;
      border: 1px solid #1D2940;
      color: #8D9AB0;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all .2s;
    }
    .btn-logout:hover {
      background: #111A2D;
      color: #ff8c85;
      border-color: #ff8c85;
    }

    /* SUBNAV TABS */
    .admin-subnav {
      background: #080D18;
      border-bottom: 1px solid #1D2940;
    }
    .admin-subnav-inner {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      gap: 6px;
      overflow-x: auto;
    }
    .nav-tab {
      background: transparent;
      border: 0;
      border-bottom: 2px solid transparent;
      color: #8D9AB0;
      font-family: "Chakra Petch", sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
      padding: 14px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      transition: all .2s;
    }
    .nav-tab:hover {
      color: #fff;
    }
    .nav-tab.active {
      color: #fff;
      border-bottom-color: #23B6E0;
    }

    /* MAIN CONTAINER */
    .admin-main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px 20px;
      flex: 1;
      width: 100%;
    }
    .card {
      background: #0C1322;
      border: 1px solid #1D2940;
      border-radius: 6px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .card-title {
      font-family: "Chakra Petch", sans-serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      margin: 0 0 6px 0;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-desc {
      font-size: 14px;
      color: #8D9AB0;
      margin: 0 0 20px 0;
    }

    /* FORM CONTROLS */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }
    .form-group label {
      display: block;
      font-family: "Chakra Petch", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .1em;
      text-transform: uppercase;
      color: #8D9AB0;
      margin-bottom: 6px;
    }
    .form-group input, .form-group select, .form-group textarea {
      width: 100%;
      background: #080D18;
      border: 1px solid #1D2940;
      color: #fff;
      font-family: "Saira", sans-serif;
      font-size: 14px;
      padding: 10px 12px;
      border-radius: 4px;
      outline: none;
    }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
      border-color: #23B6E0;
    }

    /* DROPZONE */
    .dropzone {
      border: 2px dashed #1D2940;
      border-radius: 6px;
      padding: 44px 20px;
      text-align: center;
      cursor: pointer;
      background: #080D18;
      transition: all .2s;
    }
    .dropzone:hover, .dropzone.dragover {
      border-color: #23B6E0;
      background: #0B1426;
    }
    .dropzone-icon {
      font-size: 36px;
      color: #8D9AB0;
      margin-bottom: 12px;
    }

    /* TABLES */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }
    table.data-table th {
      font-family: "Chakra Petch", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #8D9AB0;
      text-align: left;
      padding: 12px 14px;
      border-bottom: 1px solid #1D2940;
      background: #080D18;
    }
    table.data-table td {
      padding: 12px 14px;
      border-bottom: 1px solid #141E33;
      vertical-align: middle;
    }
    table.data-table tbody tr:hover td {
      background: #111A2D;
    }
    .btn-action {
      background: #111A2D;
      border: 1px solid #1D2940;
      color: #fff;
      font-family: "Chakra Petch", sans-serif;
      font-size: 12px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-action:hover {
      border-color: #23B6E0;
      color: #23B6E0;
    }
    .btn-primary {
      background: #18253F;
      border: 1px solid #23B6E0;
      color: #fff;
      font-family: "Chakra Petch", sans-serif;
      font-size: 13px;
      font-weight: 700;
      padding: 10px 18px;
      border-radius: 4px;
      cursor: pointer;
      transition: all .2s;
    }
    .btn-primary:hover {
      background: #23B6E0;
      color: #060A13;
    }

    .purple-sector {
      color: #C9A2FF;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .grid-3 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <header class="admin-navbar">
    <div class="admin-navbar-inner">
      <div class="navbar-brand">
        <a href="/">
          <img
            src="https://latamsimracing.com/wp-content/uploads/2026/10/lsa-logo-horizontal.jpg"
            alt="Latam Simracing Alliance"
            onerror="this.src='/logo.png'"
          />
        </a>
        <div class="brand-title">
          <h1>Panel Administrativo</h1>
          <span>Latam Simracing Alliance</span>
        </div>
      </div>

      <div class="user-badge">
        <a href="/" target="_blank" style="color:#8D9AB0;font-size:12px;display:flex;align-items:center;gap:4px;">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver Web
        </a>
        <a href="/live" target="_blank" style="color:#8D9AB0;font-size:12px;display:flex;align-items:center;gap:4px;">
          <i class="fa-solid fa-satellite-dish"></i> Live Timing
        </a>
        <div class="user-pill">
          <i class="fa-solid fa-user-circle"></i>
          <span id="current-user-name">Staff</span>
        </div>
        <a href="/api/admin/logout" class="btn-logout" title="Cerrar sesión">
          <i class="fa-solid fa-right-from-bracket"></i> Salir
        </a>
      </div>
    </div>
  </header>

  <!-- SUBNAV TABS -->
  <div class="admin-subnav">
    <div class="admin-subnav-inner">
      <button onclick="switchTab('upload')" id="tab-btn-upload" class="nav-tab active">
        <i class="fa-solid fa-file-arrow-up"></i> Subir Resultados Assetto Corsa
      </button>
      <button onclick="switchTab('registrations')" id="tab-btn-registrations" class="nav-tab">
        <i class="fa-solid fa-id-card"></i> Gestión de Inscripciones
      </button>
      <button onclick="switchTab('championships')" id="tab-btn-championships" class="nav-tab">
        <i class="fa-solid fa-trophy"></i> Calendario Assetto Corsa
      </button>
      <button onclick="switchTab('staff')" id="tab-btn-staff" class="nav-tab">
        <i class="fa-solid fa-users-gear"></i> Perfiles de Staff
      </button>
    </div>
  </div>

  <!-- MAIN CONTAINER -->
  <main class="admin-main">

    <!-- 1. TAB: SUBIR TELEMETRIA -->
    <div id="tab-upload" class="tab-pane">
      <div class="card">
        <div class="card-title">
          <i class="fa-solid fa-file-import"></i> Importador de Resultados · Assetto Corsa
        </div>
        <div class="card-desc">
          Sube el archivo <code>result.json</code> generado por Emperor Server o ACSM de Assetto Corsa. El sistema extrae automáticamente la vuelta rápida, sectores morados de cada piloto y calcula los puntos oficiales.
        </div>

        <div class="grid-3">
          <div class="form-group">
            <label for="upload-champ">Torneo / Campeonato AC</label>
            <select id="upload-champ">
              <option value="ginetta-gt4">Copa Ginetta G55 GT4 (Assetto Corsa)</option>
              <option value="ac-ligas">Ligas Oficiales Assetto Corsa</option>
            </select>
          </div>
          <div class="form-group">
            <label for="upload-round">Fecha / Round</label>
            <select id="upload-round">
              <option value="1">Fecha 1 · Vallelunga Classic</option>
              <option value="2">Fecha 2 · Brands Hatch Indy</option>
              <option value="3">Fecha 3 · Imola Grand Prix</option>
              <option value="4">Fecha 4 · Red Bull Ring</option>
            </select>
          </div>
          <div class="form-group">
            <label for="upload-session">Manga / Sesión</label>
            <select id="upload-session">
              <option value="Carrera 1">Carrera 1</option>
              <option value="Carrera 2">Carrera 2</option>
              <option value="Clasificación">Clasificación</option>
            </select>
          </div>
        </div>

        <div id="dropzone" class="dropzone" onclick="document.getElementById('file-input').click()">
          <input type="file" id="file-input" accept=".json" style="display:none;" onchange="handleFileSelect(event)">
          <div class="dropzone-icon">
            <i class="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <div style="font-weight:600;font-size:15px;color:#fff;margin-bottom:4px;">
            Haz clic o arrastra el archivo JSON de resultados de Assetto Corsa
          </div>
          <div style="font-size:13px;color:#8D9AB0;">
            Compatible con resultados de Emperor Server y Assetto Corsa Server Manager (ACSM)
          </div>
        </div>
      </div>

      <!-- PREVIEW TABLE -->
      <div id="preview-card" class="card" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <div class="card-title">Vista Previa de Resultados Calculados</div>
            <div id="preview-info" style="font-size:13px;color:#8D9AB0;">Pista: -- | Sesión: --</div>
          </div>
          <button onclick="publishResults()" id="btn-publish" class="btn-primary">
            <i class="fa-solid fa-check"></i> Publicar en Campeonato
          </button>
        </div>

        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:50px;">Pos</th>
                <th style="width:60px;">#</th>
                <th>Piloto</th>
                <th>Vehículo</th>
                <th>Cat.</th>
                <th>Mejor Vuelta</th>
                <th>S1</th>
                <th>S2</th>
                <th>S3</th>
                <th>Bonif.</th>
                <th style="text-align:right;">Puntos</th>
              </tr>
            </thead>
            <tbody id="preview-tbody">
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 2. TAB: INSCRIPCIONES -->
    <div id="tab-registrations" class="tab-pane" style="display:none;">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <div class="card-title">Pilotos Inscritos desde la Web</div>
            <div class="card-desc">Solicitudes enviadas a través del formulario oficial.</div>
          </div>
          <button onclick="exportEntryList()" class="btn-action">
            <i class="fa-solid fa-download"></i> Descargar EntryList.json para Servidor
          </button>
        </div>

        <div style="overflow-x:auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Piloto</th>
                <th>Discord</th>
                <th>Auto</th>
                <th>Dorsal</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th style="text-align:right;">Acciones</th>
              </tr>
            </thead>
            <tbody id="registrations-tbody">
              <tr><td colspan="7" style="text-align:center;padding:24px;color:#8D9AB0;">Cargando inscripciones...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 3. TAB: CAMPEONATOS & CALENDARIO -->
    <div id="tab-championships" class="tab-pane" style="display:none;">
      <div class="card">
        <div class="card-title">Calendario Oficial GT3 2026</div>
        <div class="card-desc">Estado y fechas programadas del campeonato.</div>
        <div id="rounds-list" style="display:grid;gap:10px;">
        </div>
      </div>
    </div>

    <!-- 4. TAB: PERFILES DE STAFF -->
    <div id="tab-staff" class="tab-pane" style="display:none;">
      <div class="card">
        <div class="card-title">Perfiles de Staff & Comisarios</div>
        <div class="card-desc">Usuarios oficiales con acceso al Panel Administrativo.</div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-top:14px;">
          <div style="background:#080D18;border:1px solid #1D2940;padding:16px;border-radius:4px;">
            <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#fff;">Javier Weimann</div>
            <div style="font-size:13px;color:#23B6E0;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;">Superadmin</div>
            <div style="font-size:12px;color:#8D9AB0;margin-top:4px;">Usuario: <code>javi</code></div>
          </div>
          <div style="background:#080D18;border:1px solid #1D2940;padding:16px;border-radius:4px;">
            <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#fff;">Alonso Cabezas</div>
            <div style="font-size:13px;color:#8D9AB0;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;">Admin</div>
            <div style="font-size:12px;color:#8D9AB0;margin-top:4px;">Usuario: <code>alonso</code></div>
          </div>
          <div style="background:#080D18;border:1px solid #1D2940;padding:16px;border-radius:4px;">
            <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#fff;">Felipe Olivares</div>
            <div style="font-size:13px;color:#8D9AB0;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;">Admin</div>
            <div style="font-size:12px;color:#8D9AB0;margin-top:4px;">Usuario: <code>felipe</code></div>
          </div>
          <div style="background:#080D18;border:1px solid #1D2940;padding:16px;border-radius:4px;">
            <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#fff;">El Tío Jota</div>
            <div style="font-size:13px;color:#F2B92B;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;">Comisario Deportivo</div>
            <div style="font-size:12px;color:#8D9AB0;margin-top:4px;">Usuario: <code>tiojota</code></div>
          </div>
          <div style="background:#080D18;border:1px solid #1D2940;padding:16px;border-radius:4px;">
            <div style="font-family:'Chakra Petch',sans-serif;font-weight:700;font-size:16px;color:#fff;">Benjamín Braun</div>
            <div style="font-size:13px;color:#8D9AB0;font-family:'Chakra Petch',sans-serif;text-transform:uppercase;">Admin</div>
            <div style="font-size:12px;color:#8D9AB0;margin-top:4px;">Usuario: <code>benjamin</code></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. TAB: NOTICIAS & CRONICAS -->
    <div id="tab-posts" class="tab-pane" style="display:none;">
      <div class="card">
        <div class="card-title">Redactar Noticia o Crónica</div>
        <div class="card-desc">Publica comunicados oficiales directamente en el sitio web.</div>

        <div style="display:grid;gap:14px;">
          <div class="form-group">
            <label>Título</label>
            <input type="text" id="post-title" placeholder="Ej: Resumen Fecha 6 Brands Hatch">
          </div>
          <div class="form-group">
            <label>Resumen Breve</label>
            <input type="text" id="post-summary" placeholder="Bajada o síntesis para la portada">
          </div>
          <div class="form-group">
            <label>Texto Completo (Markdown)</label>
            <textarea id="post-content" rows="6" placeholder="Escribe el contenido aquí..."></textarea>
          </div>
          <button onclick="publishPost()" class="btn-primary" style="justify-self:start;">
            Publicar en la Web
          </button>
        </div>
      </div>
    </div>

  </main>

  <script>
    let currentParsedData = null;

    // Detectar usuario de la cookie
    function detectUser() {
      const cookies = document.cookie.split(';');
      let user = 'Staff LSA';
      for (const c of cookies) {
        const [k, v] = c.trim().split('=');
        if (k === 'lsa_user') user = decodeURIComponent(v);
      }
      document.getElementById('current-user-name').textContent = user;
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-pane').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));

      const activePane = document.getElementById('tab-' + tab);
      if (activePane) activePane.style.display = 'block';

      const activeBtn = document.getElementById('tab-btn-' + tab);
      if (activeBtn) activeBtn.classList.add('active');

      if (tab === 'registrations') loadRegistrations();
      if (tab === 'championships') loadRounds();
    }

    // Drag & Drop
    const dropzone = document.getElementById('dropzone');
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); });
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) processFile(e.dataTransfer.files[0]);
    });

    function handleFileSelect(e) {
      if (e.target.files.length) processFile(e.target.files[0]);
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
        if (!res.ok) throw new Error(data.error || 'Error procesando archivo');

        currentParsedData = data;
        renderPreview(data);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

    function renderPreview(data) {
      document.getElementById('preview-card').style.display = 'block';
      document.getElementById('preview-info').textContent = 'Pista: ' + data.trackName + ' | Sesión: ' + data.sessionType + ' | Mejor Vuelta: ' + data.bestLapOverall;

      const tbody = document.getElementById('preview-tbody');
      tbody.innerHTML = data.results.map(r => \`
        <tr>
          <td style="font-weight:700;">P\${r.position}</td>
          <td style="color:#8D9AB0;">#\${r.raceNumber}</td>
          <td style="font-weight:600;color:#fff;">\${r.driverName}</td>
          <td style="color:#C9D3DF;">\${r.carName}</td>
          <td><span style="font-size:11px;padding:2px 6px;border-radius:3px;background:#141E33;">\${r.category}</span></td>
          <td class="\${r.isVR ? 'purple-sector' : ''}">\${r.bestLap}</td>
          <td class="\${r.isPurpleS1 ? 'purple-sector' : ''}">\${r.s1}</td>
          <td class="\${r.isPurpleS2 ? 'purple-sector' : ''}">\${r.s2}</td>
          <td class="\${r.isPurpleS3 ? 'purple-sector' : ''}">\${r.s3}</td>
          <td>
            \${r.isVR ? '<span style="font-size:10px;padding:2px 5px;background:#28183d;color:#C9A2FF;border-radius:3px;">VR +2</span> ' : ''}
            \${r.isPole ? '<span style="font-size:10px;padding:2px 5px;background:#2b2311;color:#F2B92B;border-radius:3px;">POLE +2</span>' : ''}
          </td>
          <td style="text-align:right;font-weight:700;color:#fff;">\${r.points} pts</td>
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
      btn.textContent = 'Publicando...';

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
        if (!res.ok) throw new Error(data.error || 'Error al guardar');
        alert('✅ ¡Resultados guardados y tabla actualizada en Supabase!');
      } catch (err) {
        alert('Error: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Publicar en Campeonato';
      }
    }

    async function loadRegistrations() {
      try {
        const res = await fetch('/api/admin/registrations');
        const data = await res.json();
        const tbody = document.getElementById('registrations-tbody');
        if (!data || !data.length) {
          tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#8D9AB0;">No hay inscripciones aún.</td></tr>';
          return;
        }
        tbody.innerHTML = data.map(r => \`
          <tr>
            <td style="font-weight:600;color:#fff;">\${r.driver_name}</td>
            <td style="color:#8D9AB0;">\${r.discord_tag}</td>
            <td style="color:#C9D3DF;">\${r.car_choice}</td>
            <td style="font-weight:700;color:#fff;">#\${r.race_number}</td>
            <td><span style="font-size:11px;padding:2px 6px;border-radius:3px;background:#141E33;">\${r.category || 'Rookie'}</span></td>
            <td><span style="font-size:11px;padding:2px 6px;border-radius:3px;background:\${r.status === 'approved' ? 'rgba(51,209,122,.15)' : 'rgba(242,185,43,.15)'};color:\${r.status === 'approved' ? '#33D17A' : '#F2B92B'};">\${r.status}</span></td>
            <td style="text-align:right;">
              <button onclick="approveRegistration('\${r.id}')" class="btn-action" style="padding:4px 10px;font-size:11px;">Aprobar</button>
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
          <div style="background:#080D18;border:1px solid #1D2940;padding:12px 16px;border-radius:4px;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <span style="font-weight:700;font-family:'Chakra Petch',sans-serif;color:#8D9AB0;margin-right:8px;">F0\${r.round_number}</span>
              <strong style="color:#fff;">\${r.track_name}</strong>
              <span style="color:#8D9AB0;font-size:13px;margin-left:8px;">(\${r.format_desc})</span>
            </div>
            <span style="font-size:11px;padding:3px 8px;border-radius:3px;background:#111A2D;color:#8D9AB0;text-transform:uppercase;">\${r.status}</span>
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

    detectUser();
  </script>
</body>
</html>`;
