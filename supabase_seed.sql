-- ============================================================
-- LATAM SIMRACING ALLIANCE (LSA) - DATOS INICIALES (SEED DATA)
-- Ejecuta este script en Supabase SQL Editor después del schema
-- ============================================================

-- 1. Insertar Campeonatos
INSERT INTO championships (slug, name, game, season, status, description)
VALUES 
('gt3-2026', 'Campeonato GT3 2026', 'acc', 'Temporada 2026', 'active', 'Campeonato oficial de Assetto Corsa Competizione con grilla invertida, telemetría y comisarios deportivos.'),
('ginetta-gt4', 'Campeonato Ginetta GT4', 'ac', 'Temporada 2026', 'upcoming', 'Copa monomarca en Assetto Corsa con el ágil Ginetta G55 GT4.')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insertar Calendario GT3 2026
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

-- 3. Insertar Clasificación General / PRO (Top de pilotos reales extraídos de latamsimracing.com)
INSERT INTO standings (championship_slug, position, race_number, driver_name, car_name, category, points, wins, podiums, poles, round_scores)
VALUES
('gt3-2026', 1, 97, 'Felipe Espinoza', 'Aston Martin', 'PRO', 317, 6, 8, 4, '[73, 72, 69, 0, 73, 30]'),
('gt3-2026', 2, 24, 'Jose Miguel Fernández', 'Mercedes-AMG', 'PRO', 290, 4, 7, 3, '[50, 45, 60, 65, 35, 35]'),
('gt3-2026', 3, 101, 'Alonso Cabezas / Kdoosl', 'Mercedes-AMG', 'PRO', 263, 2, 6, 2, '[35, 40, 50, 68, 30, 40]'),
('gt3-2026', 4, 3, 'Benjamin Braun', 'Porsche', 'PRO', 235, 1, 5, 1, '[40, 30, 45, 50, 40, 30]'),
('gt3-2026', 5, 19, 'CAPITAN JAIRO', 'Lamborghini', 'Rookie', 69, 0, 0, 0, '[14, 11, 11, 5, 24, 4]');

-- 4. Insertar Campeonato de Marcas
INSERT INTO standings (championship_slug, position, race_number, driver_name, car_name, category, points, round_scores)
VALUES
('gt3-2026', 1, NULL, 'Mercedes-AMG', 'Mercedes-AMG GT3', 'Marca', 553, '[58, 99, 59, 113, 102, 122]'),
('gt3-2026', 2, NULL, 'Aston Martin', 'Aston Martin Vantage V8', 'Marca', 317, '[73, 72, 69, 0, 73, 30]'),
('gt3-2026', 3, NULL, 'Porsche', 'Porsche 992 GT3 R', 'Marca', 235, '[40, 30, 45, 50, 40, 30]');

-- 5. Insertar Noticias y Crónicas actuales
INSERT INTO posts (slug, title, category, summary, content_markdown, round_ref, author)
VALUES
('f06-brands-hatch', 'Jose Miguel Fernández gana las dos en Brands Hatch', 'Crónica', 'Dominio absoluto de Mercedes-AMG y Jose Miguel Fernández en el mítico trazado británico de Brands Hatch.', '### Doblete británico para Mercedes\n\nEn una jornada marcada por el ritmo implacable y adelantamientos milimétricos, **Jose Miguel Fernández** se llevó la victoria en ambas mangas en Brands Hatch, sumando puntos cruciales en la lucha por el título.', 'F06', 'Comisariato LSA'),
('f05-paul-ricard', 'Felipe y Jose ganan en Circuit Paul Ricard', 'Crónica', 'Reparto de victorias en suelo francés en una fecha repleta de estrategia con los neumáticos y gestión de combustible.', '### Emoción en Le Castellet\n\nFelipe Espinoza y Jose Miguel Fernández protagonizaron duelos rueda a rueda en las largas rectas de Paul Ricard, consolidándose en los puestos más altos de la tabla general.', 'F05', 'Comisariato LSA'),
('live-timing-lsa', 'Live Timing LSA Oficial en tiempo real', 'Novedad web', 'Sigue nuestras sesiones en tiempo real: pista, sesión en curso, telemetría y tiempos por sector con 0ms de retraso.', 'El nuevo sistema de Live Timing permite ver todos los autos en pista en vivo, sus mejores vueltas, sectores S1, S2, S3 y estado de conexión.', NULL, 'Equipo LSA')
ON CONFLICT (slug) DO NOTHING;

-- 6. Insertar Reglamentos Base
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
