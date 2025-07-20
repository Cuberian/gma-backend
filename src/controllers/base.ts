import {Response} from "express";

export const handleResponse =
    <T>(res: Response, status: number, message: string, data: T | null = null) => {
        res.status(status).send({
            status,
            message,
            data
        })
    }