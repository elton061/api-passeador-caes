import { Request, Response } from "express";
import { PrestadorRepository } from "../Repositories/prestador.repository.js";
import { createPrestadorSchema, updatePrestadorSchema, Prestador } from "../models/prestador.models.js";
import { z } from "zod";

export class PrestadorController {

    private prestadorRepository = new PrestadorRepository();
    
    // metodo get do PrestadorController
    async getALL(req: Request, res: Response) {
        const prestadores = await this.prestadorRepository.findALL();
        // retorna OK e lista os prestadores
        res.status(200).json(prestadores);
    }

    async getByUuid(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const prestador = await this.prestadorRepository.findByUuid(uuid);

            if (!prestador) {
                res.status(404).json({ message: "Prestador nao encontrado" });
                return;
            }
            res.status(200).json(prestador);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Cria um novo prestador
    async create(req: Request, res: Response) {
        try {
            const validatedData = createPrestadorSchema.parse(req.body);
            
            // instancia o novo prestador apos pegar os parametros de req.body validados pelo zod
            const newPrestador = new Prestador(validatedData);
            const savedPrestador = await this.prestadorRepository.create(newPrestador);

            res.status(201).json(savedPrestador);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
    
    // metodo update de prestador
    async update(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const validatedData = updatePrestadorSchema.parse(req.body) as Partial<Prestador>;

            const updatePrestador = await this.prestadorRepository.update(uuid, validatedData);
            if (!updatePrestador) {
                res.status(404).json({ message: "Prestador nao encontrado" });
                return;
            }
            res.status(200).json(updatePrestador);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const success = await this.prestadorRepository.delete(uuid);
            if (!success) {
                res.status(404).json({ message: "Prestador nao encontrado" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}