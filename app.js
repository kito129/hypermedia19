//port Variable
const PORT = 3000;
//import dependencies
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//import routers
const artistRoutes = require("./api/routes/artists");
const eventRoutes = require("./api/routes/events");
const seminarRoutes = require("./api/routes/seminars");
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//database setting
const CONNECTION_URL = 
  "mongodb://shibbo:"+
  process.env.MONGO_ATLAS_PW +
  "@hypermedia-shard-00-00-pzrp3.mongodb.net:27017,hypermedia-shard-00-01-pzrp3.mongodb.net:27017,hypermedia-shard-00-02-pzrp3.mongodb.net:27017/test?ssl=true&replicaSet=hypermedia-shard-0&authSource=admin&retryWrites=true&w=majority";
const DATABASE_NAME = "hypermedia";
//database connection option
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  connectTimeoutMS: 1000,
  poolSize: 10 // Maintain up to 10 socket connections
};
//database connection
if(mongoose.connect(CONNECTION_URL,options)){
  mongoose.Promise = global.Promise;
  //handle error
  console.log("Server Connected to " + DATABASE_NAME + " database")
  mongoose.connection.on('error',console.error.bind(
    console, '\n-----MongoDB connection error------:\n')
  );
} else{
  console.log("ERROR to connect to " + DATABASE_NAME + " database")
}

//use middleware 
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should be accepted requests
app.use((req, res, next) => {
  //CORS error fix in the header
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
app.use("/artist", artistRoutes);
app.use("/event", eventRoutes);
app.use("/seminar", seminarRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

//error 404 for not found routers
app.use((req, res, next) => {
  const error = new Error("Route Not Valid");
  error.status = 404;
  next(error);
});
//specific error or 500 generic error routers gestor
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//app is listening on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  
});