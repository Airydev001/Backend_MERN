const httpError = require('../models/http-error')
const uuid = require('uuid');
const {validationResult} = require("express-validator")
const User = [
    { 
        id:1,
        name:"Agunbiade",
        email:"agun@gmail.com",
        password:"agun123"
    },{
        id:2,
        name:"Bunmi",
        email:"bunmi123@gmail.com",
        password:"bunmi3456"
    }
]

const getUser = (req,res,next)=>{
      res.json({
        User:User
      })
      if(!User){
        throw new httpError("I can't find any user");
      }
}

const findUserById = (req,res)=>{
    const username = req.params.name; 
  const users = User.find(p => p.name === username);
  if(!users){
    throw new httpError("Couldn't found user on the array",404);

  }
  res.status(200).json({
    userFound:users
  })

}

const signUser = (req,res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      throw new httpError("Invalid input please check your data",422)
  }
  
  const {name,email,password} = req.body;

    const hasUser =User.find(u=> u.email === email);
    if(hasUser){
        throw new httpError("Could not created user", 422);
    }
    const newUser = {
        id:uuid.v4(),
        name,
        email,
        password
    }
    User.push(newUser);
    res.status(201).json({
        user:newUser
    })
}
const loginUser = (req,res)=>{
    const {email,password} = req.body;
    console.log(typeof(password));

    const detailUser = User.find(u => u.email == email);

    if(!detailUser || detailUser.password !== password){
        throw new httpError("Could not identify user, credential seem wrong",401);
    }
    res.json({message:'logged In'})
}


exports.findUserById = findUserById;
exports.getUser=getUser;
exports.signUser= signUser;
exports.loginUser=loginUser;