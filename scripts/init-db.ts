import pool from "../src/config/db.js";

async function init() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS brands (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS models (
      id SERIAL PRIMARY KEY,
      brand_id INTEGER REFERENCES brands(id),
      name VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      brand_id INTEGER REFERENCES brands(id),
      model_id INTEGER REFERENCES models(id),
      color VARCHAR(30),
      engine_volume NUMERIC(4,1),
      mileage INTEGER,
      year INTEGER
    );
  `);

    const { rows } = await pool.query("SELECT COUNT(*) FROM brands");
    if (parseInt(rows[0].count) === 0) {
        console.log("Filling DB with seed data...");
        await pool.query(`
      INSERT INTO brands (name) VALUES 
      ('BMW'), ('Audi'), ('Mercedes-Benz'), ('Toyota'), ('Honda'), 
      ('Ford'), ('Chevrolet'), ('Nissan'), ('Volkswagen'), ('Hyundai'), 
      ('Kia'), ('Tesla');

      INSERT INTO models (brand_id, name) VALUES
      (1, 'X5'), (1, 'X3'), (1, 'M3'),
      (2, 'A4'), (2, 'Q5'), (2, 'TT'),
      (3, 'C-Class'), (3, 'E-Class'), (3, 'GLE'),
      (4, 'Camry'), (4, 'Corolla'), (4, 'RAV4'),
      (5, 'Civic'), (5, 'Accord'), (5, 'CR-V'),
      (6, 'Focus'), (6, 'Mustang'), (6, 'Explorer'),
      (7, 'Malibu'), (7, 'Cruze'), (7, 'Tahoe'),
      (8, 'Altima'), (8, 'Sentra'), (8, 'Rogue'),
      (9, 'Golf'), (9, 'Passat'), (9, 'Tiguan'),
      (10, 'Elantra'), (10, 'Sonata'), (10, 'Tucson'),
      (11, 'Rio'), (11, 'Optima'), (11, 'Sportage'),
      (12, 'Model S'), (12, 'Model 3'), (12, 'Model X');
    `);
    }

    console.log("DB initialized");
    process.exit();
}

init().catch((err) => {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
});