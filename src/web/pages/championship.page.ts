import { renderLayout } from '../layout.html.js';

export function renderChampionshipPage(options: {
  slug: string;
  name: string;
  game: string;
  description: string;
  standingsGeneral: any[];
  standingsPro: any[];
  standingsRookie: any[];
  standingsMarcas: any[];
  rounds: any[];
}): string {
  const isGt3 = options.slug === 'gt3-2026';

  const content = `
    <!-- HEADER CAMPEONATO -->
    <div style="position:relative;border-bottom:1px solid var(--wire);background:radial-gradient(60% 90% at 85% 20%,rgba(35,182,224,.16),transparent 60%),radial-gradient(50% 80% at 10% 100%,rgba(227,38,27,.16),transparent 60%),var(--night);padding-block:54px 34px;">
      <div class="wrap">
        <div style="display:inline-flex;align-items:center;gap:10px;font:600 12px var(--display);letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);padding:6px 14px;border:1px solid rgba(35,182,224,.35);border-radius:999px;background:rgba(35,182,224,.07);margin-bottom:14px;">
          <span style="width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);display:inline-block;"></span>
          ${options.game.toUpperCase()} · Temporada 2026
        </div>
        <h1 style="font-size:clamp(40px,7vw,84px);line-height:.9;margin-bottom:14px;">
          ${options.name.replace(/GT3 2026|GT4/g, '<em>$&</em>')}
        </h1>
        <p style="color:#C3CDDD;font-size:16px;max-width:54ch;margin:0 0 24px;line-height:1.5;">
          ${options.description}
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/inscribirse?championship=${options.slug}" class="pill">Inscribirme a este campeonato</a>
          <a href="/reglamento" class="pill ghost">Ver Reglamento ›</a>
        </div>
      </div>
    </div>

    <!-- TABS DE NAVEGACIÓN INTERNA -->
    <div style="position:sticky;top:66px;z-index:40;background:rgba(6,10,19,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--wire);">
      <div class="wrap" style="display:flex;gap:4px;overflow-x:auto;">
        <button onclick="switchChampTab('general')" id="tab-btn-general" class="champ-tab-btn pill ghost" style="border:0;box-shadow:none;border-radius:0;border-bottom:3px solid var(--red);color:#fff;padding:16px 16px;">
          Clasificación General
        </button>
        <button onclick="switchChampTab('pro')" id="tab-btn-pro" class="champ-tab-btn pill ghost" style="border:0;box-shadow:none;border-radius:0;border-bottom:3px solid transparent;color:var(--mute);padding:16px 16px;">
          PRO
        </button>
        <button onclick="switchChampTab('rookie')" id="tab-btn-rookie" class="champ-tab-btn pill ghost" style="border:0;box-shadow:none;border-radius:0;border-bottom:3px solid transparent;color:var(--mute);padding:16px 16px;">
          Rookie
        </button>
        <button onclick="switchChampTab('marcas')" id="tab-btn-marcas" class="champ-tab-btn pill ghost" style="border:0;box-shadow:none;border-radius:0;border-bottom:3px solid transparent;color:var(--mute);padding:16px 16px;">
          Marcas
        </button>
        <button onclick="switchChampTab('calendario')" id="tab-btn-calendario" class="champ-tab-btn pill ghost" style="border:0;box-shadow:none;border-radius:0;border-bottom:3px solid transparent;color:var(--mute);padding:16px 16px;">
          Calendario & Fechas
        </button>
      </div>
    </div>

    <!-- CONTENIDO DE TABS -->
    <div class="sec">
      <div class="wrap">

        <!-- 1. TAB: GENERAL -->
        <div id="champ-tab-general" class="champ-content">
          <div class="shead">
            <div>
              <div class="kick">Puntaje Acumulado</div>
              <h2>Clasificación General</h2>
            </div>
          </div>
          <div class="panel cut">
            <div style="overflow-x:auto;">
              <table class="lsa-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:52px;">Pos</th>
                    <th style="width:60px;">#</th>
                    <th>Piloto</th>
                    <th>Vehículo</th>
                    <th>Cat.</th>
                    <th style="text-align:center;">Vic.</th>
                    <th style="text-align:center;">Pod.</th>
                    <th style="text-align:center;">Pole</th>
                    <th style="text-align:right;">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  ${options.standingsGeneral.map((d, i) => `
                    <tr class="p${i + 1}">
                      <td class="pos">${i + 1}</td>
                      <td style="color:var(--mute);font-weight:700;">${d.race_number ? '#' + d.race_number : '—'}</td>
                      <td style="font-weight:700;color:#fff;">${d.driver_name}</td>
                      <td style="color:#C9D3DF;">${d.car_name}</td>
                      <td><span style="font:700 10px var(--display);padding:3px 7px;border-radius:3px;background:rgba(255,255,255,.08);color:#fff;">${d.category}</span></td>
                      <td style="text-align:center;color:var(--mute);">${d.wins ?? 0}</td>
                      <td style="text-align:center;color:var(--mute);">${d.podiums ?? 0}</td>
                      <td style="text-align:center;color:var(--mute);">${d.poles ?? 0}</td>
                      <td class="pts">${d.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 2. TAB: PRO -->
        <div id="champ-tab-pro" class="champ-content" style="display:none;">
          <div class="shead">
            <div>
              <div class="kick">Categoría Principal</div>
              <h2>Clasificación PRO</h2>
            </div>
          </div>
          <div class="panel cut">
            <div style="overflow-x:auto;">
              <table class="lsa-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:52px;">Pos</th>
                    <th style="width:60px;">#</th>
                    <th>Piloto</th>
                    <th>Vehículo</th>
                    <th style="text-align:center;">Vic.</th>
                    <th style="text-align:center;">Pod.</th>
                    <th style="text-align:center;">Pole</th>
                    <th style="text-align:right;">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  ${options.standingsPro.map((d, i) => `
                    <tr class="p${i + 1}">
                      <td class="pos">${i + 1}</td>
                      <td style="color:var(--mute);font-weight:700;">#${d.race_number || ''}</td>
                      <td style="font-weight:700;color:#fff;">${d.driver_name}</td>
                      <td style="color:#C9D3DF;">${d.car_name}</td>
                      <td style="text-align:center;color:var(--mute);">${d.wins ?? 0}</td>
                      <td style="text-align:center;color:var(--mute);">${d.podiums ?? 0}</td>
                      <td style="text-align:center;color:var(--mute);">${d.poles ?? 0}</td>
                      <td class="pts">${d.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. TAB: ROOKIE -->
        <div id="champ-tab-rookie" class="champ-content" style="display:none;">
          <div class="shead">
            <div>
              <div class="kick">Pilotos Debutantes</div>
              <h2>Clasificación Rookie</h2>
            </div>
          </div>
          <div class="panel cut">
            <div style="overflow-x:auto;">
              <table class="lsa-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:52px;">Pos</th>
                    <th style="width:60px;">#</th>
                    <th>Piloto</th>
                    <th>Vehículo</th>
                    <th style="text-align:right;">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  ${options.standingsRookie.map((d, i) => `
                    <tr class="p${i + 1}">
                      <td class="pos">${i + 1}</td>
                      <td style="color:var(--mute);font-weight:700;">#${d.race_number || ''}</td>
                      <td style="font-weight:700;color:#fff;">${d.driver_name}</td>
                      <td style="color:#C9D3DF;">${d.car_name}</td>
                      <td class="pts">${d.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 4. TAB: MARCAS -->
        <div id="champ-tab-marcas" class="champ-content" style="display:none;">
          <div class="shead">
            <div>
              <div class="kick">Constructores</div>
              <h2>Campeonato de Marcas</h2>
            </div>
          </div>
          <div class="panel cut">
            <div style="overflow-x:auto;">
              <table class="lsa-table">
                <thead>
                  <tr>
                    <th style="text-align:center;width:52px;">Pos</th>
                    <th>Marca</th>
                    <th>Modelo Oficial</th>
                    <th style="text-align:right;">Puntos Totales</th>
                  </tr>
                </thead>
                <tbody>
                  ${options.standingsMarcas.map((d, i) => `
                    <tr class="p${i + 1}">
                      <td class="pos">${i + 1}</td>
                      <td style="font-weight:700;color:#fff;font-size:16px;">${d.driver_name}</td>
                      <td style="color:var(--mute);">${d.car_name}</td>
                      <td class="pts">${d.points}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 5. TAB: CALENDARIO -->
        <div id="champ-tab-calendario" class="champ-content" style="display:none;">
          <div class="shead">
            <div>
              <div class="kick">Ronda por Ronda</div>
              <h2>Calendario Oficial</h2>
            </div>
          </div>
          <div class="cal-grid">
            ${options.rounds.map(r => `
              <div class="rd-card ${r.status === 'completed' ? 'done' : r.status === 'next' ? 'next' : ''}">
                <div class="rnum">0${r.round_number}</div>
                <div class="rflag">${r.country_code === 'US' ? '🇺🇸' : r.country_code === 'JP' ? '🇯🇵' : r.country_code === 'ES' ? '🇪🇸' : r.country_code === 'FR' ? '🇫🇷' : r.country_code === 'GB' ? '🇬🇧' : r.country_code === 'DE' ? '🇩🇪' : '🇧🇪'}</div>
                <div>
                  <b>${r.track_name}</b>
                  <div class="rfmt">${r.format_desc}</div>
                </div>
                <div class="st">${r.status === 'completed' ? 'Disputada' : r.status === 'next' ? 'Próxima Fecha' : 'Por Disputar'}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>

    <script>
      function switchChampTab(tab) {
        document.querySelectorAll('.champ-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.champ-tab-btn').forEach(btn => {
          btn.style.borderBottomColor = 'transparent';
          btn.style.color = 'var(--mute)';
        });

        const activeContent = document.getElementById('champ-tab-' + tab);
        if (activeContent) activeContent.style.display = 'block';

        const activeBtn = document.getElementById('tab-btn-' + tab);
        if (activeBtn) {
          activeBtn.style.borderBottomColor = 'var(--red)';
          activeBtn.style.color = '#fff';
        }
      }
    </script>
  `;

  return renderLayout(content, { title: options.name, activeNav: 'campeonato' });
}
