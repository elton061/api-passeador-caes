import { Request, Response } from "express";
import { tutorRepositoryInstance } from "../Repositories/tutor.repository.js"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {
    private tutorRepository = tutorRepositoryInstance;

    async login(req: Request, res: Response) {
        const { username, userpass } = req.body;

        if (!username || !userpass) {
            res.status(401).json({error: "Usuário e/ou senha não informados"});
            return; 
        }

        const tutores = await this.tutorRepository.findALL();

        const tutorEncontrado = tutores.find(tutor => tutor.email === username && tutor.senha === userpass);

        if (!tutorEncontrado) {
            res.status(401).json({error: "Usuário e/ou senha inválidos"});
            return;
        }

        const token = jwt.sign(
            { "username": tutorEncontrado.email, "id": tutorEncontrado.id },
            String(process.env.JWT_SECRET),
            { expiresIn: "1h" }
        );

        res.status(200).json({
            "message": "Login realizado com sucesso!",
            "token": token
        });
    }
}