import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { createPatientSchema, loginPatientSchema } from "../schemas/patientSchema.js";

const userRoutes = Router();

userRoutes.post("/patient/register",validateSchema(createPatientSchema), userController.createPatient)
userRoutes.post("/patient/login",validateSchema(loginPatientSchema), userController.loginPatient)

export default userRoutes;