import userServices from "../services/userServices.js"

async function createPatient(req, res){
    const {name, email, password} = req.body

    try{
        await userServices.createPatient({name, email, password})
        return res.sendStatus(201)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

async function loginPatient(req, res){
    const {email, password} = req.body

    try{
        const token = await userServices.loginPatient({ email, password });
        return res.send({ token });
    }catch(err){
        return res.status(500).send(err.message)
    }
}

async function createDoctor(req, res){
    const { name, email, password, crm, specialty, address, district, city, state, number  } = req.body;

    try{
        await userServices.createDoctor({name, email, password, crm, specialty, address, district, city, state, number })
        return res.sendStatus(201)
    }catch(err){
        return res.status(500).send(err.message)
    }
}

async function loginDoctor(req, res){
    const {email, password} = req.body

    try{
        const token = await userServices.loginDoctor({ email, password });
        return res.send({ token });
    }catch(err){
        return res.status(500).send(err.message)
    }
}

export default {
    createPatient,
    loginPatient,
    createDoctor,
    loginDoctor
}