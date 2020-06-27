const express = require("express");
const app = express();

const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

dotenv.config()


const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true })
.then(() => {
    console.log('Connectded')
})

mongoose.connection.on('error', err => {
    console.log(`DB Connection Error ${err.message}`);
})
//middleware

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator())
app.use('/',postRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use(function(err, req,res,next){
    if(err.name === "UnauthorizedError"){
        res.status(401).json({error: "Unauthorized!"});
    }
})

const port = process.env.PORT || 8080;

app.listen((port), () => {
    console.log(`Listening on ${port}`)
})