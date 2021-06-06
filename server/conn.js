const mongoose = require('mongoose');
require('dotenv/config')
const MONGO_URI=process.env.MONGO_URI

const connectDB = async () => { 
    try{
        // mongodb connection string
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB