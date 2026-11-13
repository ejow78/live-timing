import { LSA_STYLES_CSS } from './styles.css.js';

export function renderLayout(content: string, options: { title?: string; activeNav?: string; extraHead?: string } = {}): string {
  const title = options.title ? `${options.title} · Latam Simracing Alliance` : 'Latam Simracing Alliance · Campeonatos de Simracing de Latinoamérica';
  const active = options.activeNav || '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" type="image/png" href="/logo.png">
  <style>
    ${LSA_STYLES_CSS}
  </style>
  ${options.extraHead || ''}
</head>
<body>

  <!-- CABECERA OFICIAL LSA -->
  <header class="site">
    <div class="in">
      <a href="/" class="logo">
        <img src="/logo.png" alt="LATAM Simracing Alliance" class="logo-img">
      </a>

      <!-- NAVEGACIÓN PRINCIPAL -->
      <ul class="menu">
        <li>
          <a href="/" class="${active === 'inicio' ? 'active' : ''}">Inicio</a>
        </li>
        <li>
          <a href="/campeonatos" class="${active.startsWith('campeonato') ? 'active' : ''}">Campeonatos ▾</a>
          <ul class="drop">
            <li>
              <a href="/campeonato-gt3-2026">
                <b>GT3</b>
                <div>
                  <span>Campeonato GT3 2026</span>
                  <i>En curso · ACC</i>
                </div>
              </a>
            </li>
            <li>
              <a href="/campeonato-ginetta-gt4">
                <b>GT4</b>
                <div>
                  <span>Campeonato Ginetta GT4</span>
                  <i>Próximamente · AC</i>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/live" class="${active === 'live' ? 'active' : ''}">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 8px var(--red);margin-right:2px;"></span>
            Live Timing
          </a>
        </li>
        <li>
          <a href="/reglamento" class="${active === 'reglamento' ? 'active' : ''}">Reglamento</a>
        </li>
        <li>
          <a href="/inscribirse" class="pill ${active === 'inscribirse' ? 'red' : ''}" style="padding: 7px 16px; font-size: 12px; margin-left: 6px;">
            Inscripción ↗
          </a>
        </li>
      </ul>

      <!-- REDES SOCIALES -->
      <div class="soc">
        <a href="https://discord.gg/V9hq2EBSA" target="_blank" title="Discord Oficial LSA">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/latam_simracing_alliance/" target="_blank" title="Instagram Oficial LSA">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
      </div>
    </div>
  </header>

  <!-- CONTENIDO PRINCIPAL MODULAR -->
  <main>
    ${content}
  </main>

  <!-- FRANJA TRICOLOR LSA (4px) -->
  <div class="tri">
    <i></i><i></i><i></i>
  </div>

  <!-- PIE DE PÁGINA OFICIAL -->
  <footer class="lsfoot">
    <div class="wrap">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="/logo.png" alt="LSA" class="logo-img" style="height:32px;">
        <span style="font-size:13px;color:var(--mute);">
          Latam Simracing Alliance · Campeonatos de simracing de Latinoamérica
        </span>
      </div>
      <div style="display:flex;align-items:center;gap:18px;">
        <a href="/campeonatos" style="font-size:13px;color:var(--mute);">Campeonatos</a>
        <a href="/reglamento" style="font-size:13px;color:var(--mute);">Reglamento</a>
        <a href="/live" style="font-size:13px;color:var(--cyan);">Live Timing</a>
        <a href="https://discord.gg/V9hq2EBSA" target="_blank" style="font-size:13px;color:var(--mute);">Discord</a>
      </div>
    </div>
  </footer>

</body>
</html>`;
}
