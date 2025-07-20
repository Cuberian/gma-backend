import pool from "../config/db.js";
import {QueryResult} from "pg";

export const getEntityById =
    async <T extends Record<string, any>>(tableName: string, id: number) => {
        const query = `SELECT * FROM ${tableName} WHERE id = $1 LIMIT 1`
        const result: QueryResult<T> = await pool.query(query, [id]);
        return result.rows[0];
};

export const deleteEntityById =
    async <T extends Record<string, any>>(tableName: string, id: number) => {
        const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`
        const result: QueryResult<T> = await pool.query(query, [id]);
        return result.rows[0];
    };

export const insertEntity =
    async <T extends Record<string, any>,
        U extends Record<string, any> = Record<string, any>>(
    tableName: string,
    entity: T
): Promise<U> => {
    const fields: string[] = [];
    const values: any[] = [];
    const placeholders: string[] = [];

    let i = 1;
    for (const [key, value] of Object.entries(entity)) {
        fields.push(key);
        values.push(value);
        placeholders.push(`$${i++}`);
    }

    const query = `
    INSERT INTO ${tableName} (${fields.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *
  `;

    const result = await pool.query(query, values);
    return result.rows[0];
};

export const updateEntity =
    async <T extends Record<string, any>,
        U extends Record<string, any> = Record<string, any>>(
    tableName: string,
    entity: T,
    idField: keyof T
): Promise<U> => {
    const values: any[] = [];
    const updates: string[] = [];

    let i = 1;

    for (const [key, value] of Object.entries(entity)) {
        if (key === idField) continue;

        values.push(value);
        updates.push(`${key} = $${i++}`);
    }

    values.push(entity[idField]);
    const whereClause = `${String(idField)} = $${i}`;

    const query = `
    UPDATE ${tableName}
    SET ${updates.join(", ")}
    WHERE ${whereClause}
    RETURNING *
  `;

    const result = await pool.query(query, values);
    return result.rows[0];
};


