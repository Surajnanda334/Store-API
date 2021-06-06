const express = require('express');
require('dotenv/config')
const expressEjsLayouts = require('express-ejs-layouts')

const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//assets
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.set('view engine', 'ejs')

// //Import Routes
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
app.get('/',(req,res)=>{
  res.render('home')
})
app.use('/user', userRoute);
app.use('/products', productRoute);

//connect to database
const connectDB = require('./server/conn');
connectDB();
app.listen(3000, ()=>{
  console.log(`Listening on http://localhost:3000/`);
});