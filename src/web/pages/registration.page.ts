import { renderLayout } from '../layout.html.js';

export function renderRegistrationPage(defaultChamp: string = 'gt3-2026'): string {
  const content = `
    <div style="position:relative;border-bottom:1px solid var(--wire);background:radial-gradient(60% 90% at 85% 20%,rgba(35,182,224,.16),transparent 60%),radial-gradient(50% 80% at 10% 100%,rgba(227,38,27,.16),transparent 60%),var(--night);padding-block:60px 40px;text-align:center;">
      <div class="wrap" style="max-width:700px;">
        <div style="display:inline-flex;align-items:center;gap:10px;font:600 12px var(--display);letter-spacing:.22em;text-transform:uppercase;color:var(--cyan);padding:6px 14px;border:1px solid rgba(35,182,224,.35);border-radius:999px;background:rgba(35,182,224,.07);margin-bottom:14px;">
          <span style="width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);display:inline-block;"></span>
          Grilla Oficial LSA
        </div>
        <h1 style="font-size:clamp(38px,6vw,72px);margin-bottom:14px;">
          Formulario de <em>Inscripción</em>
        </h1>
        <p style="color:#C3CDDD;font-size:16px;line-height:1.5;margin:0;">
          Completa tus datos de piloto para postular a los campeonatos oficiales de Latam Simracing Alliance. Los comisarios revisarán tu solicitud para confirmar tu dorsal y cupo.
        </p>
      </div>
    </div>

    <div class="sec">
      <div class="wrap" style="max-width:680px;">
        <div class="form-card cut">
          <form id="reg-form" onsubmit="submitRegistration(event)">
            <div class="form-group">
              <label class="form-label">Nombre y Apellido del Piloto *</label>
              <input type="text" id="reg-name" required placeholder="Ej: Felipe Espinoza" class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">Usuario / Tag de Discord *</label>
              <input type="text" id="reg-discord" required placeholder="Ej: usuario#1234 o @usuario" class="form-control">
              <span style="font-size:12px;color:var(--mute);margin-top:4px;display:block;">Es obligatorio para recibir avisos de carrera, reuniones de pilotos y sanciones.</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Campeonato *</label>
                <select id="reg-champ" class="form-control" onchange="updateCarOptions(this.value)">
                  <option value="gt3-2026" ${defaultChamp === 'gt3-2026' ? 'selected' : ''}>Campeonato GT3 2026 (ACC)</option>
                  <option value="ginetta-gt4" ${defaultChamp === 'ginetta-gt4' ? 'selected' : ''}>Copa Ginetta G55 GT4 (AC)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Categoría *</label>
                <select id="reg-category" class="form-control">
                  <option value="Rookie" selected>Rookie (Iniciación / Pilotos nuevos)</option>
                  <option value="PRO">PRO (Experiencia demostrable en simracing)</option>
                </select>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;">
              <div class="form-group">
                <label class="form-label">Vehículo Elegido *</label>
                <select id="reg-car" class="form-control">
                  <option value="Mercedes-AMG GT3 Evo">Mercedes-AMG GT3 Evo</option>
                  <option value="Porsche 992 GT3 R">Porsche 992 GT3 R</option>
                  <option value="Aston Martin Vantage AMR GT3">Aston Martin Vantage AMR GT3</option>
                  <option value="Ferrari 296 GT3">Ferrari 296 GT3</option>
                  <option value="BMW M4 GT3">BMW M4 GT3</option>
                  <option value="Audi R8 LMS Evo II">Audi R8 LMS Evo II</option>
                  <option value="Lamborghini Huracán GT3 Evo2">Lamborghini Huracán GT3 Evo2</option>
                  <option value="McLaren 720S GT3 Evo">McLaren 720S GT3 Evo</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Dorsal (1-999) *</label>
                <input type="number" id="reg-number" min="1" max="999" required placeholder="Ej: 24" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Steam ID (opcional)</label>
              <input type="text" id="reg-steam" placeholder="7656119..." class="form-control" style="font-family:var(--display);">
              <span style="font-size:12px;color:var(--mute);margin-top:4px;display:block;">Nos permite agregarte automáticamente a la Entry List del servidor.</span>
            </div>

            <div style="margin:24px 0;">
              <label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14px;color:#C3CDDD;">
                <input type="checkbox" required style="margin-top:3px;accent-color:var(--red);">
                <span>He leído y acepto el <a href="/reglamento" target="_blank" style="color:var(--cyan);text-decoration:underline;">Reglamento Deportivo y Código de Conducta de LSA</a>.</span>
              </label>
            </div>

            <button type="submit" id="btn-submit" class="pill red" style="width:100%;justify-content:center;padding:14px;font-size:15px;">
              Enviar Inscripción Oficial
            </button>
          </form>

          <div id="reg-success" style="display:none;text-align:center;padding:24px 0;">
            <div style="font-size:48px;margin-bottom:12px;">🏁</div>
            <h3 style="font-size:28px;margin-bottom:10px;">¡Inscripción Recibida!</h3>
            <p style="color:#C3CDDD;font-size:15px;line-height:1.5;margin-bottom:20px;">
              Tu solicitud ha sido enviada al comisariato deportivo. Te contactaremos por Discord para confirmar tu cupo y dorsal en la grilla.
            </p>
            <a href="https://discord.gg/V9hq2EBSA" target="_blank" class="pill">
              Entrar al Discord de LSA
            </a>
          </div>
        </div>
      </div>
    </div>

    <script>
      function updateCarOptions(champ) {
        const select = document.getElementById('reg-car');
        if (champ === 'ginetta-gt4') {
          select.innerHTML = '<option value="Ginetta G55 GT4">Ginetta G55 GT4 (Assetto Corsa)</option>';
        } else {
          select.innerHTML = \`
            <option value="Mercedes-AMG GT3 Evo">Mercedes-AMG GT3 Evo</option>
            <option value="Porsche 992 GT3 R">Porsche 992 GT3 R</option>
            <option value="Aston Martin Vantage AMR GT3">Aston Martin Vantage AMR GT3</option>
            <option value="Ferrari 296 GT3">Ferrari 296 GT3</option>
            <option value="BMW M4 GT3">BMW M4 GT3</option>
            <option value="Audi R8 LMS Evo II">Audi R8 LMS Evo II</option>
            <option value="Lamborghini Huracán GT3 Evo2">Lamborghini Huracán GT3 Evo2</option>
            <option value="McLaren 720S GT3 Evo">McLaren 720S GT3 Evo</option>
          \`;
        }
      }

      async function submitRegistration(e) {
        e.preventDefault();
        const btn = document.getElementById('btn-submit');
        btn.disabled = true;
        btn.innerText = 'Enviando...';

        const payload = {
          championship_slug: document.getElementById('reg-champ').value,
          driver_name: document.getElementById('reg-name').value.trim(),
          discord_tag: document.getElementById('reg-discord').value.trim(),
          car_choice: document.getElementById('reg-car').value,
          race_number: parseInt(document.getElementById('reg-number').value),
          category: document.getElementById('reg-category').value,
          steam_id: document.getElementById('reg-steam').value.trim() || null
        };

        try {
          const res = await fetch('/api/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Error al enviar');

          document.getElementById('reg-form').style.display = 'none';
          document.getElementById('reg-success').style.display = 'block';
        } catch (err) {
          alert('Error: ' + err.message);
          btn.disabled = false;
          btn.innerText = 'Enviar Inscripción Oficial';
        }
      }
    </script>
  `;

  return renderLayout(content, { title: 'Inscripción Oficial', activeNav: 'inscribirse' });
}
