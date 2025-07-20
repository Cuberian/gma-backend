import express from "express";
import {
    createCarBrand,
    deleteCarBrandById,
    getAllCarBrands,
    getCarBrandById,
    updateCarBrand
} from "../controllers/carBrandController.js";

const carBrandRouter = express.Router();

carBrandRouter.get("/car-brands", getAllCarBrands)
carBrandRouter.get("/car-brands/:id", getCarBrandById)
carBrandRouter.post("/car-brands", createCarBrand)
carBrandRouter.put("/car-brands/:id", updateCarBrand)
carBrandRouter.delete("/car-brands/:id", deleteCarBrandById)

export default carBrandRouter;