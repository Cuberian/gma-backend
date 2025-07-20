import express from "express";
import {
    createCarModel,
    deleteCarModelById,
    getAllCarModels,
    getCarModelById,
    updateCarModel
} from "../controllers/carModelController.js";

const carModelRouter = express.Router();

carModelRouter.get("/car-models", getAllCarModels)
carModelRouter.get("/cars-models/:id", getCarModelById)
carModelRouter.post("/car-models", createCarModel)
carModelRouter.put("/car-models/:id", updateCarModel)
carModelRouter.delete("/cars-models/:id", deleteCarModelById)

export default carModelRouter;