/**
 * Portal Web de Live Timing & Telemetría para Assetto Corsa Competizione (ACC)
 * Diseño oficial LATAM Simracing Alliance (LSA)
 */

export const ACC_DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="es" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ACC Live Timing — LATAM Simracing Alliance</title>
  <link rel="icon" type="image/png" href="/logo.png" />

  <!-- Google Fonts: Chakra Petch, Saira, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,600;0,700;1,600;1,700&family=JetBrains+Mono:wght@400;500;600;700&family=Saira:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['"Chakra Petch"', '"Arial Narrow"', 'sans-serif'],
            sans: ['Saira', '"Segoe UI"', 'Roboto', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            lsa: {
              night: '#060A13',
              deck: '#0C1322',
              deck2: '#111A2D',
              wire: '#1D2940',
              ink: '#E8EEF7',
              mute: '#8D9AB0',
              cyan: '#23B6E0',
              gold: '#F2B92B',
              red: '#E3261B',
            }
          }
        }
      }
    };
  </script>

  <style>
    :root {
      --night: #060A13;
      --deck: #0C1322;
      --deck2: #111A2D;
      --wire: #1D2940;
      --ink: #E8EEF7;
      --mute: #8D9AB0;
      --cyan: #23B6E0;
      --gold: #F2B92B;
      --red: #E3261B;
      --display: "Chakra Petch", "Arial Narrow", Arial, sans-serif;
      --body: "Saira", "Segoe UI", Roboto, Arial, sans-serif;
      --cut: 16px;
    }

    body {
      background-color: var(--night);
      background-image:
        radial-gradient(70% 60% at 85% 10%, rgba(35, 182, 224, 0.12), transparent 60%),
        radial-gradient(50% 50% at 10% 90%, rgba(227, 38, 27, 0.10), transparent 60%),
        linear-gradient(to bottom, #060A13, #090E1A);
      color: var(--ink);
      font-family: var(--body);
      overflow-x: clip;
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    .tri {
      height: 4px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
    }
    .tri i:nth-child(1) { background: var(--cyan); }
    .tri i:nth-child(2) { background: var(--gold); }
    .tri i:nth-child(3) { background: var(--red); }

    .cut {
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%);
    }

    .tri-word {
      background: linear-gradient(90deg, #23B6E0 0 33%, #F2B92B 33% 66%, #E3261B 66%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-style: italic;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font: 700 13px var(--display);
      text-transform: uppercase;
      letter-spacing: .08em;
      padding: 10px 20px;
      border-radius: 999px;
      background: linear-gradient(180deg, #2a8fd8, #155fb0);
      color: #fff;
      box-shadow: 0 0 0 1px rgba(120, 190, 255, .35) inset, 0 8px 30px rgba(35, 140, 230, .35);
      transition: all 0.2s ease;
      cursor: pointer;
      white-space: nowrap;
    }
    .pill:hover {
      box-shadow: 0 0 0 1px rgba(160, 210, 255, .6) inset, 0 8px 40px rgba(35, 140, 230, .55);
      transform: translateY(-1px);
    }
    .pill.ghost {
      background: transparent;
      box-shadow: 0 0 0 1px var(--wire) inset;
      color: var(--ink);
    }
    .pill.ghost:hover {
      box-shadow: 0 0 0 1px var(--cyan) inset;
      color: #fff;
    }

    .site-nav-menu > a {
      font: 600 13.5px var(--display);
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 10px 14px;
      display: inline-flex;
      align-items: center;
      transition: color 0.15s;
      color: var(--mute);
    }
    .site-nav-menu > a:hover {
      color: #fff;
    }
    .site-nav-menu .cur-page {
      color: #fff !important;
      box-shadow: inset 0 -2px 0 var(--gold) !important;
    }

    .soc-btn {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--wire);
      border-radius: 999px;
      color: var(--mute);
      transition: all 0.2s;
    }
    .soc-btn:hover {
      color: #fff;
      border-color: var(--cyan);
      box-shadow: 0 0 16px rgba(35, 182, 224, 0.35);
    }

    .lsa-panel {
      background: var(--deck);
      border: 1px solid var(--wire);
    }

    .lsa-panel2 {
      background: var(--deck2);
      border: 1px solid var(--wire);
    }

    .table-row-hover:hover {
      background: rgba(35, 182, 224, 0.05);
    }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-lsa-cyan selection:text-slate-950">

  <div>
    <!-- FRANJA TRICOLOR SUPERIOR (LSA) -->
    <div class="tri"><i></i><i></i><i></i></div>

    <!-- CABECERA PRINCIPAL -->
    <header class="sticky top-0 z-40 bg-[#060A13]/95 backdrop-blur-md border-b border-lsa-wire shadow-2xl">
      <div class="max-w-[1720px] mx-auto px-4 sm:px-6 h-[66px] flex items-center justify-between gap-4">
        
        <!-- LOGO LSA HORIZONTAL -->
        <div class="flex items-center gap-4">
          <a href="https://latamsimracing.com/" target="_blank" rel="noopener noreferrer" class="block">
            <img
              src="https://latamsimracing.com/wp-content/uploads/2026/10/lsa-logo-horizontal.jpg"
              alt="Latam Simracing Alliance"
              class="h-[44px] w-auto mix-blend-lighten object-contain"
              onerror="this.src='/logo.png'"
            />
          </a>
        </div>

        <!-- NAVBAR NAVEGACIÓN ENTRE SIMULADORES -->
        <nav class="flex items-center gap-2 sm:gap-4 site-nav-menu">
          <a href="/" class="flex items-center gap-2 text-lsa-mute hover:text-white transition-colors">
            <span class="font-display font-semibold uppercase tracking-wider text-[13px] sm:text-[14px]">Assetto Corsa</span>
          </a>

          <a href="/acc" class="cur-page flex items-center gap-2" aria-current="page">
            <span class="font-display font-bold uppercase tracking-wider text-[13px] sm:text-[14px]">ACC Competizione</span>
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </a>
        </nav>

        <!-- ACCIONES Y REDES -->
        <div class="flex items-center gap-3">
          <button onclick="openJoinModal()" class="hidden sm:inline-flex pill text-xs">
            <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
            <span>Conectar</span>
          </button>
          <a href="https://discord.gg/V9hq2EBSA" target="_blank" rel="noopener noreferrer" class="soc-btn" title="Discord Oficial LSA">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- HERO / BANNER DE ESTADO DEL SERVIDOR ACC -->
    <section class="max-w-[1720px] mx-auto px-4 sm:px-6 pt-6 pb-4">
      <div class="lsa-panel cut p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -left-20 -bottom-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span id="badge-online">SERVIDOR EN LÍNEA</span>
            </div>

            <h1 class="font-display italic font-bold text-2xl sm:text-4xl text-white uppercase tracking-wide">
              ASSETTO CORSA <span class="tri-word">COMPETIZIONE</span>
            </h1>

            <p id="server-title" class="text-lsa-ink/80 text-sm sm:text-base font-sans">
              [LSA] LATAM Simracing Alliance — Nur GP GT3
            </p>
          </div>

          <!-- TARJETAS RÁPIDAS DE ESTADO -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <!-- Sesión -->
            <div class="lsa-panel2 p-3 sm:p-4 rounded-lg border border-lsa-wire">
              <span class="text-[11px] font-display uppercase tracking-wider text-lsa-mute block">Sesión Activa</span>
              <div id="stat-session" class="font-display font-bold text-lg sm:text-xl text-lsa-cyan mt-0.5">Práctica</div>
            </div>

            <!-- Pilotos -->
            <div class="lsa-panel2 p-3 sm:p-4 rounded-lg border border-lsa-wire">
              <span class="text-[11px] font-display uppercase tracking-wider text-lsa-mute block">Pilotos en Pista</span>
              <div id="stat-drivers" class="font-display font-bold text-lg sm:text-xl text-emerald-400 mt-0.5">6 / 32</div>
            </div>

            <!-- Circuito -->
            <div class="lsa-panel2 p-3 sm:p-4 rounded-lg border border-lsa-wire">
              <span class="text-[11px] font-display uppercase tracking-wider text-lsa-mute block">Circuito</span>
              <div id="stat-track" class="font-display font-bold text-base sm:text-lg text-white mt-0.5 truncate max-w-[140px]" title="Nürburgring GP">Nürburgring GP</div>
            </div>

            <!-- Categoría -->
            <div class="lsa-panel2 p-3 sm:p-4 rounded-lg border border-lsa-wire">
              <span class="text-[11px] font-display uppercase tracking-wider text-lsa-mute block">Categoría</span>
              <div id="stat-group" class="font-display font-bold text-lg sm:text-xl text-lsa-gold mt-0.5">GT3</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENIDO PRINCIPAL: TABLA DE TIEMPOS EN VIVO -->
    <main class="max-w-[1720px] mx-auto px-4 sm:px-6 py-4 space-y-6">

      <!-- TARJETA MEJOR VUELTA EN PISTA -->
      <div id="best-lap-card" class="lsa-panel cut p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-lsa-wire bg-gradient-to-r from-lsa-deck to-lsa-deck2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-lsa-gold/15 border border-lsa-gold/30 flex items-center justify-center text-lsa-gold">
            <i data-lucide="zap" class="w-5 h-5"></i>
          </div>
          <div>
            <span class="text-xs font-display uppercase tracking-wider text-lsa-mute block">Récord de la Sesión</span>
            <div class="flex items-center gap-2 mt-0.5">
              <span id="best-lap-driver" class="font-display font-bold text-base sm:text-lg text-white">Carlos Lopez [LSA]</span>
              <span id="best-lap-car" class="text-xs px-2 py-0.5 rounded bg-lsa-wire text-lsa-mute">Ferrari 296 GT3</span>
            </div>
          </div>
        </div>

        <div class="text-right">
          <span class="text-[11px] font-display uppercase tracking-wider text-lsa-mute block">Tiempo de Vuelta</span>
          <span id="best-lap-time" class="font-mono font-bold text-xl sm:text-2xl text-lsa-gold">1:56.702</span>
        </div>
      </div>

      <!-- TABLA DE CLASIFICACIÓN EN VIVO -->
      <div class="lsa-panel cut shadow-2xl overflow-hidden border border-lsa-wire">
        <div class="p-4 sm:p-5 border-b border-lsa-wire flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <i data-lucide="trophy" class="w-5 h-5 text-lsa-gold"></i>
            <h2 class="font-display italic font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
              Clasificación y Tiempos de Carrera
            </h2>
          </div>

          <div class="flex items-center gap-2 text-xs text-lsa-mute font-mono">
            <span id="refresh-indicator" class="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span id="last-updated-text">Actualizando en vivo...</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-lsa-deck2/70 text-lsa-mute text-xs font-display uppercase tracking-wider border-b border-lsa-wire">
                <th class="py-3 px-4 text-center w-14">Pos</th>
                <th class="py-3 px-4">Piloto</th>
                <th class="py-3 px-4">Auto</th>
                <th class="py-3 px-4 text-center w-16">N°</th>
                <th class="py-3 px-4 text-right">Mejor Vuelta</th>
                <th class="py-3 px-3 text-center">S1</th>
                <th class="py-3 px-3 text-center">S2</th>
                <th class="py-3 px-3 text-center">S3</th>
                <th class="py-3 px-4 text-right">Diferencia</th>
                <th class="py-3 px-4 text-center w-20">Vueltas</th>
              </tr>
            </thead>
            <tbody id="standings-tbody" class="divide-y divide-lsa-wire text-sm font-sans">
              <!-- Cargado dinámicamente -->
              <tr>
                <td colspan="10" class="py-12 text-center text-lsa-mute">
                  <div class="inline-flex items-center gap-2">
                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-lsa-cyan"></i>
                    <span>Cargando tabla de clasificación en tiempo real...</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- SECCIÓN: HISTORIAL DE SESIONES RECIENTES -->
      <div class="space-y-4 pt-4">
        <div class="flex items-center gap-3">
          <i data-lucide="history" class="w-5 h-5 text-lsa-cyan"></i>
          <h2 class="font-display italic font-bold text-lg sm:text-xl text-white uppercase tracking-wider">
            Sesiones Recientes de ACC
          </h2>
        </div>

        <div id="recent-sessions-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Cargado dinámicamente -->
        </div>
      </div>

    </main>
  </div>

  <!-- MODAL PARA CONECTARSE AL SERVIDOR -->
  <div id="join-modal" class="fixed inset-0 z-50 hidden bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="lsa-panel cut max-w-md w-full p-6 space-y-5 border border-lsa-wire shadow-2xl relative">
      <div class="flex items-center justify-between border-b border-lsa-wire pb-3">
        <h3 class="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
          <i data-lucide="server" class="w-5 h-5 text-lsa-cyan"></i>
          Conectarse al Servidor ACC
        </h3>
        <button onclick="closeJoinModal()" class="text-lsa-mute hover:text-white transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="space-y-3 text-sm">
        <div>
          <span class="text-xs font-display text-lsa-mute uppercase block">Nombre de Servidor en el Lobby</span>
          <div class="font-mono text-white bg-lsa-deck2 p-2.5 rounded border border-lsa-wire select-all mt-1 text-xs">
            [LSA] LATAM Simracing Alliance
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <span class="text-xs font-display text-lsa-mute uppercase block">Contraseña</span>
            <div class="font-mono text-lsa-gold bg-lsa-deck2 p-2 rounded border border-lsa-wire select-all mt-1 font-bold">
              VelRacing
            </div>
          </div>
          <div>
            <span class="text-xs font-display text-lsa-mute uppercase block">Circuito</span>
            <div class="font-mono text-white bg-lsa-deck2 p-2 rounded border border-lsa-wire mt-1">
              Nürburgring GP
            </div>
          </div>
        </div>

        <p class="text-xs text-lsa-mute pt-2 leading-relaxed">
          Abrí <strong>Assetto Corsa Competizione</strong>, andá a <em>Multijugador ➔ Servidores</em>, buscá por <strong>"LSA"</strong> e ingresá la contraseña.
        </p>
      </div>

      <div class="flex items-center justify-end gap-3 pt-3 border-t border-lsa-wire">
        <button onclick="closeJoinModal()" class="pill ghost text-xs">Cerrar</button>
        <a href="https://lsa-server.emperorservers.com/server/0/join" target="_blank" rel="noopener noreferrer" class="pill text-xs">
          <span>Abrir con ACC Connector</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  </div>

  <!-- PIE DE PÁGINA -->
  <div>
    <div class="tri"><i></i><i></i><i></i></div>
    <footer class="bg-[#060A13] border-t border-lsa-wire py-8 text-lsa-mute text-xs">
      <div class="max-w-[1720px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <img
            src="https://latamsimracing.com/wp-content/uploads/2026/10/lsa-logo-horizontal.jpg"
            alt="LSA"
            class="h-[34px] w-auto mix-blend-lighten object-contain"
            onerror="this.src='/logo.png'"
          />
          <span>© 2026 LATAM SimRacing Alliance</span>
        </div>
        <div class="flex flex-wrap items-center gap-5 font-display uppercase tracking-wider text-[12px]">
          <a href="https://latamsimracing.com/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Web Oficial</a>
          <a href="https://discord.gg/V9hq2EBSA" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Discord</a>
          <a href="https://www.instagram.com/latam_simracing_alliance/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  </div>

  <script>
    function openJoinModal() {
      document.getElementById('join-modal').classList.remove('hidden');
    }
    function closeJoinModal() {
      document.getElementById('join-modal').classList.add('hidden');
    }

    async function fetchAccLiveStatus() {
      try {
        const resp = await fetch('/api/acc/live');
        if (!resp.ok) return;
        const data = await resp.json();

        // 1. Actualizar métricas del hero
        document.getElementById('server-title').textContent = data.serverName || '[LSA] LATAM Simracing Alliance';
        document.getElementById('stat-session').textContent = data.sessionType || 'Práctica';
        document.getElementById('stat-drivers').textContent = (data.connectedDriversCount ?? 0) + ' / ' + (data.maxSlots ?? 32);
        document.getElementById('stat-track').textContent = data.trackName || 'Nürburgring GP';
        document.getElementById('stat-group').textContent = data.carGroup || 'GT3';

        // 2. Mejor vuelta
        if (data.bestLap && data.bestLap.lapFormatted) {
          document.getElementById('best-lap-card').classList.remove('hidden');
          document.getElementById('best-lap-driver').textContent = data.bestLap.driverName;
          document.getElementById('best-lap-car').textContent = data.bestLap.carModel;
          document.getElementById('best-lap-time').textContent = data.bestLap.lapFormatted;
        }

        // 3. Renderizar tabla de posiciones
        const tbody = document.getElementById('standings-tbody');
        if (Array.isArray(data.standings) && data.standings.length > 0) {
          tbody.innerHTML = data.standings.map((row, idx) => {
            const posClass = idx === 0 
              ? 'text-lsa-gold font-bold' 
              : idx === 1 
              ? 'text-slate-300 font-bold' 
              : idx === 2 
              ? 'text-amber-600 font-bold' 
              : 'text-lsa-mute';

            const gapClass = idx === 0 ? 'text-lsa-cyan font-bold' : 'text-lsa-mute';

            return \`
              <tr class="table-row-hover transition-colors">
                <td class="py-3 px-4 text-center font-display \${posClass}">#\${row.position}</td>
                <td class="py-3 px-4 font-semibold text-white">
                  <div class="flex items-center gap-2">
                    <span>\${escapeHtml(row.driverName)}</span>
                    \${row.driverName.includes('[LSA]') ? '<span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-lsa-cyan/15 text-lsa-cyan border border-lsa-cyan/30">LSA</span>' : ''}
                  </div>
                </td>
                <td class="py-3 px-4 text-lsa-ink/80 text-xs font-mono">\${escapeHtml(row.carModel)}</td>
                <td class="py-3 px-4 text-center font-mono text-xs text-lsa-mute">#\${row.raceNumber}</td>
                <td class="py-3 px-4 text-right font-mono font-bold text-white">\${row.bestLapFormatted}</td>
                <td class="py-3 px-3 text-center font-mono text-xs text-lsa-mute">\${row.sectorsFormatted ? row.sectorsFormatted[0] : '-'}</td>
                <td class="py-3 px-3 text-center font-mono text-xs text-lsa-mute">\${row.sectorsFormatted ? row.sectorsFormatted[1] : '-'}</td>
                <td class="py-3 px-3 text-center font-mono text-xs text-lsa-mute">\${row.sectorsFormatted ? row.sectorsFormatted[2] : '-'}</td>
                <td class="py-3 px-4 text-right font-mono text-xs \${gapClass}">\${row.gapFormatted}</td>
                <td class="py-3 px-4 text-center font-mono text-xs text-lsa-mute">\${row.lapsCount}</td>
              </tr>
            \`;
          }).join('');
        } else {
          tbody.innerHTML = \`
            <tr>
              <td colspan="10" class="py-8 text-center text-lsa-mute">
                No hay tiempos registrados aún para la sesión activa.
              </td>
            </tr>
          \`;
        }

        // 4. Renderizar sesiones recientes
        const sessionsGrid = document.getElementById('recent-sessions-grid');
        if (Array.isArray(data.recentSessions) && data.recentSessions.length > 0) {
          sessionsGrid.innerHTML = data.recentSessions.map((s) => {
            return \`
              <div class="lsa-panel2 p-4 rounded-lg border border-lsa-wire space-y-2 hover:border-lsa-cyan/50 transition-colors">
                <div class="flex items-center justify-between text-xs">
                  <span class="px-2 py-0.5 rounded bg-lsa-wire text-lsa-cyan font-display uppercase tracking-wider font-bold">
                    \${escapeHtml(s.managerSessionType || s.sessionType)}
                  </span>
                  <span class="text-lsa-mute">\${s.dateFormatted}</span>
                </div>
                <div class="font-display font-bold text-white text-base truncate">
                  \${escapeHtml(s.track)}
                </div>
                <div class="pt-2 flex items-center justify-between border-t border-lsa-wire/60 text-xs">
                  <span class="text-lsa-mute">Resultados oficiales</span>
                  <a href="https://lsa-server.emperorservers.com\${s.downloadUrl}" target="_blank" class="text-lsa-cyan hover:underline flex items-center gap-1 font-mono">
                    <span>JSON</span>
                    <i data-lucide="download" class="w-3 h-3"></i>
                  </a>
                </div>
              </div>
            \`;
          }).join('');
        }

        document.getElementById('last-updated-text').textContent = 'Sincronizado: ' + new Date().toLocaleTimeString('es-AR');
        if (window.lucide) lucide.createIcons();
      } catch (e) {
        console.error('Error al actualizar live status de ACC:', e);
      }
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Polling cada 4 segundos
    fetchAccLiveStatus();
    setInterval(fetchAccLiveStatus, 4000);

    if (window.lucide) lucide.createIcons();
  </script>
</body>
</html>
`;
