import connectionDb from "../config/database.js";

async function findPatientByEmail(email) {
	return await connectionDb.query(
		`
        SELECT * FROM "public.patient" WHERE email=$1
    `,
		[email]
	);
}

async function findDoctorByEmail(email) {
	return await connectionDb.query(
		`
        SELECT * FROM "public.doctor" WHERE email=$1
    `,
		[email]
	);
}

async function findDoctorByCrm(crm) {
	return await connectionDb.query(
		`
        SELECT * FROM "public.doctor" WHERE crm=$1
    `,
		[crm]
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

async function updateDoctorToken({ user, token }) {
    return connectionDb.query(
        `UPDATE "public.doctor" SET token=$1 WHERE id=$2;`,
        [token, user.id]);
}

async function createDoctor({ name, email, password, crm, specialty, address, district, city, state, number }) {
    await connectionDb.query(
        `
        WITH ins AS (
            INSERT INTO "public.addresses" (address, district, city, state, number)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        )
        INSERT INTO "public.doctor" (name, email, password, crm, specialty, address_id)
        VALUES ($6, $7, $8, $9, $10, (SELECT id FROM ins))
        `,
        [address, district, city, state, number, name, email, password, crm, specialty]
    );
}





export default {
	findPatientByEmail,
    findDoctorByEmail,
    findDoctorByCrm,
	createPatient,
    updatePatientToken,
    createDoctor,
    updateDoctorToken
};

