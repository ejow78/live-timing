-- ============================================================
-- LATAM SIMRACING ALLIANCE (LSA) - SETUP COMPLETO (TABLAS Y DATOS)
-- ============================================================
-- 1. Ve a tu panel de Supabase: https://supabase.com/dashboard/project/znkjcmjbaiapokwrlnsq/sql
-- 2. Pega todo este contenido en una nueva consulta SQL y dale a "RUN".
-- ============================================================

-- 1. CAMPEONATOS
CREATE TABLE IF NOT EXISTS championships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    game TEXT NOT NULL CHECK (game IN ('acc', 'ac')),
    season TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'completed')),
    banner_url TEXT,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FECHAS / CALENDARIO DE CAMPEONATOS
CREATE TABLE IF NOT EXISTS rounds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    round_number INT NOT NULL,
    track_name TEXT NOT NULL,
    country_code TEXT NOT NULL,
    format_desc TEXT NOT NULL,
    event_date DATE,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('completed', 'next', 'upcoming')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(championship_slug, round_number)
);

-- 3. CLASIFICACIÓN GENERAL Y POR CATEGORÍAS (PILOTOS Y MARCAS)
CREATE TABLE IF NOT EXISTS standings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    position INT NOT NULL,
    race_number INT,
    driver_name TEXT NOT NULL,
    car_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('PRO', 'Rookie', 'General', 'Marca')),
    points INT NOT NULL DEFAULT 0,
    wins INT DEFAULT 0,
    podiums INT DEFAULT 0,
    poles INT DEFAULT 0,
    round_scores JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESULTADOS DE CARRERAS Y TELEMETRÍA POR FECHA
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    round_number INT NOT NULL,
    race_name TEXT NOT NULL,
    position INT NOT NULL,
    race_number INT,
    driver_name TEXT NOT NULL,
    car_name TEXT NOT NULL,
    category TEXT,
    grid_pos INT,
    best_lap TEXT,
    best_lap_ms INT,
    s1 TEXT,
    s2 TEXT,
    s3 TEXT,
    is_vr BOOLEAN DEFAULT FALSE,
    is_pole BOOLEAN DEFAULT FALSE,
    penalty TEXT,
    points INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INSCRIPCIONES DE PILOTOS (Reemplazo de Google Forms)
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    driver_name TEXT NOT NULL,
    steam_id TEXT,
    discord_tag TEXT NOT NULL,
    car_choice TEXT NOT NULL,
    race_number INT NOT NULL,
    team_name TEXT,
    category TEXT DEFAULT 'Rookie' CHECK (category IN ('PRO', 'Rookie')),
    country TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. NOTICIAS Y CRÓNICAS DE CARRERAS
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Noticia',
    round_ref TEXT,
    summary TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    image_url TEXT,
    author TEXT DEFAULT 'Staff LSA',
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REGLAMENTOS
CREATE TABLE IF NOT EXISTS regulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    section_code TEXT NOT NULL,
    title TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PERFILES DE STAFF / ADMINS
CREATE TABLE IF NOT EXISTS staff_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'steward', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HABILITAR SEGURIDAD (ROW LEVEL SECURITY)
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública:
DROP POLICY IF EXISTS "Public Read Championships" ON championships;
CREATE POLICY "Public Read Championships" ON championships FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Rounds" ON rounds;
CREATE POLICY "Public Read Rounds" ON rounds FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Standings" ON standings;
CREATE POLICY "Public Read Standings" ON standings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Results" ON results;
CREATE POLICY "Public Read Results" ON results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Posts" ON posts;
CREATE POLICY "Public Read Posts" ON posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Regulations" ON regulations;
CREATE POLICY "Public Read Regulations" ON regulations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Registrations" ON registrations;
CREATE POLICY "Public Insert Registrations" ON registrations FOR INSERT WITH CHECK (true);

-- Permisos de escritura para Service Role / Admin:
DROP POLICY IF EXISTS "Admin Full Access Championships" ON championships;
CREATE POLICY "Admin Full Access Championships" ON championships FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Rounds" ON rounds;
CREATE POLICY "Admin Full Access Rounds" ON rounds FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Standings" ON standings;
CREATE POLICY "Admin Full Access Standings" ON standings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Results" ON results;
CREATE POLICY "Admin Full Access Results" ON results FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Registrations" ON registrations;
CREATE POLICY "Admin Full Access Registrations" ON registrations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Posts" ON posts;
CREATE POLICY "Admin Full Access Posts" ON posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Regulations" ON regulations;
CREATE POLICY "Admin Full Access Regulations" ON regulations FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- POBLAR DATOS REALES EXTRAÍDOS DE LATAMSIMRACING.COM
-- ============================================================

-- Campeonatos
INSERT INTO championships (slug, name, game, season, status, description)
VALUES 
('gt3-2026', 'Campeonato GT3 2026', 'acc', 'Temporada 2026', 'active', 'Campeonato oficial de Assetto Corsa Competizione con grilla invertida, telemetría y comisarios deportivos.'),
('ginetta-gt4', 'Campeonato Ginetta GT4', 'ac', 'Temporada 2026', 'upcoming', 'Copa monomarca en Assetto Corsa con el ágil Ginetta G55 GT4.')
ON CONFLICT (slug) DO NOTHING;

-- Calendario GT3 2026
INSERT INTO rounds (championship_slug, round_number, track_name, country_code, format_desc, status)
VALUES
('gt3-2026', 1, 'Indianapolis Motor Speedway', 'US', 'Doble Sprint', 'completed'),
('gt3-2026', 2, 'Circuit of the Americas (COTA)', 'US', 'Doble Sprint · Grilla invertida', 'completed'),
('gt3-2026', 3, 'Suzuka International Circuit', 'JP', 'Sprint + Mini Endurance', 'completed'),
('gt3-2026', 4, 'Valencia Ricardo Tormo', 'ES', 'Doble Sprint', 'completed'),
('gt3-2026', 5, 'Circuit Paul Ricard', 'FR', 'Doble Sprint · Grilla invertida', 'completed'),
('gt3-2026', 6, 'Brands Hatch Circuit', 'GB', 'Doble Sprint', 'completed'),
('gt3-2026', 7, 'Nürburgring GP', 'DE', 'Sprint + Mini Endurance', 'next'),
('gt3-2026', 8, 'Spa-Francorchamps', 'BE', 'Endurance Pro 60 min · Gran final', 'upcoming')
ON CONFLICT (championship_slug, round_number) DO NOTHING;

-- Clasificación de Pilotos GT3
INSERT INTO standings (championship_slug, position, race_number, driver_name, car_name, category, points, wins, podiums, poles, round_scores)
VALUES
('gt3-2026', 1, 97, 'Felipe Espinoza', 'Aston Martin', 'PRO', 317, 6, 8, 4, '[73, 72, 69, 0, 73, 30]'),
('gt3-2026', 2, 24, 'Jose Miguel Fernández', 'Mercedes-AMG', 'PRO', 290, 4, 7, 3, '[50, 45, 60, 65, 35, 35]'),
('gt3-2026', 3, 101, 'Alonso Cabezas / Kdoosl', 'Mercedes-AMG', 'PRO', 263, 2, 6, 2, '[35, 40, 50, 68, 30, 40]'),
('gt3-2026', 4, 3, 'Benjamin Braun', 'Porsche', 'PRO', 235, 1, 5, 1, '[40, 30, 45, 50, 40, 30]'),
('gt3-2026', 5, 19, 'CAPITAN JAIRO', 'Lamborghini', 'Rookie', 69, 0, 0, 0, '[14, 11, 11, 5, 24, 4]');

-- Campeonato de Marcas
INSERT INTO standings (championship_slug, position, race_number, driver_name, car_name, category, points, round_scores)
VALUES
('gt3-2026', 1, NULL, 'Mercedes-AMG', 'Mercedes-AMG GT3', 'Marca', 553, '[58, 99, 59, 113, 102, 122]'),
('gt3-2026', 2, NULL, 'Aston Martin', 'Aston Martin Vantage V8', 'Marca', 317, '[73, 72, 69, 0, 73, 30]'),
('gt3-2026', 3, NULL, 'Porsche', 'Porsche 992 GT3 R', 'Marca', 235, '[40, 30, 45, 50, 40, 30]');

-- Noticias actuales
INSERT INTO posts (slug, title, category, summary, content_markdown, round_ref, author)
VALUES
('f06-brands-hatch', 'Jose Miguel Fernández gana las dos en Brands Hatch', 'Crónica', 'Dominio absoluto de Mercedes-AMG y Jose Miguel Fernández en el mítico trazado británico de Brands Hatch.', '### Doblete británico para Mercedes\n\nEn una jornada marcada por el ritmo implacable y adelantamientos milimétricos, **Jose Miguel Fernández** se llevó la victoria en ambas mangas en Brands Hatch, sumando puntos cruciales en la lucha por el título.', 'F06', 'Comisariato LSA'),
('f05-paul-ricard', 'Felipe y Jose ganan en Circuit Paul Ricard', 'Crónica', 'Reparto de victorias en suelo francés en una fecha repleta de estrategia con los neumáticos y gestión de combustible.', '### Emoción en Le Castellet\n\nFelipe Espinoza y Jose Miguel Fernández protagonizaron duelos rueda a rueda en las largas rectas de Paul Ricard, consolidándose en los puestos más altos de la tabla general.', 'F05', 'Comisariato LSA'),
('live-timing-lsa', 'Live Timing LSA Oficial en tiempo real', 'Novedad web', 'Sigue nuestras sesiones en tiempo real: pista, sesión en curso, telemetría y tiempos por sector con 0ms de retraso.', 'El nuevo sistema de Live Timing permite ver todos los autos en pista en vivo, sus mejores vueltas, sectores S1, S2, S3 y estado de conexión.', NULL, 'Equipo LSA')
ON CONFLICT (slug) DO NOTHING;

-- Reglamentos
INSERT INTO regulations (championship_slug, section_code, title, content_markdown)
VALUES
('gt3-2026', 'deportivo', 'Reglamento Deportivo GT3 2026', '## 1. Formato de Carreras
- **Doble Sprint:** 2 carreras de 25 minutos con clasificación previa.
- **Sprint + Mini Endurance:** 1 carrera de 20 min + 1 carrera de 40 min con parada obligatoria para cambio de neumáticos.
- **Endurance Pro:** Carrera de 60 minutos con parada obligatoria de boxes.'),
('gt3-2026', 'puntos', 'Sistema de Puntuación', '## Sistema de Puntos Oficial
- 1º Lugar: 35 puntos
- 2º Lugar: 30 puntos
- 3º Lugar: 26 puntos
- 4º Lugar: 23 puntos
- 5º Lugar: 20 puntos
- 6º Lugar: 17 puntos
- 7º Lugar: 14 puntos
- 8º Lugar: 12 puntos
- 9º Lugar: 10 puntos
- 10º Lugar: 8 puntos
- **Vuelta Rápida (VR):** +2 puntos adicionales
- **Pole Position:** +2 puntos adicionales'),
('gt3-2026', 'sanciones', 'Código de Sanciones y Superlicencia', '## Superlicencia y Comisarios
Cada piloto inicia con 12 puntos en su Superlicencia. Los incidentes evaluados por los comisarios conllevan deducción de puntos y recargos de tiempo en los resultados oficiales.');
