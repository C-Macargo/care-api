import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";

async function createPatient({ name, email, password }) {
	const { rows: user } = await userRepositories.findPatientByEmail(email);
    if (user.length !== 0) throw new Error("Patient already exists");

	const hashPassword = await bcrypt.hash(password, 10);
	await userRepositories.createPatient({
		name,
		email,
		password: hashPassword,
	});
}

export default {
	createPatient,
};
