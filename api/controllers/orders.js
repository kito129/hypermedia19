const mongoose = require("mongoose");

const Order = require("../models/orders");
const Event = require("../models/event");
const SingleOrder = require("../models/singleOrder");

//OK
exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("_id userId order eventId totalPrice")
    .exec()
    .then(docs => {
      const response = {
        orders: docs.map(doc => {
          return {
            userId: doc.userId,
            singleOrder: doc.singleOrder,
            totalPrice: doc.totalPrice,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/order/" + doc._id,
            }
          };
        })
      };
        if (docs.length >= 0) {
          res.status(200).json(JSON.stringify(response));
          } else {
              res.status(404).json(JSON.stringify({
                  message: 'No entries found'
              }));
        }
      })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};


exports.orders_create_order = (req, res, next) => {

  let userId=  req.params.userId;

  //create new sing order
  let body = req.body;
  let evId = body.eventId;
  let qua = body.quantity;
  let pri = body.price;
  const sub = qua*pri;
  
  let newId = new mongoose.Types.ObjectId;
  const singOr = new SingleOrder({
    _id: newId,
    userId: userId,
    eventId: evId,
    quantity: qua,
    price: pri,
    subTotal: sub
  });

  let semdId;

 

  if(qua==0){
    //delete order

    SingleOrder.findOne({eventId:evId ,userId:userId})
    .exec()
    .then(doc =>{
      semdId =doc._id;
      SingleOrder.deleteOne({eventId:evId ,userId:userId}).exec();
      Order.findOneAndUpdate({userId: userId}, 
        { $pullAll: {singleOrder: [semdId]}},{new: true}, (err, result) => {
        // Rest of the action goes here
        console.log(err);
        
      });
      res.status(201).json(JSON.stringify({
        message: "succes deleted"
      }));
  
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(JSON.stringify({
        error: "interal error"
      }));
    });
    
    
    
  } else {
    SingleOrder.findOne({eventId:evId , userId:userId})
      .exec()
      .then(sing => {
        if (sing!=null) {
          // cè modifica
          var singId = sing._id;

          SingleOrder.findOneAndUpdate({eventId:evId ,userId:userId}, 
            {$set: {
              quantity: qua,
              price: pri,
              subTotal: sub}},{new: true}, (err, result) => {
            // Rest of the action goes here
                console.log(result);
                console.log(err);
          })
          res.status(201).json(JSON.stringify({
            message: "order updated"
          }));
        
        } else{
          //non cèe crea a aggungi
          singOr
            .save()
            .catch(err =>{
              console.log(err);
              res.status(500).json(JSON.stringify({
                error: "Internal Error"
              }));
            })

          Order.findOneAndUpdate({userId: userId}, 
                        {$push: {singleOrder: newId}},{new: true}, (err, result) => {
                        // Rest of the action goes here
                        console.log(result);
                        console.log(err);
                      })
          res.status(201).json(JSON.stringify({
            message: "order created"
          }));

        }
        
      })
      .catch(err => {
        
          if(err.name="CastError"){
            console.log("Event ID not valid");
            console.log(err);
            res.status(404).json(JSON.stringify({
              error: "Event ID not valid"
            }));
          } else{
            console.log("ERROR:\n" + err);
            res.status(500).json(JSON.stringify({
              error: err
            }));
          }
      });    
    }
};

//OK
exports.orders_get_order = (req, res, next) => {
  const id = req.params.userId;
  Order.find({ userId: id})
    .select("_id userId singleOrder totalPrice")
    .populate("SingleOrder")
    .exec()
    .then(doc => {
    
      res.status(200).json(JSON.stringify({
        order: doc,
        request: {
          type: "GET",
          url: "http://localhost:5000/order/" + id
        }
      }));
    })
    .catch(err => {
      if(err.name="CastError"){
        console.log("ERROR:\n" + "provided uset ID  NOT FOUND");
        res.status(404).json(JSON.stringify({ message: "provided user ID NOT FOUND" }));
      } else{
        console.log("ERROR:\n" + err);
        res.status(500).json(JSON.stringify({ error: err }));
      }
    });
};

exports.orders_get_order_single = (req, res, next) => {
  const id = req.params.singleId;

  SingleOrder.findById(id)
      .select("_id eventId price quantity subTotal")
      .then(doc => {
        res.status(200).json(JSON.stringify({
          single: doc,
          request: {
            type: "GET",
            url: "http://localhost:5000/single/" + id 
          }
        }));
      })
      .catch(err => {
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.stringify({ error: err }));
      });  

};

//OK
exports.orders_get_order_get_event = (req, res, next) => {
  const id = req.params.userId;
  const evId= req.params.eventId;

  Order.find({ userId:id})
    .select("_id userId order eventId singleOrder subTotale totalPrice")
    .exec()
    .then(doc => {
      
      SingleOrder.find({ eventId: evId,userId:id})
      .select("_id eventId price quantity subTotal")
      .then(doc => {
        if(!doc.length==0){
          res.status(200).json(JSON.stringify({
            order: doc,
            request: {
              type: "GET",
              url: "http://localhost:5000/order/" + id + "/" + evId
            }
          }));
        } else {
          res.status(404).json(JSON.stringify({ message: "provided user + event  NOT FOUND" }));
        }
        
      })
      .catch(err => {
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.stringify({ error: err }));
      });      
    })
    .catch(err => {
      if(err.name="CastError"){
        console.log("ERROR:\n" + "provided userId NOT FOUND\n" + err);
        res.status(404).json(JSON.stringify({ message: "provided userId  NOT FOUND" }));
      } else{
        console.log("ERROR:\n" + err);
        res.status(500).json(JSON.stringify({ error: err }));
      }
    });
  };

//OK
exports.orders_delete = (req, res, next) => {
  const id = req.params.userId;
  Order.remove({ userId: id })
    .exec()
    .then(result => {
      res.status(200).json(JSON.stringify({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/order/",
          body: { userId: "Number",}
        }
      }));
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
    });
};

