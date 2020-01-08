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
    eventId: evId,
    quantity: qua,
    price: pri,
    subTotal: sub
  });

  if(qua==0){
    //delete order
    SingleOrder.deleteOne({eventId:evId}).exec();
    Order.findOneAndUpdate({userId: userId}, 
      {$pull:{singleOrder: { _id: newId }}},{new: true}, (err, result) => {
      // Rest of the action goes here
      console.log("rimosso");
      console.log(result);
     })
  } else {
    SingleOrder.findOne({eventId:evId})
      .exec()
      .then(sing => {
        if (sing!=null) {
          // cè modifica
          var singId = sing._id;

          SingleOrder.findOneAndUpdate({eventId: evId}, 
            {$set: {
              quantity: qua,
              price: pri,
              subTotal: sub}},{new: true}, (err, result) => {
            // Rest of the action goes here
            console.log(result);
          })


          res.status(201).json(JSON.stringify({
            message: "found"
          }));
        
        } else{
          //non cèe crea a aggungi
          singOr
          .save()
          .catch(err =>{
            res.status(500).json(JSON.stringify({
              error: "Internal Error"
            }));
          })

          Order.findOneAndUpdate({userId: userId}, 
                        {$push: {singleOrder: newId}},{new: true}, (err, result) => {
                        // Rest of the action goes here
                        console.log(result);
                      })
          res.status(404).json(JSON.stringify({
            error: "not"
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
      console.log(doc);
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
  console.log(id);
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
    .select("_id userId order eventId subTotale totalPrice")
    .exec()
    .then(doc => {
      
      SingleOrder.find({ eventId: evId})
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




//TODO
//inserimento nuoi biglietti o modifca dal carrello

//se get:id da 404 allora creo il carrello con il primo ordine CON LA POST.
//nel se restituisce 200 allora 
  //mi da parametro lui se esiste evento 
    //controllo se c'e gia event ID
          //if yes => aggiorno quantità * sub e totale (se nuova=0 allora cancello ordine (se size==0 allora cancello l'rodine completo pure))
          //if no => aggiungo ad arrraya nuovo elemento con evento e quantita
              //calcolo sub e nuovo totale


exports.orders_update_order = (req, res, next) => {
  const id = req.params.userId;
  const type = req.params.update;
  const body = req.body;
  console.log(body);
  if(type==="true"){
    //type true se c'e gia evento e evi aggioranre quantita 

    const updateOps = {};
    for (const ops of req.body ) {
      updateOps[ops.propName] = ops.value;
      console.log(updateOps[ops.propName]);
      console.log(updateOps[ops.propName]);
    }
    var options = {new: true};

    Order.findOneAndUpdate({ userId: id }, { $set: updateOps },options,function (err, doc) {})
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(JSON.stringify({
          message: "Order updated",
          request: {
            type: "GET",
            url: "http://localhost:5000/order/" + id
          }
        }));
      })
      .catch(err => {
        if(err.name="CastError"){
          console.log("ERROR:\n" + "provided userID NOT FOUND");
          res.status(404).json(JSON.stringify({ message: "provided urserID NOT FOUND" }));
        } else{
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.stringify({ error: err }));
        }
      });
  };
  

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

