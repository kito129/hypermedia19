//marco for PORT to listen
const PORT = 3000;
//import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//import router
const artistRoutes = require("./api/routes/artists");
const eventRoutes = require("./api/routes/events");
const userRoutes = require('./api/routes/user');

//connect database
mongoose.connect(
  "mongodb://node-shop:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shop-shard-00-00-wovcj.mongodb.net:27017,node-rest-shop-shard-00-01-wovcj.mongodb.net:27017,node-rest-shop-shard-00-02-wovcj.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

//use parser
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS error correction
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/artists", artistRoutes);
app.use("/events", eventRoutes);
app.use("/semiar", seminarRoutes);
app.use("/user", userRoutes);

//handler the 404 error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
//handler all error or generic 500 error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//app is listening for request on PORT
app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});