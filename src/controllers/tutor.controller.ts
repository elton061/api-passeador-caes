import { Request, Response } from "express";
import { TutorRepository } from "../Repositories/tutor.repository.js";
import { createTutorSchema, updateTutorSchema, Tutor } from "../models/tutor.models.js";
import { z } from "zod";

export class TutorController {

    private tutorRepository = new TutorRepository();
    // metodo get do TutorController
    async getALL(req: Request, res: Response){
        const tutores = await this.tutorRepository.findALL();
        // retorna OK e lista os tutores
        res.status(200).json(tutores);
    }

    async getByUuid(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const tutor = await this.tutorRepository.findByUuid(uuid);

            if(!tutor) {
                res.status(404).json({ message: "Tutor nao encontrado" });
                return;
            }
            res.status(200).json(tutor);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    // Cria um novo tutor
    async create(req: Request, res: Response) {
        try {
            const validatedData = createTutorSchema.parse(req.body);
        

            //instancia o novo tutor apos pegar os parametros de req.body validados pelo zod
            const newTutor = new Tutor(validatedData);
            const savedTutor = await this.tutorRepository.create(newTutor);

            res.status(201).json(savedTutor);
        } catch (error) {
            if(error instanceof z.ZodError) {
                res.status(400).json({ error: error.format()});
                return;
            }
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
    // metodo update de tutor
    async update(req: Request, res: Response){
        try{
            const uuid = z.string().uuid().parse(req.params.uuid);
            const validatedData = updateTutorSchema.parse(req.body) as Partial<Tutor>;

            const updateTutor = await this.tutorRepository.update(uuid, validatedData);
            if (!updateTutor) {
                res.status(404).json({message: "Tutor nao encontrado"});
                return;
            }
            res.status(200).json(updateTutor);
        } catch (error) {
            if(error instanceof z.ZodError) {
                res.status(400).json({ error: error.format()});
                return;
            }
            res.status(500).json({message: "Erro interno do servidor "});
        }
    }

    async delete(req: Request, res: Response ) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const sucess = await this.tutorRepository.delete(uuid);
            if (!sucess) {
                res.status(404).json({ message: "Tutor nao encontrado"});
                return;
            }
            res.status(204).send();
        }catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format()});
                return;
            }
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
}
