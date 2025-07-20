import pool from "../config/db.js";
import {QueryResult} from "pg";
import {CarEntity} from "../models/entities.js";
import {CarCreateDto, CarUpdateDto} from "../models/dtos.js";
import {deleteEntityById, getEntityById, insertEntity, updateEntity} from "./base.js";
import {PaginationResponse} from "#types/index.js";

export class CarService {
    static allowedSortFields: (keyof CarEntity)[] = [
        "id",
        "brand_id",
        "model_id",
        "color",
        "engine_volume",
        "mileage",
        "year",
    ];

    static async getAll(
        offset: number = 0,
        limit?: number,
        sort?: keyof CarEntity,
        order: "ASC" | "DESC" = "ASC"): Promise<PaginationResponse<CarEntity>> {

        const sortField = CarService.allowedSortFields.includes(sort!) ? sort! : "id";
        const totalResult = await pool.query("SELECT COUNT(*) FROM cars");
        const total = parseInt(totalResult.rows[0].count, 10);
        limit ??= total;

        let sortExpression = `"cars"."${sortField}"`;

        if (sortField === "brand_id") {
            sortExpression = `"brands"."name"`;
        } else if (sortField === "model_id") {
            sortExpression = `"models"."name"`;
        }

        const query = `
            SELECT cars.*
            FROM cars
            LEFT JOIN brands ON brands.id = cars.brand_id
            LEFT JOIN models ON models.id = cars.model_id
            ORDER BY ${sortExpression} ${order}, cars.id  ASC
            LIMIT $1 OFFSET $2
            `;

        const result: QueryResult<CarEntity> = await pool.query(query, [limit, offset]);

        return {
            total,
            offset,
            limit,
            sort: sortField,
            order,
            items: result.rows
        };
    }

    static async getById(id: CarEntity['id']){
        return await getEntityById<CarEntity>("cars", id);
    };

    static async create(newCar: CarCreateDto) {
        return await insertEntity<CarCreateDto, CarEntity>("cars", newCar);
    };

    static async update(updatedCar: CarUpdateDto){
        return await updateEntity<CarUpdateDto, CarEntity>("cars", updatedCar, "id");
    };

    static async deleteById(id: CarEntity['id']) {
        return await deleteEntityById<CarEntity>("cars", id);
    };

}