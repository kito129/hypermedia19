const mongoose = require("mongoose");

const Order = require("../models/orders");
const Event = require("../models/event");

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
            order: doc.order[0],
            totalPrice: doc.totalPrice,
            _id: doc._id,
            request: {
              type: "GET",
              url: "https://hypermedia19.herokuapp.com/order/" + doc._id,
            }
          };
        })
      };
        if (docs.length >= 0) {
          res.status(200).json(JSON.Stringify(response));
          } else {
              res.status(404).json(JSON.Stringify({
                  message: 'No entries found'
              }));
        }
      })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.Stringify({
        error: err
      }));
    });
};

//OK
exports.orders_create_order = (req, res, next) => {
  const body = req.body;
  const bodyOrder = body.order;
  Order.find({ userId: body.userId })
  .exec()
  .then(user => {
    if (user.length >= 1) {
      return res.status(409).json(JSON.Stringify({
        message: "Order with this userId already exists. Update this order"
      }));
    } else {
        Event.find({_id: req.body.order[0].eventId })
        .exec()
        .then(event =>{
          const singlePrice =  Number(event[0].price);
          const quant =  Number(bodyOrder[0].quantity);
          const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            order: 
            [
              {
                eventId: req.body.order[0].eventId,
                quantity: req.body.order[0].quantity,
                subTotal: singlePrice*quant
              }
            ],
            totalPrice: singlePrice*quant
          });
          order
            .save()
            .then(result => {
              res.status(201).json(JSON.Stringify({
                message: "Created Order Created",
                createdOrder: {
                  userId: result.userId,
                  order: result.order,
                  totalPrice: result.totalPrice,
                  requestCart: {
                    type: "GET",
                    url: "https://hypermedia19.herokuapp.com/order/" + result._id
                  }
                }
              }));
            })
        })
        .catch(err => {
          if(err.name="CastError"){
            console.log("Invalid eventId input:\n" + err);
            res.status(400).json(JSON.Stringify({
              message: "Invalid eventId input",
              error: err
            }));
          } else {
            console.log("ERROR:\n" + err);
            res.status(500).json(JSON.Stringify({
              error: err
            }));
          }
        });
      }
    })   
    .catch(err => {
      if(err.name="CastError"){
        console.log("Invalid userId input:\n" + err);
        res.status(400).json(JSON.Stringify({
          error: "Invalid userId input"
        }));
      } else {
        console.log("ERROR:\n" + err);
        res.status(500).json(JSON.Stringify({
          error: err
        }));
      }
    });
   
  };

//OK
exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select("_id userId order totalPrice")
    .exec()
    .then(doc => {
      res.status(200).json(JSON.Stringify({
        order: doc,
        request: {
          type: "GET",
          url: "https://hypermedia19.herokuapp.com/order/"
        }
      }));
    })
    .catch(err => {
      if(err.name="CastError"){
        console.log("ERROR:\n" + "provided ID order NOT FOUND");
        res.status(404).json(JSON.Stringify({ message: "provided ID order NOT FOUND" }));
      } else{
        console.log("ERROR:\n" + err);
        res.status(500).json(JSON.Stringify({ error: err });
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
  const id = req.params.orderId;
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

    Order.findOneAndUpdate({ _id: id }, { $set: updateOps },options,function (err, doc) {})
      .exec()
      .then(result => {
        console.log(result);
        res.status(200).json(JSON.Stringify({
          message: "Order updated",
          request: {
            type: "GET",
            url: "https://hypermedia19.herokuapp.com/order/" + id
          }
        }));
      })
      .catch(err => {
        if(err.name="CastError"){
          console.log("Order ID not found");
          res.status(404).json(JSON.Stringify({
            error: "Order ID not found"
          }));
        } else{
          console.log("ERROR:\n" + err);
          res.status(500).json(JSON.Stringify({
            error: err
          }));
        }
      });
  

    
  } else {
    //se non c'e evento ed è da aggiungere al carrelo

  }

  

};


//OK
exports.orders_delete = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(JSON.Stringify({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "https://hypermedia19.herokuapp.com/order/",
          body: { userId: "Number",}
        }
      }));
    })
    .catch(err => {
      console.log("ERROR:\n" + err);
      res.status(500).json(JSON.Stringify({
        error: err
      }));
    });
};

