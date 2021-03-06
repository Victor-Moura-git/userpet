const mongoose = require('mongoose'); 
const express = require('express')
const UserModel = require('../models/userSchema')
const PetModel = require('../models/petSchema')


const app = express()
app.use(express.json());

async function getUsers(req, res) {
    console.log("Requisição get em /users")

    try {
    const showUsers = await UserModel.find({})
    console.log("Usuários mostrados")
    res.status(201).json(showUsers)
    } catch(err) {
        console.log("Erro alcançado em getUsers", err)
        res.status(500).json(err.message)
    }
}

async function getUser(req, res) {
    console.log("Requisição get em /user")
    const { id } = req.params

    if(req.isAdmin) {
        try {
            const findUser = await UserModel.findOne({ _id: id })
            const showUser = {
                name: findUser.name,
                age: findUser.age,
                gender: findUser.gender,
                pets: findUser.pets
            }
            console.log("Usuário mostrado", showUser)
            res.status(201).json(showUser)
            } catch(err) {
                console.log("Erro alcançado em getUser", err)
                res.status(400).json("ID digitado errado, tente novamente")
            }
    } else {
        try {
        const findUser = await UserModel.findOne({ _id: id })
        const showUser = {
            name: findUser.name,
            gender: findUser.gender,
            pets: findUser.pets
        }
        console.log("Usuário mostrado", showUser)
        res.status(201).json(showUser)
        } catch(err) {
            console.log("Erro alcançado em getUser", err)
            res.status(400).json("ID digitado errado, tente novamente")
        }
    }
}

async function postUsers(req, res) {
    console.log("Requisição post em /users")

    const { name, age, gender, pets } = req.body
    const userParams = {
        name: name,
        age: age,
        gender: gender,
        pets: pets
    }

    try {
        const createdUser = await UserModel.create(userParams)
        console.log("Usuário criado", createdUser)
        res.status(201).json(createdUser)
    } catch(err) {
        console.log("Erro alcançado em /users", err)
        res.status(400).json(err.message)
    }
}

async function putUser(req, res) {
    console.log("Requisição put em /users")
    const { id } = req.params
    const { name, age, gender, pets } = req.body
    const userParams = {
        name: name,
        age: age,
        gender: gender,
        pets: pets
    }

    try {
        const putUser = await UserModel.findOneAndUpdate({ _id: id }, userParams, {
            new: true
        })  
        console.log(putUser)
        res.status(201).json(putUser)
    } catch(err) {
        console.log("Erro alcançado em putUsers", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function deleteUser(req, res) {
    console.log("Requição delete em /users")
    const { id } = req.params
    
    try {
        const deleteUser = await UserModel.deleteOne({ _id: id })
        res.status(201).json("Usuário deletado com sucesso")
        res.deletedCount;
    } catch (err) {
        console.log("Erro alcançado em deleteUser", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function addUserPet(req, res) {
    console.log("Requisição post em /users/pets")
    const { userId, petId } = req.params
    /* const findStoredPets = await UserModel.findOne({ _id: userId })
    console.log(findStoredPets.pets) */

    try {
        const findId = await PetModel.findOne({ _id: petId })
        findPet = {
            name: findId.name,
            race: findId.race
        }

        const addPet = await UserModel.findOneAndUpdate({ _id: userId }, 
        {
            pets: findPet
        }, 
        {
            new: true
        })
        console.log(addPet)
        res.status(201).json(addPet)
    } catch (err) {
        console.log("Erro alcançado em addPet", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function removePet(req, res) {
    console.log("Requisição delete em /users/pets")

    const { userId, petId } = req.params

    try {
        const removePet = await UserModel.findOneAndUpdate({ _id: userId }, {
            pets: []
        }, {
            new: true
        })
        console.log(removePet)
        res.status(201).json(removePet)
    } catch(err) {
        console.log("Erro alcançado em RemovePet", err)
        res.status(400).json("ID digitado errado, tente novamente")
    }
}

async function getPetsUser(req, res) {
    console.log("Requisição get em /user/pets")
    const { id } = req.params

    const findUser = await UserModel.findOne({ _id: id })
    const showPets = {
        pets: findUser.pets
    }
    res.status(201).json(showPets)
}

module.exports = { getUsers, getUser, postUsers, putUser, deleteUser, addUserPet, removePet, getPetsUser }