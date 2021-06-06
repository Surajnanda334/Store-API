const express = require('express');
const userSchema = require('../app/models/userModel');
const productSchema = require('../app/models/productsModel');

const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const router = express.Router(); 

const randomString = bcrypt.genSaltSync(10);

router.post('/signup',(req,res)=>{
  console.log(req.body);
  const user = new userSchema({
    name:req.body.name, 
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,randomString),
    role:req.body.role
  })
  user
      .save(user)
      .then(result=>{
        res.render('/auth/login')
        console.log(result);
      })
      .catch((err)=>{
        console.log(err);
        res.json({
          error:err
        });
      })
})
router.post('/login',(req,res)=>{
  userSchema.find({email:req.body.email})
  .then(user=>{
    if(user.length<1){
      res.json({
        message:'Authentication failed please signup first'
      })
      console.log('Authentication failed please signup first');
    }
    else if(bcrypt.compareSync(req.body.password, user[0].password,)){
      
      if(user[0].role==='admin')
      {
        console.log(`${user[0].name} authenticated`);
        const token= jwt.sign({email:user[0].email,userId:user[0]._id },process.env.secret,{expiresIn:"1h"})
        productSchema.find()
        .then(user => {
            res.render('product/adminProducts',{products:user})
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
      }
      else
      {
        console.log(`${user[0].name} authenticated`);
        productSchema.find()
        .then(user => {
            res.render('product/userProducts',{products:user})
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
      }}
    else{
      res.json({
        message:'Authentication failed Password does not match'
      })
      console.log('Authentication failed Password does not match');
    }
  })
  .catch(err=>{
    console.log(err);
    res.json({error:err})
  })
 })

router.delete('/:id',(req,res)=>{
  const id = req.params.id;

  userSchema.findByIdAndDelete(id)
      .then(data => {
          if(!data){
              res.send({ message : `Cannot Delete with id ${id}. use a valid ID`})
          }else{
              console.log("User deleted sucessfully");
              res.send({
                  message : "User was deleted successfully!"
              })
          }
      })
      .catch(err =>{
          res.send({
              message: "Could not delete User with id=" + id
          });
      });
})

router.get('/signup',(req,res)=>{
  res.render('auth/register')
 })
router.get('/login',(req,res)=>{
  res.render('auth/login')
 })



module.exports = router;