import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config()

export class AuthMiddleware {
    public loginWithJWT(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({error: "Autenticação inválida!"});
            return;
        }

        const [authType, authValue] = authHeader.split(' ');

        if (authType != "Bearer" || !authValue) {
            res.status(401).json({error: "Autenticação inválida!"});
            return; 
        }

        try {
            jwt.verify(authValue, String(process.env.JWT_SECRET));
        }catch (error){
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({error: "Token expirado!"});
            } else {
                res.status(401).json({error: "Token inválido!"});
            }

            return;
        }
        

        next();
    }
}