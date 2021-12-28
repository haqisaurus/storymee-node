import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    let authorization: any = req.headers["authorization"];
    let token = authorization.split(" ");
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    const jwtSecret: any = process.env.JWT_SECRET;

    jwt.verify(token[1], jwtSecret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.app.set("userID", decoded.userID);
        next();
    });
};
