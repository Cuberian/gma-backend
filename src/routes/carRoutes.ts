import express from "express";
import {createCar, deleteCarById, getAllCars, getCarById, updateCar} from "../controllers/carController.js";

const carRouter = express.Router();

carRouter.get("/cars", getAllCars)
carRouter.get("/cars/:id", getCarById)
carRouter.post("/cars", createCar)
carRouter.patch("/cars/:id", updateCar)
carRouter.delete("/cars/:id", deleteCarById)

export default carRouter;