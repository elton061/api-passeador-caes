import { Request, Response } from "express";
import { PetRepository } from "../Repositories/pet.repository.js";
import { tutorRepositoryInstance } from "../Repositories/tutor.repository.js"; 
import { createPetSchema, updatePetSchema, Pet } from "../models/pet.models.js";
import { z } from "zod";

export class PetController {
    //Instanciando o repositório de Pets

    private petRepository = new PetRepository();
    private tutorRepository = tutorRepositoryInstance;

    // Lista todos os pets cadastrados
    async getALL(req: Request, res: Response){
        const pets = await this.petRepository.findALL();
        // retorna OK e lista os pets
        res.status(200).json(pets);
    }

    // Lista um pet por um determinado ID
    async getByUuid(req: Request, res: Response) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const pet = await this.petRepository.findByUuid(uuid);

            if(!pet) {
                res.status(404).json({ message: "Pet nao encontrado" });
                return;
            }
            res.status(200).json(pet);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    }

    //Lista todos os pets cadastrados de um determinado tutor
    async getByTutor(req: Request, res: Response) {
        try {
            const tutorUuid = z.string().uuid().parse(req.params.tutorId);
            const pets = await this.petRepository.findByTutorId(tutorUuid);
            res.status(200).json(pets);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.format() });
                return;
            }
            res.status(500).json({ message: "Erro interno do servidor "});
        }
    }

    // Cria um novo pet
    async create(req: Request, res: Response) {
        try {
            // Valida os dados de entrada usando o schema do Zod
            const validatedData = createPetSchema.parse(req.body);
            
            // Busca todos os tutores cadastrados
            const tutores = await this.tutorRepository.findALL();

            // Tenta encontrar o tutor q possui CPF válido
            const tutorEncontrado = tutores.find(tutor => tutor.cpf === validatedData.cpf_tutor);

            if (!tutorEncontrado) {
                res.status(404).json({ 
                    message: "Não foi possível cadastrar o pet. Nenhum tutor encontrado com o CPF informado." 
                });
                return; 
            }
            const petCompleto = {
                ...validatedData,
                id_tutor: tutorEncontrado.id
            };
            //instancia o novo pet apos pegar os parametros de req.body validados pelo zod
            const newPet = new Pet(validatedData);
            const savedPet = await this.petRepository.create(newPet);

            res.status(201).json(savedPet);
        } catch (error) {
            if(error instanceof z.ZodError) {
                res.status(400).json({ error: error.format()});
                return;
            }
            res.status(500).json({message: "Erro interno do servidor"});
        }
    }
    // Atualiza os dados de um pet existente
    async update(req: Request, res: Response){
        try{
            const uuid = z.string().uuid().parse(req.params.uuid);
            const validatedData = updatePetSchema.parse(req.body) as Partial<Pet>;

            const updatePet = await this.petRepository.update(uuid, validatedData);
            if (!updatePet) {
                res.status(404).json({message: "Pet nao encontrado"});
                return;
            }
            res.status(200).json(updatePet);
        } catch (error) {
            if(error instanceof z.ZodError) {
                res.status(400).json({ error: error.format()});
                return;
            }
            res.status(500).json({message: "Erro interno do servidor "});
        }
    }

    //Remove um pet
    async delete(req: Request, res: Response ) {
        try {
            const uuid = z.string().uuid().parse(req.params.uuid);
            const sucess = await this.petRepository.delete(uuid);
            if (!sucess) {
                res.status(404).json({ message: "Pet nao encontrado"});
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
