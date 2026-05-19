import express from "express";
import { TutorController } from "../controllers/tutor.controller.js";

const router = express.Router();
const tutorController = new TutorController();

router.get("/", (req, res) => tutorController.getALL(req, res));
router.get("/:uuid", (req, res) => tutorController.getByUuid(req, res));
router.post("/", (req, res) => tutorController.create(req, res));
router.put("/:uuid", (req, res) => tutorController.update(req, res));
router.delete("/:uuid", (req, res) => tutorController.delete(req, res));

export default router;