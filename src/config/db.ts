import pkg from "pg"
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
    console.log("Connected to DB");
});

export default pool;