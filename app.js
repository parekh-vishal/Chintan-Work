const express=require("express");
const app=express();
const morgan =require('morgan');
const path = require('path');
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const admin = require('./routes/admin');
const supervises = require('./routes/workDetails');
var db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/ChintanDB',{
    useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false
});
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
     console.log("Connection to the database eastablished.");
 });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './views/build')));

app.get('/', (req,res) => {
    console.log('ss')
    res.sendFile(path.join(__dirname, './views/build/index.html'));
});

app.get('/signup', (req,res) => {
    console.log('ss')
    res.sendFile(path.join(__dirname, './views/build/index.html'));
});



app.use('/admin',admin);
app.use('/supervisor',supervises);
app.use((req,res,next)=>{
    res.header("Acess-Control-Allow-Origin",'*');
    res.header('Access-Control-Allow-Heaaders','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Mehtods','PUT, POST, PATCH, DELET, GET');
        return res.status(200).json({});
    }
    next(); 
});
//Write Operational Apis Here

app.use((req,res,next)=>{
    const error=new Error("Not Found");
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    console.log(error.message);
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message 
        }
    });
});
module.exports = app;