import connectionDb from "../config/database.js";

async function findPatientByEmail(email) {
	return await connectionDb.query(
		`
        SELECT * FROM "public.patient" WHERE email=$1
    `,
		[email]
	);
}

async function createPatient({ name, email, password }) {
    await connectionDb.query(
        `
        INSERT INTO "public.patient" (name, email, password)
        VALUES ($1, $2, $3)
        `,
        [name, email, password]
    );
}

async function updatePatientToken({ user, token }) {
    return connectionDb.query(
        `UPDATE "public.patient" SET token=$1 WHERE id=$2;`,
        [token, user.id]);
}



export default {
	findPatientByEmail,
	createPatient,
    updatePatientToken
};
