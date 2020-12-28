const express=require("express");
const app=express();
const morgan =require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
//const session = require("express-session");
//const mongoDBStore = require("connect-mongodb-session")(session);
/*const store = new mongoDBStore(
    {
        uri : process.env.MONGO_SERVER,
        collection : 'sessions',
    }
);*/
const user = require('./routes/user');
const authentication = require('./routes/authentication');
const constructionSite = require('./routes/constructionSite');
const organization = require('./routes/organization');
var db = mongoose.connection;
mongoose.connect(process.env.MONGO_SERVER,{
    useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false
});
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
     console.log("Connection to the database eastablished.");
 });
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './views/build')));
/*app.use(
    session({
        secret:process.env.JWT_KEY,
        resave: false, 
        saveUninitialized: false, 
        store:store})
            );*/
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './views/build/index.html'));
});

app.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, './views/build/index.html'));
});


app.use('/authenticate',authentication);
app.use('/user',user);
app.use('/constructionSite',constructionSite);
app.use('/organization',organization);
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