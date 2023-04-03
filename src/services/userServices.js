import bcrypt from "bcrypt";
import userRepositories from "../repositories/userRepositories.js";
import jwt from "jsonwebtoken";

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

async function loginPatient({ email, password }) {
    const { rows: users } = await userRepositories.findPatientByEmail(email);
    if (users.length == 0) throw new Error("Invalid credentials");
    const [user] = users;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    let decodedToken = null;
    if (user.token) {
        decodedToken = jwt.decode(user.token);
    }
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        const newToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        await userRepositories.updatePatientToken({ user, token: newToken });
        return newToken;
    }
    return user.token;
}

async function createDoctor({ name, email, password, crm, specialty, address, district, city, state, number }) {
	const { rows: doctorByemail } = await userRepositories.findDoctorByEmail(email);
	const { rows: doctorByCrm } = await userRepositories.findDoctorByCrm(crm);
	if (doctorByemail.length !== 0 || doctorByCrm.length !== 0) throw new Error("Doctor already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
	await userRepositories.createDoctor({name, email, password : hashedPassword, crm, specialty, address, district, city, state, number});
}

async function loginDoctor({ email, password }) {
    const { rows: users } = await userRepositories.findDoctorByEmail(email);
    if (users.length == 0) throw new Error("Invalid credentials");
    const [user] = users;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid credentials");

    let decodedToken = null;
    if (user.token) {
        decodedToken = jwt.decode(user.token);
    }
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
        const newToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        await userRepositories.updateDoctorToken({ user, token: newToken });
        return newToken;
    }
    return user.token;
}



export default {
	createPatient,
    loginPatient,
	createDoctor,
	loginDoctor
};
