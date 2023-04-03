import joi from "joi";

export const createDoctorSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    crm: joi.string().required(),
    specialty: joi.string().required(),
    address: joi.string().required(),
    district: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required().max(2),
    number: joi.string().required(),
});

export const loginDoctorSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
