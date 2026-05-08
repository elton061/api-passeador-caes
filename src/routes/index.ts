import { Router } from "express";
import tutorRoutes from "./tutor.routes.js"; 

const router = Router();

// registrando a rota do tutor
router.use("/tutores", tutorRoutes);

export default router;