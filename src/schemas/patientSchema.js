import joi from "joi";

export const createPatientSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

export const loginPatientSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

