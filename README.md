# victor-api
Run ```npm run dev``` to start the project

---

## To Do
### Create Router
### Create Route /user/
### Create UserModel
```javascript
User {
 name: String,
 age: Number,
 gender: String,
 pets: [Pet]
}
```

### Create Gender Validation
Valid genders: ```['male', 'female', 'other']```

### Create CRUD for User
### Persist data on MongoDB Atlas
### Add Middleware to /user to check for Admin privilleges and return age if is admin
### Create PetModel
```javascript
Pet {
  name: String,
  race: String
}
```
### Create CRUD for Pet
### Add method "addPet" for User (POST /user/pet/petId)
### Add method "removePet" from User (DELETE /user/pet/petId)
### Create route /user/pets/ to retrieve all pets from a User
