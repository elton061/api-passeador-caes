import express from "express";
import { PetController } from "../controllers/pet.controller.js";

const router = express.Router();
const petController = new PetController();

// Listar todos os pets
router.get("/", (req, res) => petController.getALL(req, res));

// Buscar pet pelo ID
router.get("/:uuid", (req, res) => petController.getByUuid(req, res));

// Buscar todos os pets de um tutor específico
router.get("/tutor/:tutorId", (req, res) => petController.getByTutor(req, res));

// Criar um novo pet
router.post("/", (req, res) => petController.create(req, res));

// Atualizar um pet
router.patch("/:uuid", (req, res) => petController.update(req, res));

// Deletar um pet
router.delete("/:uuid", (req, res) => petController.delete(req, res));

export default router;