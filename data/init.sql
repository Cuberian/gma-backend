-- Создание таблицы brands
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Создание таблицы models
CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL
);

-- Создание таблицы cars
CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    model_id INTEGER NOT NULL REFERENCES models(id) ON DELETE CASCADE,
    color VARCHAR(30),
    engine_volume NUMERIC(4,1),
    mileage INTEGER,
    year INTEGER
);

-- Добавление брендов
INSERT INTO brands (id, name) VALUES
  (1, 'BMW'),
  (2, 'Audi'),
  (3, 'Mercedes-Benz'),
  (4, 'Toyota'),
  (5, 'Honda'),
  (6, 'Ford'),
  (7, 'Chevrolet'),
  (8, 'Nissan'),
  (9, 'Volkswagen'),
  (10, 'Hyundai'),
  (11, 'Kia'),
  (12, 'Tesla')
ON CONFLICT DO NOTHING;

-- Добавление моделей
INSERT INTO models (id, brand_id, name) VALUES
  (1, 1, 'X5'), (2, 1, 'X3'), (3, 1, 'M3'),
  (4, 2, 'A4'), (5, 2, 'Q5'), (6, 2, 'TT'),
  (7, 3, 'C-Class'), (8, 3, 'E-Class'), (9, 3, 'GLE'),
  (10, 4, 'Camry'), (11, 4, 'Corolla'), (12, 4, 'RAV4'),
  (13, 5, 'Civic'), (14, 5, 'Accord'), (15, 5, 'CR-V'),
  (16, 6, 'Focus'), (17, 6, 'Mustang'), (18, 6, 'Explorer'),
  (19, 7, 'Malibu'), (20, 7, 'Cruze'), (21, 7, 'Tahoe'),
  (22, 8, 'Altima'), (23, 8, 'Sentra'), (24, 8, 'Rogue'),
  (25, 9, 'Golf'), (26, 9, 'Passat'), (27, 9, 'Tiguan'),
  (28, 10, 'Elantra'), (29, 10, 'Sonata'), (30, 10, 'Tucson'),
  (31, 11, 'Rio'), (32, 11, 'Optima'), (33, 11, 'Sportage'),
  (34, 12, 'Model S'), (35, 12, 'Model 3'), (36, 12, 'Model X')
ON CONFLICT DO NOTHING;

-- Добавление случайных машин
DO $$
DECLARE
  i INT;
  brand_id INT;
  model_id INT;
  colors TEXT[] := ARRAY['#FF5733', '#33FF57', '#3357FF', '#000000', '#FFFFFF', '#FFD700', '#8B4513'];
BEGIN
  FOR i IN 1..1000 LOOP
    brand_id := (SELECT id FROM brands ORDER BY RANDOM() LIMIT 1);
    model_id := (SELECT id FROM models WHERE brand_id = brand_id ORDER BY RANDOM() LIMIT 1);

    INSERT INTO cars (brand_id, model_id, color, engine_volume, mileage, year)
    VALUES (
      brand_id,
      model_id,
      colors[ceil(random() * array_length(colors, 1))],
      round((random() * 3 + 1)::numeric, 1),
      (random() * 200000)::int,
      (2020 + (random() * 5)::int)
    );
  END LOOP;
END $$;