import { renderLayout } from '../layout.html.js';

export function renderHomePage(data: {
  standings?: any[];
  rounds?: any[];
  posts?: any[];
}): string {
  const standings = data.standings || [];
  const rounds = data.rounds || [];
  const posts = data.posts || [];

  const content = `
    <!-- HERO SECTION -->
    <section class="hero" style="position:relative;overflow:hidden;border-bottom:1px solid var(--wire);background:radial-gradient(60% 70% at 78% 30%,rgba(35,182,224,.16),transparent 60%),radial-gradient(50% 60% at 15% 80%,rgba(227,38,27,.14),transparent 60%),var(--night);">
      <div class="wrap" style="position:relative;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.9fr);gap:48px;align-items:center;padding-block:84px 96px;">
        <div>
          <div class="eyebrow" style="display:inline-flex;align-items:center;gap:10px;font:600 12px var(--display);letter-spacing:.24em;text-transform:uppercase;color:var(--cyan);padding:6px 14px;border:1px solid rgba(35,182,224,.35);border-radius:999px;background:rgba(35,182,224,.07);">
            <span style="width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);display:inline-block;"></span>
            Ligas Oficiales · Temporada 2026
          </div>
          <h1 style="font-size:clamp(44px,7.2vw,88px);line-height:.9;margin:22px 0 18px;">
            Construyendo el futuro del <em>simracing en Latam</em>
          </h1>
          <p style="font-size:18px;color:#C3CDDD;max-width:36ch;margin:0 0 30px;line-height:1.5;">
            Ligas de alto nivel en <strong>Assetto Corsa Competizione</strong> y <strong>Assetto Corsa</strong> con comisarios deportivos, telemetría y live timing en tiempo real.
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:14px;">
            <a href="/inscribirse" class="pill">
              Inscríbete a la liga
            </a>
            <a href="/live" class="pill ghost">
              <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--cyan);margin-right:4px;"></span>
              Live Timing LSA
            </a>
            <a href="/campeonato-gt3-2026" class="pill ghost">
              Ver Campeonato GT3 ›
            </a>
          </div>
        </div>

        <!-- TARJETA PRÓXIMA FECHA -->
        <div class="nextp cut" style="background:linear-gradient(180deg,rgba(17,26,45,.95),rgba(12,19,34,.95));border:1px solid var(--wire);">
          <div style="padding:24px 24px 20px;border-bottom:1px solid var(--wire);">
            <span style="font:600 12px var(--display);letter-spacing:.22em;text-transform:uppercase;color:var(--red);">Próxima Fecha · GT3 2026</span>
            <h3 style="font-size:32px;line-height:1;margin:10px 0 6px;">F07 · Nürburgring GP</h3>
            <div style="color:var(--mute);font-size:14px;">Sprint + Mini Endurance · 🇩🇪 Alemania</div>
          </div>
          <ul style="list-style:none;margin:0;padding:0;">
            <li style="border-top:1px solid var(--wire);">
              <a href="/campeonato-gt3-2026#clasificacion" style="display:flex;align-items:center;justify-content:space-between;text-decoration:none;font:700 13px var(--display);letter-spacing:.1em;text-transform:uppercase;padding:0 0 0 24px;height:52px;color:var(--ink);">
                Clasificación General
                <span style="display:grid;place-items:center;width:52px;height:100%;background:var(--red);color:#fff;font-size:20px;">›</span>
              </a>
            </li>
            <li style="border-top:1px solid var(--wire);">
              <a href="/campeonato-gt3-2026#calendario" style="display:flex;align-items:center;justify-content:space-between;text-decoration:none;font:700 13px var(--display);letter-spacing:.1em;text-transform:uppercase;padding:0 0 0 24px;height:52px;color:var(--ink);">
                Calendario Completo
                <span style="display:grid;place-items:center;width:52px;height:100%;background:var(--red);color:#fff;font-size:20px;">›</span>
              </a>
            </li>
            <li style="border-top:1px solid var(--wire);">
              <a href="/live" style="display:flex;align-items:center;justify-content:space-between;text-decoration:none;font:700 13px var(--display);letter-spacing:.1em;text-transform:uppercase;padding:0 0 0 24px;height:52px;color:var(--ink);">
                Servidor en Vivo (Live Timing)
                <span style="display:grid;place-items:center;width:52px;height:100%;background:var(--red);color:#fff;font-size:20px;">›</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ESTADÍSTICAS RÁPIDAS -->
    <section style="background:var(--deck);border-bottom:1px solid var(--wire);">
      <div class="wrap">
        <ul style="list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);">
          <li style="padding:24px 12px;text-align:center;border-left:1px solid var(--wire);">
            <b style="display:block;font:700 italic clamp(30px,4vw,42px)/1 var(--display);color:#fff;">8</b>
            <span style="display:block;margin-top:6px;font:600 11px var(--display);letter-spacing:.2em;text-transform:uppercase;color:var(--mute);">Fechas Oficiales</span>
          </li>
          <li style="padding:24px 12px;text-align:center;border-left:1px solid var(--wire);">
            <b style="display:block;font:700 italic clamp(30px,4vw,42px)/1 var(--display);color:#fff;">38+</b>
            <span style="display:block;margin-top:6px;font:600 11px var(--display);letter-spacing:.2em;text-transform:uppercase;color:var(--mute);">Pilotos en Grilla</span>
          </li>
          <li style="padding:24px 12px;text-align:center;border-left:1px solid var(--wire);">
            <b style="display:block;font:700 italic clamp(30px,4vw,42px)/1 var(--display);color:#fff;">8</b>
            <span style="display:block;margin-top:6px;font:600 11px var(--display);letter-spacing:.2em;text-transform:uppercase;color:var(--mute);">Marcas GT3</span>
          </li>
          <li style="padding:24px 12px;text-align:center;border-left:1px solid var(--wire);">
            <b style="display:block;font:700 italic clamp(30px,4vw,42px)/1 var(--display);color:var(--cyan);">0 ms</b>
            <span style="display:block;margin-top:6px;font:600 11px var(--display);letter-spacing:.2em;text-transform:uppercase;color:var(--mute);">Live Timing SSE</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- CAMPEONATOS DESTACADOS -->
    <section class="sec">
      <div class="wrap">
        <div class="shead">
          <div>
            <div class="kick">Torneos Activos</div>
            <h2>Nuestros Campeonatos</h2>
          </div>
          <a href="/inscribirse" class="pill red" style="padding:9px 18px;font-size:12px;">Inscríbete Aquí</a>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">
          <!-- CARD GT3 -->
          <div class="panel cut" style="background:var(--deck2);border:1px solid var(--wire);padding:28px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <span style="font:700 11px var(--display);letter-spacing:.18em;text-transform:uppercase;color:var(--red);">Assetto Corsa Competizione</span>
              <span style="font:700 11px var(--display);letter-spacing:.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:rgba(227,38,27,.2);color:#ff6b61;border:1px solid rgba(227,38,27,.3);">En Curso</span>
            </div>
            <h3 style="font-size:28px;margin-bottom:8px;padding:0;border:0;">Campeonato GT3 2026</h3>
            <p style="color:var(--mute);font-size:14px;margin-bottom:24px;line-height:1.5;">
              8 fechas, grilla invertida, categorías PRO y Rookie, telemetría por sectores y clasificación de marcas.
            </p>
            <div style="display:flex;gap:12px;">
              <a href="/campeonato-gt3-2026" class="pill" style="padding:9px 18px;font-size:12px;">Ver Campeonato ›</a>
              <a href="/inscribirse?championship=gt3-2026" class="pill ghost" style="padding:9px 18px;font-size:12px;">Inscribirse</a>
            </div>
          </div>

          <!-- CARD GINETTA GT4 -->
          <div class="panel cut" style="background:var(--deck2);border:1px solid var(--wire);padding:28px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
              <span style="font:700 11px var(--display);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);">Assetto Corsa</span>
              <span style="font:700 11px var(--display);letter-spacing:.12em;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:rgba(242,185,43,.2);color:var(--gold);border:1px solid rgba(242,185,43,.3);">Próximamente</span>
            </div>
            <h3 style="font-size:28px;margin-bottom:8px;padding:0;border:0;">Copa Ginetta G55 GT4</h3>
            <p style="color:var(--mute);font-size:14px;margin-bottom:24px;line-height:1.5;">
              Copa monomarca con setup fijo para Assetto Corsa. Carreras ajustadas donde el talento del piloto marca la diferencia.
            </p>
            <div style="display:flex;gap:12px;">
              <a href="/campeonato-ginetta-gt4" class="pill" style="padding:9px 18px;font-size:12px;">Ver Detalles ›</a>
              <a href="/inscribirse?championship=ginetta-gt4" class="pill ghost" style="padding:9px 18px;font-size:12px;">Reservar Cupo</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOTICIAS Y CRÓNICAS -->
    <section class="sec alt">
      <div class="wrap">
        <div class="shead">
          <div>
            <div class="kick">Actualidad LSA</div>
            <h2>Últimas Noticias</h2>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
          ${posts.slice(0, 3).map(p => `
            <div class="panel cut" style="padding:24px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                <span style="font:700 10px var(--display);letter-spacing:.15em;text-transform:uppercase;color:var(--cyan);">${p.category}</span>
                ${p.round_ref ? `<span style="font:700 10px var(--display);color:var(--mute);">${p.round_ref}</span>` : ''}
              </div>
              <h3 style="font-size:22px;line-height:1.2;margin-bottom:10px;padding:0;border:0;">${p.title}</h3>
              <p style="color:var(--mute);font-size:14px;line-height:1.5;margin-bottom:16px;">${p.summary}</p>
              <div style="font-size:12px;color:var(--mute);font-family:var(--display);">Por ${p.author || 'Staff LSA'}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CALENDARIO RESUMIDO -->
    <section class="sec">
      <div class="wrap">
        <div class="shead">
          <div>
            <div class="kick">Temporada 2026</div>
            <h2>Calendario GT3</h2>
          </div>
          <a href="/campeonato-gt3-2026#calendario" class="pill ghost" style="padding:9px 18px;font-size:12px;">Ver Calendario Completo ›</a>
        </div>

        <div class="cal-grid">
          ${rounds.slice(0, 4).map(r => `
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
    </section>

    <!-- CTA COMUNIDAD -->
    <section class="sec alt" style="border-top:1px solid var(--wire);">
      <div class="wrap" style="text-align:center;max-width:700px;">
        <div class="kick" style="justify-content:center;">Únete a la familia</div>
        <h2 style="font-size:clamp(36px,5vw,56px);margin-bottom:16px;">¿Listo para correr con nosotros?</h2>
        <p style="color:#C3CDDD;font-size:17px;margin-bottom:30px;line-height:1.5;">
          Compite contra los mejores pilotos de Latinoamérica, comparte telemetría, setups y sé parte de una comunidad limpia y competitiva.
        </p>
        <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap;">
          <a href="/inscribirse" class="pill red">Inscribirme Ahora</a>
          <a href="https://discord.gg/V9hq2EBSA" target="_blank" class="pill ghost">Unirse al Discord</a>
        </div>
      </div>
    </section>
  `;

  return renderLayout(content, { title: 'Inicio', activeNav: 'inicio' });
}
