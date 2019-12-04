const PORT = 3000;

/* -------- IMPORT  -------- */
//impport and create express server as an app
const express = require('express');
const app = express();
//import morgan for log in the terminal
const morgan = require('morgan');
//body-parser for parsin json res
const bodyParser = require ('body-parser');

/* -------- MAIN  -------- */
//import artist Route
const artistRoutes= require('./api/routes/artist');


//log in terminal
app.use(morgan('dev'));
//parse url and response 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//link all routers to the app
app.use('/artist',artistRoutes);

/* -------- HANDLING CORS ERROR -------- */
//we append some text in any response header to fix this bug

app.use((req, res, next)=>{
    //instead of * can be the only website can use API
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Method", "PUT","POST","PATCH","DELETE","GET");
        return res.status(200).json({});
    }
    next();
});

/* -------- ERROR CONTROLL -------- */
//error 404 for not found resources
app.use((req,res,next)=>{
    const error = new Error ('Not found');
    error.status = 404;
    next(error);
    
})

//catch alla error from app, or general 500 error
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json ({
        error:{
            message: error.message
        }
    });
});


//app is listening for request on PORT
app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});