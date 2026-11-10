import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  EMPEROR_IP_OR_DOMAIN: z.string().min(1).default('24.152.39.252'),
  EMPEROR_HTTP_PORT: z.coerce.number().int().positive().default(8520),
  AC_JOIN_HTTP_PORT: z.coerce.number().int().positive().optional(),
  AC_JOIN_URL: z.string().url().optional(),
  AC_SERVER_PASSWORD: z.string().optional().default('LaTaM2026'),
  EMPEROR_WEB_URL: z
    .string()
    .url()
    .optional()
    .default('https://br.assettohosting.com:10520'),
  LIVE_TIMING_WEB_URL: z
    .string()
    .url()
    .optional()
    .default('https://live.latamsimracing.com'),
  WEB_PORT: z.coerce.number().int().positive().default(3000),
  ADMIN_PASSWORD: z.string().min(1).default('LaTaM2026'),
  MOCK_MODE: z
    .string()
    .optional()
    .default('false')
    .transform((val) => val.toLowerCase() === 'true' || val === '1'),
  // Variables opcionales (no obligatorias para el funcionamiento de Live Timing)
  DISCORD_TOKEN: z.string().optional(),
  CLIENT_ID: z.string().optional(),
  GUILD_ID: z.string().optional(),
  STATUS_CHANNEL_ID: z.string().optional(),
  ALERT_CHANNEL_ID: z.string().optional(),
  ALERT_ROLE_ID: z.string().optional(),
  MOD_ROLE_ID: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Error en las variables de entorno (.env):');
  for (const issue of parsedEnv.error.issues) {
    console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = {
  ...parsedEnv.data,
  /** Puerto HTTP usado para el link de entrada en Content Manager */
  get joinHttpPort(): number {
    return parsedEnv.data.AC_JOIN_HTTP_PORT ?? parsedEnv.data.EMPEROR_HTTP_PORT;
  },
  /** URL base HTTP para consultas REST a Emperor */
  get emperorHttpBaseUrl(): string {
    return `http://${parsedEnv.data.EMPEROR_IP_OR_DOMAIN}:${parsedEnv.data.EMPEROR_HTTP_PORT}`;
  },
  /** URL base WebSocket para telemetría en tiempo real */
  get emperorWsUrl(): string {
    return `ws://${parsedEnv.data.EMPEROR_IP_OR_DOMAIN}:${parsedEnv.data.EMPEROR_HTTP_PORT}/live-telemetry`;
  },
};
