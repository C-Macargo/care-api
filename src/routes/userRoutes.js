import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { createPatientSchema, loginPatientSchema } from "../schemas/patientSchema.js";
import { createDoctorSchema, loginDoctorSchema } from "../schemas/doctorSchema.js";
const userRoutes = Router();

userRoutes.post("/patient/register",validateSchema(createPatientSchema), userController.createPatient)
userRoutes.post("/patient/login",validateSchema(loginPatientSchema), userController.loginPatient)
userRoutes.post("/doctor/register",validateSchema(createDoctorSchema), userController.createDoctor)
userRoutes.post("/doctor/login",validateSchema(loginDoctorSchema), userController.loginDoctor)
export default userRoutes;