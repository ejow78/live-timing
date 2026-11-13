export function renderRegistrationPage(defaultChamp: string = 'ginetta-gt4'): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscripción Oficial · Assetto Corsa · Latam Simracing Alliance</title>
  <link rel="icon" type="image/png" href="/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Saira:wght@400;500;600&display=swap" rel="stylesheet">
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
    .header {
      background: #0C1322;
      border-bottom: 1px solid #1D2940;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 20px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-img {
      height: 40px;
      width: auto;
      mix-blend-mode: lighten;
      object-fit: contain;
    }
    .main-wrap {
      max-width: 680px;
      margin: 40px auto;
      padding: 0 20px;
      flex: 1;
      width: 100%;
    }
    .form-box {
      background: #0C1322;
      border: 1px solid #1D2940;
      border-radius: 6px;
      padding: 36px 32px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    h1 {
      font-family: "Chakra Petch", sans-serif;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      margin: 0 0 8px 0;
      color: #fff;
    }
    .desc {
      font-size: 14px;
      color: #8D9AB0;
      margin: 0 0 28px 0;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-family: "Chakra Petch", sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: #8D9AB0;
      margin-bottom: 8px;
    }
    input, select {
      width: 100%;
      background: #080D18;
      border: 1px solid #1D2940;
      color: #fff;
      font-family: "Saira", sans-serif;
      font-size: 14px;
      padding: 11px 14px;
      border-radius: 4px;
      outline: none;
      transition: border-color .2s;
    }
    input:focus, select:focus {
      border-color: #23B6E0;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .grid-car {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
    }
    .btn-submit {
      width: 100%;
      background: #18253F;
      border: 1px solid #23B6E0;
      color: #fff;
      font-family: "Chakra Petch", sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      padding: 13px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
      transition: all .2s;
    }
    .btn-submit:hover {
      background: #23B6E0;
      color: #060A13;
    }
    .footer {
      border-top: 1px solid #1D2940;
      padding: 24px 20px;
      text-align: center;
      font-size: 13px;
      color: #8D9AB0;
      margin-top: auto;
    }
    @media (max-width: 600px) {
      .grid-2, .grid-car { grid-template-columns: 1fr; }
      .form-box { padding: 24px 18px; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="header-inner">
      <a href="/">
        <img
          src="https://latamsimracing.com/wp-content/uploads/2026/10/lsa-logo-horizontal.jpg"
          alt="Latam Simracing Alliance"
          class="logo-img"
          onerror="this.src='/logo.png'"
        />
      </a>
      <a href="/" style="font-size:13px;color:#8D9AB0;">← Volver al Live Timing</a>
    </div>
  </header>

  <!-- CONTENIDO -->
  <main class="main-wrap">
    <div class="form-box">
      <h1>Inscripción Oficial · Assetto Corsa</h1>
      <div class="desc">
        Completa el formulario para participar en los torneos y copas monomarca de Assetto Corsa. Los comisarios revisarán tu solicitud para agregarte a la Entry List del servidor.
      </div>

      <form id="reg-form" onsubmit="submitRegistration(event)">
        <div class="form-group">
          <label for="reg-name">Nombre y Apellido del Piloto *</label>
          <input type="text" id="reg-name" required placeholder="Ej: Felipe Olivares">
        </div>

        <div class="form-group">
          <label for="reg-discord">Usuario o Tag de Discord *</label>
          <input type="text" id="reg-discord" required placeholder="Ej: usuario#1234 o @usuario">
          <span style="font-size:12px;color:#8D9AB0;margin-top:4px;display:block;">Es obligatorio para recibir avisos de carreras y reuniones de pilotos.</span>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label for="reg-champ">Torneo / Campeonato *</label>
            <select id="reg-champ" onchange="updateCars(this.value)">
              <option value="ginetta-gt4" ${defaultChamp === 'ginetta-gt4' ? 'selected' : ''}>Copa Ginetta G55 GT4 (Assetto Corsa)</option>
              <option value="ac-ligas" ${defaultChamp === 'ac-ligas' ? 'selected' : ''}>Ligas Assetto Corsa (Multiclase)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="reg-category">Categoría *</label>
            <select id="reg-category">
              <option value="Rookie" selected>Rookie (Iniciación / Debutantes)</option>
              <option value="PRO">PRO (Pilotos experimentados)</option>
            </select>
          </div>
        </div>

        <div class="grid-car">
          <div class="form-group">
            <label for="reg-car">Auto Elegido *</label>
            <select id="reg-car">
              <option value="Ginetta G55 GT4">Ginetta G55 GT4 (Monomarca)</option>
              <option value="Porsche Cayman GT4 Clubsport">Porsche Cayman GT4 Clubsport</option>
              <option value="BMW M235i Racing">BMW M235i Racing</option>
              <option value="Mazda MX-5 Cup">Mazda MX-5 Cup</option>
            </select>
          </div>

          <div class="form-group">
            <label for="reg-number">Dorsal (1-999) *</label>
            <input type="number" id="reg-number" min="1" max="999" required placeholder="Ej: 78">
          </div>
        </div>

        <div class="form-group">
          <label for="reg-steam">Steam GUID (opcional pero recomendado)</label>
          <input type="text" id="reg-steam" placeholder="76561198...">
          <span style="font-size:12px;color:#8D9AB0;margin-top:4px;display:block;">Nos permite agregarte automáticamente a la Entry List de Emperor Server.</span>
        </div>

        <div style="margin:20px 0;">
          <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;font-size:13px;color:#8D9AB0;">
            <input type="checkbox" required style="width:auto;margin-top:3px;accent-color:#23B6E0;">
            <span>Acepto el Código de Conducta y Reglamento Deportivo de Latam Simracing Alliance.</span>
          </label>
        </div>

        <button type="submit" id="btn-submit" class="btn-submit">
          Enviar Inscripción
        </button>
      </form>

      <div id="reg-success" style="display:none;text-align:center;padding:24px 0;">
        <div style="font-size:42px;margin-bottom:12px;">🏁</div>
        <h2 style="font-family:'Chakra Petch',sans-serif;font-size:22px;color:#fff;margin:0 0 8px 0;">¡Inscripción Enviada con Éxito!</h2>
        <p style="color:#8D9AB0;font-size:14px;margin:0 0 20px 0;">
          Los comisarios revisarán tus datos en el Panel Administrativo para confirmar tu dorsal y cupo en el servidor.
        </p>
        <a href="https://discord.gg/V9hq2EBSA" target="_blank" style="display:inline-block;padding:10px 20px;background:#18253F;border:1px solid #23B6E0;color:#fff;font-family:'Chakra Petch',sans-serif;font-size:13px;border-radius:4px;">
          Unirse al Discord Oficial LSA
        </a>
      </div>
    </div>
  </main>

  <footer class="footer">
    © 2026 Latam Simracing Alliance · Todos los derechos reservados
  </footer>

  <script>
    function updateCars(champ) {
      const select = document.getElementById('reg-car');
      if (champ === 'ginetta-gt4') {
        select.innerHTML = '<option value="Ginetta G55 GT4">Ginetta G55 GT4 (Monomarca)</option>';
      } else {
        select.innerHTML = \`
          <option value="Ginetta G55 GT4">Ginetta G55 GT4</option>
          <option value="Porsche Cayman GT4 Clubsport">Porsche Cayman GT4 Clubsport</option>
          <option value="BMW M235i Racing">BMW M235i Racing</option>
          <option value="Mazda MX-5 Cup">Mazda MX-5 Cup</option>
        \`;
      }
    }

    async function submitRegistration(e) {
      e.preventDefault();
      const btn = document.getElementById('btn-submit');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

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
        btn.textContent = 'Enviar Inscripción';
      }
    }
  </script>
</body>
</html>`;
}
