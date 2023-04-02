import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/patient", userController.createPatient)

export default userRoutes;