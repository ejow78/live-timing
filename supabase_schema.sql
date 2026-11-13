-- ============================================================
-- LATAM SIMRACING ALLIANCE (LSA) - SUPABASE INITIAL SCHEMA
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase
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
    country_code TEXT NOT NULL, -- ej: 'US', 'JP', 'ES', 'FR', 'GB', 'DE', 'BE'
    format_desc TEXT NOT NULL,  -- ej: 'Doble Sprint', 'Sprint + Mini Endurance'
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
    round_scores JSONB DEFAULT '[]'::jsonb, -- desglose por fecha [73, 72, 69, ...]
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESULTADOS DE CARRERAS Y TELEMETRÍA POR FECHA
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    championship_slug TEXT REFERENCES championships(slug) ON DELETE CASCADE,
    round_number INT NOT NULL,
    race_name TEXT NOT NULL, -- ej: 'Carrera 1', 'Carrera 2', 'Clasificación'
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
    category TEXT NOT NULL DEFAULT 'Noticia', -- 'Noticia', 'Crónica', 'Novedad web'
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
    section_code TEXT NOT NULL, -- 'deportivo', 'tecnico', 'sanciones', 'superlicencia'
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

-- ============================================================
-- HABILITAR LECTURA PÚBLICA (Row Level Security para anon)
-- ============================================================
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_users ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública:
CREATE POLICY "Public Read Championships" ON championships FOR SELECT USING (true);
CREATE POLICY "Public Read Rounds" ON rounds FOR SELECT USING (true);
CREATE POLICY "Public Read Standings" ON standings FOR SELECT USING (true);
CREATE POLICY "Public Read Results" ON results FOR SELECT USING (true);
CREATE POLICY "Public Read Posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Public Read Regulations" ON regulations FOR SELECT USING (true);

-- Política de inscripción pública (cualquier piloto puede enviar formulario):
CREATE POLICY "Public Insert Registrations" ON registrations FOR INSERT WITH CHECK (true);

-- Los administradores (service_role) tienen acceso total para insertar/actualizar/borrar automáticamente.
