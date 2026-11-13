import { LSA_STYLES_CSS } from '../styles.css.js';

export function renderAdminLoginPage(errorMsg?: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acceso Staff · Latam Simracing Alliance</title>
  <link rel="icon" type="image/png" href="/logo.png">
  <style>
    ${LSA_STYLES_CSS}
    body {
      display: grid;
      place-items: center;
      min-height: 100vh;
      background: radial-gradient(60% 70% at 50% 40%, rgba(227, 38, 27, .12), transparent 70%), var(--night);
    }
  </style>
</head>
<body>

  <div class="wrap" style="width: min(440px, 94vw);">
    <div style="text-align: center; margin-bottom: 24px;">
      <img src="/logo.png" alt="LSA" style="height: 48px; width: auto; mix-blend-mode: lighten; margin-bottom: 16px;">
      <h1 style="font-size: 28px; line-height: 1.1; margin-bottom: 6px;">
        Panel <em>Comisariato & Staff</em>
      </h1>
      <span style="font: 600 12px var(--display); letter-spacing: .2em; text-transform: uppercase; color: var(--mute);">
        Latam Simracing Alliance
      </span>
    </div>

    <div class="form-card cut" style="background: var(--deck2); border: 1px solid var(--wire);">
      ${errorMsg ? `
        <div style="padding: 10px 14px; background: rgba(227, 38, 27, .15); border: 1px solid rgba(227, 38, 27, .3); color: #ff6b61; font-size: 13px; border-radius: 4px; margin-bottom: 18px; font-weight: 500;">
          ${errorMsg}
        </div>
      ` : ''}

      <form method="POST" action="/api/admin/login">
        <div class="form-group">
          <label class="form-label">Usuario / Identificador</label>
          <input type="text" name="username" required placeholder="admin / staff" class="form-control" autofocus>
        </div>

        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label">Contraseña de Administrador</label>
          <input type="password" name="password" required placeholder="••••••••••••" class="form-control">
        </div>

        <button type="submit" class="pill red" style="width: 100%; justify-content: center; padding: 13px; font-size: 14px;">
          Iniciar Sesión
        </button>
      </form>
    </div>

    <div style="text-align: center; margin-top: 20px;">
      <a href="/" style="font-size: 13px; color: var(--mute); text-decoration: none;">
        ← Volver a la web pública
      </a>
    </div>
  </div>

</body>
</html>`;
}
