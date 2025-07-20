import {NextFunction, Request, Response} from "express";
import {CarCreateDto, CarUpdateDto} from "../models/dtos.js";
import {CarEntity} from "../models/entities.js";
import { CarService } from "../services/car.js";
import {handleResponse} from "./base.js";



export const createCar =
    async (
        req: Request<{}, {}, CarCreateDto>,
        res: Response<CarEntity>,
        next: NextFunction
    ) => {
        try {
            const newCar = await CarService.create(req.body)
            handleResponse(res, 201, "Новая машина создана", newCar)
        }
        catch (err) {
            next(err)
        }
    }

export const getAllCars =
    async (
        req: Request<{}, {}, {}, {
            offset?: number,
            limit?: number,
            sort?: keyof CarEntity,
            order?: "ASC" | "DESC"
        }>,
        res: Response<CarEntity[]>,
        next: NextFunction
    ) => {
        try {
            const { offset, limit, sort, order } = req.query
            const cars = await CarService.getAll(offset, limit, sort, order)
            handleResponse(res, 200, "Машины успешно запрошены", cars)
        }
        catch (err) {
            next(err)
        }
    }

export const getCarById =
    async (
        req: Request<{ id: CarEntity['id'] }>,
        res: Response<CarEntity>,
        next: NextFunction
    ) => {
        try {
            const car = await CarService.getById(req.params.id)
            if(!car) {
                return handleResponse(res, 404, "Машина не найдена")
            }
            handleResponse(res, 200, "Машины успешно найдена", car)
        }
        catch (err) {
            next(err)
        }
    }

export const updateCar =
    async (
        req: Request<{ id: CarEntity['id'] }, {}, CarUpdateDto>,
        res: Response<CarEntity>,
        next: NextFunction
    ) => {
        try {
            const car = await CarService.update(req.body)
            if(!car) {
                return handleResponse(res, 404, "Машина не найдена")
            }
            handleResponse(res, 200, "Машины успешно найдена", car)
        }
        catch (err) {
            next(err)
        }
    }

export const deleteCarById =
    async (
        req: Request<{ id: CarEntity['id'] }>,
        res: Response<CarEntity>,
        next: NextFunction
    ) => {
        try {
            const car = await CarService.deleteById(req.params.id)
            if(!car) {
                return handleResponse(res, 404, "Машина не найдена")
            }
            handleResponse(res, 200, "Машины успешно найдена", car)
        }
        catch (err) {
            next(err)
        }
    }