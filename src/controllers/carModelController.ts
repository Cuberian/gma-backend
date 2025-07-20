import { NextFunction, Request, Response } from "express";
import { CarModelCreateDto, CarModelUpdateDto } from "../models/dtos.js";
import { CarModelEntity } from "../models/entities.js";
import { CarModelService } from "../services/carModel.js";
import { handleResponse } from "./base.js";



export const createCarModel =
    async (
        req: Request<{}, {}, CarModelCreateDto>,
        res: Response<CarModelEntity>,
        next: NextFunction
    ) => {
        try {
            const newCarModel = await CarModelService.create(req.body)
            handleResponse(res, 201, "Новая модель машины успешно создана", newCarModel)
        }
        catch (err) {
            next(err)
        }
    }

export const getAllCarModels =
    async (
        _req: Request,
        res: Response<CarModelEntity[]>,
        next: NextFunction
    ) => {
        try {
            const carModels = await CarModelService.getAll()
            handleResponse(res, 200, "Модели машин успешно получены", carModels)
        }
        catch (err) {
            next(err)
        }
    }

export const getCarModelById =
    async (
        req: Request<{ id: CarModelEntity['id'] }>,
        res: Response<CarModelEntity>,
        next: NextFunction
    ) => {
        try {
            const carModel = await CarModelService.getById(req.params.id)
            if(!carModel) {
                return handleResponse(res, 404, "Модель машины не найдена")
            }
            handleResponse(res, 200, `Модель машины с ID ${ req.params.id } успешно получена`, carModel)
        }
        catch (err) {
            next(err)
        }
    }

export const updateCarModel =
    async (
        req: Request<{ id: CarModelEntity['id'] }, {}, CarModelUpdateDto>,
        res: Response<CarModelEntity>,
        next: NextFunction
    ) => {
        try {
            const carModel = await CarModelService.update(req.body)
            if(!carModel) {
                return handleResponse(res, 404, "Модель машины не найдена")
            }
            handleResponse(res, 200, `Модель машины с ID ${ req.params.id } успешно обновлена`, carModel)
        }
        catch (err) {
            next(err)
        }
    }

export const deleteCarModelById =
    async (
        req: Request<{ id: CarModelEntity['id'] }>,
        res: Response<CarModelEntity>,
        next: NextFunction
    ) => {
        try {
            const carModel = await CarModelService.deleteById(req.params.id)
            if(!carModel) {
                return handleResponse(res, 404, "Модель машины не найдена")
            }
            handleResponse(res, 200, `Модель машины с ID ${ req.params.id } успешно удалена`, carModel)
        }
        catch (err) {
            next(err)
        }
    }