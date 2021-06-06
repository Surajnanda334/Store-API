const express = require('express');
const mongoose = require('mongoose')
const productSchema = require('../app/models/productsModel');
const checkAuth = require('../app/middlewares/check-auth');

const router = express.Router(); 


//Product Routes
router.get('/addProduct',(req,res)=>{
  res.render('product/add')
 })
router.post('/searchProduct',(req,res)=>{
  var id = req.body.search
  productSchema.findById(id, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      res.json(docs)
        console.log("Result : ", docs);
    }
  })
 })
 

router.get('/updateProduct', (req,res)=>{
  res.render('product/update')
 })
router.post('/updateProduct', (req,res)=>{
  productSchema.findOneAndUpdate({productName: {$eq:req.body.update} }, 
    {
      productName:req.body.productName,
      price:req.body.price
    }, null, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Original Doc : ",docs);
    }
    productSchema.find()
        .then(user => {
          res.render('product/products',{products:user})
        })
        .catch(err => {
            res.send({ message : err.message || "Error Occurred while retriving user information" })
        })
});
 })
router.get('/deleteProduct',(req,res)=>{
  res.render('product/delete')
})
router.post('/deleteProduct',(req,res)=>{
  console.log(req.body);
  productSchema.findOneAndRemove({productName: {$eq:req.body.delete} }, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted User : ", docs);
    }
    productSchema.find()
        .then(user => {
          res.render('product/products',{products:user})
        })
        .catch(err => {
            res.send({ message : err.message || "Error Occurred while retriving user information" })
        })
});
 })

 router.post('/addProduct',(req,res)=>{
  const product = new productSchema({
    productName:req.body.productName, 
    price:req.body.price,
  })
  product
      .save()
      .then(result=>{
        productSchema.find()
        .then(user => {
          res.render('product/products',{products:user})
        })
        .catch(err => {
            res.send({ message : err.message || "Error Occurred while retriving user information" })
        })
        console.log(result);
        console.log(`${result.productName} added sucessfully`);
      })
      .catch(err => {
          console.log({ message : err.message || "Error Occurred while retriving user information" })
      })
})
module.exports = router;