import {ErrorRequestHandler} from "express";

const errorHandler: ErrorRequestHandler =
    (err,
     _req,
     res,
     _next) => {
    console.log(err.stack)
    res.status(500).json({
        status: 500,
        message: "Что-то пошло не так :(",
        error: err.message
    })
}

export default errorHandler;