import { renderLayout } from '../layout.html.js';

export function renderRulesPage(regulations: any[] = []): string {
  const content = `
    <div style="position:relative;border-bottom:1px solid var(--wire);background:radial-gradient(60% 90% at 85% 20%,rgba(35,182,224,.16),transparent 60%),radial-gradient(50% 80% at 10% 100%,rgba(227,38,27,.16),transparent 60%),var(--night);padding-block:60px 40px;text-align:center;">
      <div class="wrap" style="max-width:700px;">
        <div style="display:inline-flex;align-items:center;gap:10px;font:600 12px var(--display);letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);padding:6px 14px;border:1px solid rgba(35,182,224,.35);border-radius:999px;background:rgba(35,182,224,.07);margin-bottom:14px;">
          <span style="width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);display:inline-block;"></span>
          Código Deportivo LSA
        </div>
        <h1 style="font-size:clamp(38px,6vw,72px);margin-bottom:14px;">
          Reglamento <em>Oficial</em>
        </h1>
        <p style="color:#C3CDDD;font-size:16px;line-height:1.5;margin:0;">
          Normativa general de competición, formatos de carrera, sistema de puntuación, comisarios deportivos y código de sanciones.
        </p>
      </div>
    </div>

    <div class="sec">
      <div class="wrap" style="max-width:860px;">

        <!-- 1. FORMATOS -->
        <div class="panel cut" style="padding:32px;margin-bottom:24px;">
          <div class="kick">Artículo 1</div>
          <h2 style="font-size:28px;margin-bottom:16px;">Formatos de Carrera</h2>
          <div style="display:grid;gap:14px;color:#C3CDDD;font-size:15px;line-height:1.6;">
            <p>
              • <strong style="color:#fff;">Doble Sprint:</strong> 2 mangas puntuables de 25 minutos con clasificación previa (15 min). La Carrera 2 se disputa con grilla invertida de los 10 primeros clasificados de la Carrera 1.
            </p>
            <p>
              • <strong style="color:#fff;">Sprint + Mini Endurance:</strong> 1 carrera sprint de 20 minutos + 1 carrera de 40 minutos con parada obligatoria en boxes para cambio de 4 neumáticos.
            </p>
            <p>
              • <strong style="color:#fff;">Endurance Pro (Gran Final):</strong> Carrera especial de 60 minutos con estrategia abierta de boxes, repostaje libre y neumáticos obligatorios.
            </p>
          </div>
        </div>

        <!-- 2. PUNTOS -->
        <div class="panel cut" style="padding:32px;margin-bottom:24px;">
          <div class="kick">Artículo 2</div>
          <h2 style="font-size:28px;margin-bottom:16px;">Sistema de Puntuación Oficial</h2>
          <p style="color:#C3CDDD;font-size:15px;line-height:1.6;margin-bottom:18px;">
            Los puntos se otorgan a los pilotos que completen al menos el 75% de la distancia total de carrera:
          </p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;text-align:center;">
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;border-top:3px solid var(--gold);">
              <b style="font:700 italic 26px var(--display);color:var(--gold);">35</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">1º Puesto</span>
            </div>
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;border-top:3px solid #C9D3DF;">
              <b style="font:700 italic 26px var(--display);color:#C9D3DF;">30</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">2º Puesto</span>
            </div>
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;border-top:3px solid #D9863F;">
              <b style="font:700 italic 26px var(--display);color:#D9863F;">26</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">3º Puesto</span>
            </div>
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;">
              <b style="font:700 italic 26px var(--display);color:#fff;">23</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">4º Puesto</span>
            </div>
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;">
              <b style="font:700 italic 26px var(--display);color:#fff;">20</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">5º Puesto</span>
            </div>
            <div style="background:#080D18;border:1px solid var(--wire);padding:12px;">
              <b style="font:700 italic 26px var(--display);color:#fff;">17</b>
              <span style="display:block;font:600 11px var(--display);color:var(--mute);margin-top:4px;">6º Puesto</span>
            </div>
          </div>
          <div style="margin-top:16px;padding:12px 16px;background:rgba(35,182,224,.07);border:1px solid rgba(35,182,224,.3);border-radius:4px;display:flex;gap:20px;font:700 13px var(--display);text-transform:uppercase;color:#fff;">
            <span>🟣 Vuelta Rápida: <strong style="color:var(--violet);">+2 Puntos</strong></span>
            <span>🟡 Pole Position: <strong style="color:var(--gold);">+2 Puntos</strong></span>
          </div>
        </div>

        <!-- 3. COMISARIOS Y SUPERLICENCIA -->
        <div class="panel cut" style="padding:32px;">
          <div class="kick">Artículo 3</div>
          <h2 style="font-size:28px;margin-bottom:16px;">Superlicencia y Comisariato</h2>
          <div style="display:grid;gap:14px;color:#C3CDDD;font-size:15px;line-height:1.6;">
            <p>
              • Cada piloto inscrito cuenta con <strong style="color:#fff;">12 puntos</strong> en su Superlicencia LSA.
            </p>
            <p>
              • Las maniobras antideportivas, contactos evitables o reincorporaciones peligrosas (unsafe rejoin) son analizadas por los comisarios tras la carrera y conllevan deducción de puntos y recargos de tiempo (5s / 10s / Stop & Go).
            </p>
            <p>
              • Un piloto que pierda la totalidad de sus 12 puntos queda suspendido para la fecha siguiente de forma automática.
            </p>
          </div>
        </div>

      </div>
    </div>
  `;

  return renderLayout(content, { title: 'Reglamento Oficial', activeNav: 'reglamento' });
}
