import {QueryResult} from "pg";
import {CarModelEntity} from "../models/entities.js";
import pool from "../config/db.js";
import {deleteEntityById, getEntityById, insertEntity, updateEntity} from "./base.js";
import { CarModelCreateDto, CarModelUpdateDto } from "../models/dtos.js";

export class CarModelService {
    static async getAll() {
        const result: QueryResult<CarModelEntity> = await pool.query("SELECT * FROM models");
        return result.rows;
    }

    static async getById(id: CarModelEntity['id']){
        return await getEntityById<CarModelEntity>("models", id);
    };

    static async create(newCarModel: CarModelCreateDto) {
        return await insertEntity<CarModelCreateDto, CarModelEntity>("models", newCarModel);
    };

    static async update (updatedCarModel: CarModelUpdateDto){
        return await updateEntity<CarModelUpdateDto, CarModelEntity>("models", updatedCarModel, "id");
    };

    static async deleteById(id: CarModelEntity['id']) {
        return await deleteEntityById<CarModelEntity>("models", id);
    };

}