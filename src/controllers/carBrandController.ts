import {NextFunction, Request, Response} from "express";
import {CarBrandCreateDto, CarBrandUpdateDto} from "../models/dtos.js";
import {CarBrandEntity} from "../models/entities.js";
import { CarBrandService } from "../services/carBrand.js";
import {handleResponse} from "./base.js";



export const createCarBrand =
    async (
        req: Request<{}, {}, CarBrandCreateDto>,
        res: Response<CarBrandEntity>,
        next: NextFunction
    ) => {
        try {
            const newCarBrand = await CarBrandService.create(req.body)
            handleResponse(res, 201, "Новый бренд машины успешно создан", newCarBrand)
        }
        catch (err) {
            next(err)
        }
    }

export const getAllCarBrands =
    async (_req: Request, res: Response<CarBrandEntity[]>, next: NextFunction) => {
        try {
            const carBrands = await CarBrandService.getAll()
            handleResponse(res, 200, "Бренды машин успешно получены", carBrands)
        }
        catch (err) {
            next(err)
        }
    }

export const getCarBrandById =
    async (
        req: Request<{ id: CarBrandEntity['id'] }>,
        res: Response<CarBrandEntity>,
        next: NextFunction
    ) => {
        try {
            const carBrand = await CarBrandService.getById(req.params.id)
            if(!carBrand) {
                return handleResponse(res, 404, "Бренд машины не найден")
            }
            handleResponse(res, 200, `Бренд машины с ID ${ req.params.id } успешно получен`, carBrand)
        }
        catch (err) {
            next(err)
        }
    }

export const updateCarBrand =
    async (
        req: Request<{ id: CarBrandEntity['id'] }, {}, CarBrandUpdateDto>,
        res: Response<CarBrandEntity>,
        next: NextFunction
    ) => {
        try {
            const carBrand = await CarBrandService.update(req.body)
            if(!carBrand) {
                return handleResponse(res, 404, "Бренд машины не найден")
            }
            handleResponse(res, 200, `Бренд машины с ID ${ req.params.id } успешно обновлен`, carBrand)
        }
        catch (err) {
            next(err)
        }
    }

export const deleteCarBrandById =
    async (
        req: Request<{ id: CarBrandEntity['id'] }>,
        res: Response<CarBrandEntity>,
        next: NextFunction
    ) => {
        try {
            const carBrand = await CarBrandService.deleteById(req.params.id)
            if(!carBrand) {
                return handleResponse(res, 404, "Бренд машины не найден")
            }
            handleResponse(res, 200, `Бренд машины с ID ${ req.params.id } успешно удален`, carBrand)
        }
        catch (err) {
            next(err)
        }
    }