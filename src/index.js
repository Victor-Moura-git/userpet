const express = require('express')
const mongoose = require('mongoose'); 
const { getUsers, getUser, postUsers, putUser, deleteUser, addUserPet, removePet, getPetsUser } = require('./user.route')
const { getPets, getPet, postPets, putPet, deletePet } = require('./pet.route')

const app = express()
app.use(express.json());

// DB connection

const connectString = "mongodb+srv://testdb:zd9NkCbL9FaMWsi0@cluster0.efbmz.mongodb.net/project-tet?retryWrites=true&w=majority";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection
  .once('open', () => console.log("Connected"))
  .on('error', (error) => {
    console.log("Error", error)
  })

// MIDDLEWARE

async function checkAdmin(req, res, next) {
  console.log(req.params)
  if(req.headers.role == 'admin') {
    req.isAdmin = true
    next()
  }
  else {
    next()
  }
}

// TODO Adicionar rotas

// user CRUD
app.get('/users', getUsers)

app.get('/user/:id', checkAdmin, getUser)

app.post('/users', postUsers)

app.put('/users/:id', putUser)

app.delete('/users/:id', deleteUser)

app.post('/users/:userId/pet/:petId', addUserPet)

app.delete('/users/:userId/pet/:petId', removePet)

app.get('/user/:id/pets', getPetsUser)

// pet CRUD
app.get('/pets', getPets)

app.get('/pet/:id', getPet)

app.post('/pets', postPets)

app.put('/pets/:id', putPet)

app.delete('/pets/:id', deletePet)

app.listen(8000, () => {
  console.log("Servidor iniciado em localhost:8000")
})
