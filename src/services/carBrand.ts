import {QueryResult} from "pg";
import {CarBrandEntity} from "../models/entities.js";
import pool from "../config/db.js";
import {deleteEntityById, getEntityById, insertEntity, updateEntity} from "./base.js";
import { CarBrandCreateDto, CarBrandUpdateDto } from "../models/dtos.js";

export class CarBrandService {
    static async getAll() {
        const result: QueryResult<CarBrandEntity> = await pool.query("SELECT * FROM brands");
        return result.rows;
    }

    static async getById(id: CarBrandEntity['id']){
        return await getEntityById<CarBrandEntity>("brands", id);
    };

    static async create(newCarBrand: CarBrandCreateDto) {
        return await insertEntity<CarBrandCreateDto, CarBrandEntity>("brands", newCarBrand);
    };

    static async update (updatedCarBrand: CarBrandUpdateDto){
        return await updateEntity<CarBrandUpdateDto, CarBrandEntity>("brands", updatedCarBrand, "id");
    };

    static async deleteById(id: CarBrandEntity['id']) {
        return await deleteEntityById<CarBrandEntity>("brands", id);
    };

}