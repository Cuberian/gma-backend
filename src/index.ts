import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import carRouter from "./routes/carRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import baseRouter from "./routes/baseRoutes.js";
import carModelRouter from "./routes/carModelRoutes.js";
import carBrandRouter from "./routes/carBrandRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", carRouter)
app.use("/api", carModelRouter)
app.use("/api", carBrandRouter)
app.use("/api", baseRouter)


// Error Handling middleware
app.use(errorHandler)

// Server running
app.listen(port, () =>
    console.log(`Listening on port ${port}`)
);