const mongoose = require('mongoose'); 
const express = require('express')
const PetModel = require('../models/petSchema')


const app = express()
app.use(express.json());

async function getPets(req, res) {
    console.log("Requisição get em /pets")

    try {
        const showPets = await PetModel.find({})
        console.log("Pets mostrados")
        res.status(201).json(showPets)
    } catch(err) {
            console.log("Erro alcançado em petUsers", err)
            res.status(500).json(err.message)
    }
}

async function getPet(req, res) {
    console.log("Requisição get em /pet")
    const { id } = req.params
    
    try {
    const findPet = await PetModel.findOne({ _id: id })
    const showPet = {
        name: findPet.name,
        race: findPet.race,
    }
    console.log("Pet mostrado", showPet)
    res.status(201).json(showPet)
    } catch(err) {
        console.log("Erro alcançado em petUser", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function postPets(req, res) {
    console.log("Requisição post em /pets")

    const { name, race } = req.body
    const petParams = {
        name: name,
        race: race
    }

    try {
        const createdPet = await PetModel.create(petParams)
        console.log("Pet criado", createdPet)
        res.status(201).json(createdPet)
    } catch(err) {
        console.log("Erro alcançado em /pets", err)
        res.status(400).json(err.message)
    }
}

async function putPet(req, res) {
    console.log("Requisição put em /pets")
    const { id } = req.params
    const { name, race } = req.body
    const petParams = {
        name: name,
        race: race,
    }

    try {
        const putPet = await PetModel.findOneAndUpdate({ _id: id }, petParams, {
            new: true
        })  
        console.log(putPet)
        res.status(201).json(putPet)
    } catch(err) {
        console.log("Erro alcançado em putPets", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function deletePet(req, res) {
    console.log("Requição delete em /pets")
    const { id } = req.params
    
    try {
        const a = await PetModel.deleteOne({ _id: id })
        res.status(201).json("Usuário deletado com sucesso")
        res.deletedCount;
    } catch (err) {
        console.log("Erro alcançado em deletePet", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}



module.exports = { getPets, getPet, postPets, putPet, deletePet }