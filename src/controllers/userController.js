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


export default {
    createPatient
}