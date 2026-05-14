import { Router } from "express";
import tutorRoutes from "./tutor.routes.js"; 
import petRoutes from "./pet.routes.js";

const router = Router();

// registrando a rota do tutor
router.use("/tutores", tutorRoutes);

// registrando a rota do pet
router.use("/pets", petRoutes);

export default router;