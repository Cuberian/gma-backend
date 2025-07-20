import express from "express";
import pool from "../config/db.js";

const baseRouter = express.Router();

baseRouter.get("/healthcheck", async (req, res) => {
    try {
        // Выполняем простой запрос к базе данных
        await pool.query("SELECT 1");

        res.json({
            status: "OK",
            dbConnection: "connected",
        });
    } catch (err) {
        const error = err as Error;

        console.error("Ошибка подключения к базе данных:", error);
        res.status(500).json({
            status: "ERROR",
            dbConnection: "disconnected",
            error: error.message,
        });
    }
});

export default baseRouter;