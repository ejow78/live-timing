export function renderAdminLoginPage(errorMsg?: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel Administrativo · Latam Simracing Alliance</title>
  <link rel="icon" type="image/png" href="/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Saira:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #060A13;
      color: #E8EEF7;
      font-family: "Saira", system-ui, sans-serif;
      padding: 16px;
    }
    .login-box {
      width: 100%;
      max-width: 420px;
      background: #0C1322;
      border: 1px solid #1D2940;
      padding: 36px 32px;
      border-radius: 6px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
    }
    .header-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 28px;
    }
    .header-logo img {
      height: 48px;
      width: auto;
      mix-blend-mode: lighten;
      object-fit: contain;
      margin-bottom: 16px;
    }
    h1 {
      font-family: "Chakra Petch", sans-serif;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin: 0 0 6px 0;
      color: #fff;
    }
    .subtitle {
      font-size: 13px;
      color: #8D9AB0;
      letter-spacing: .02em;
    }
    .form-group {
      margin-bottom: 18px;
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
    .btn-login {
      width: 100%;
      background: #111A2D;
      border: 1px solid #2A3A58;
      color: #fff;
      font-family: "Chakra Petch", sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
      padding: 12px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      transition: all .2s;
    }
    .btn-login:hover {
      background: #18253F;
      border-color: #23B6E0;
      color: #fff;
    }
    .error-alert {
      background: rgba(227, 38, 27, 0.12);
      border: 1px solid rgba(227, 38, 27, 0.35);
      color: #ff8c85;
      font-size: 13px;
      padding: 10px 14px;
      border-radius: 4px;
      margin-bottom: 20px;
      text-align: center;
    }
    .back-link {
      display: block;
      text-align: center;
      margin-top: 22px;
      font-size: 13px;
      color: #8D9AB0;
      text-decoration: none;
    }
    .back-link:hover {
      color: #E8EEF7;
    }
  </style>
</head>
<body>

  <div class="login-box">
    <div class="header-logo">
      <img
        src="https://latamsimracing.com/wp-content/uploads/2026/10/lsa-logo-horizontal.jpg"
        alt="Latam Simracing Alliance"
        onerror="this.src='/logo.png'"
      />
      <h1>Panel Administrativo</h1>
      <div class="subtitle">Acceso exclusivo para Staff y Comisarios</div>
    </div>

    ${errorMsg ? `<div class="error-alert">${errorMsg}</div>` : ''}

    <form method="POST" action="/api/admin/login">
      <div class="form-group">
        <label for="username">Usuario / Perfil Staff</label>
        <select id="username" name="username" required>
          <option value="javi">Javier Weimann</option>
          <option value="alonso">Alonso Cabezas</option>
          <option value="felipe">Felipe Olivares</option>
          <option value="tiojota">El Tío Jota</option>
          <option value="benjamin">Benjamín Braun</option>
        </select>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" required placeholder="••••••••••••" autofocus>
      </div>

      <button type="submit" class="btn-login">
        Ingresar al Panel
      </button>
    </form>

    <a href="/" class="back-link">← Volver al sitio público</a>
  </div>

</body>
</html>`;
}
