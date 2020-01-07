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
              url: "https://hypermedia19.herokuapp.com/order/" + doc._id,
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

//OK
exports.orders_create_order = (req, res, next) => {
  let body = req.body;
  let evId = body.eventId;
  let qua = body.quantity;
  let pri = body.price;
  let userId=  req.params.userId;
  const sub = qua*pri;
  let newId = new mongoose.Types.ObjectId;
  const singOr = new SingleOrder({
    _id: newId,
    eventId: evId,
    quantity: qua,
    price: pri,
    subTotal: sub
  });

  singOr
    .save()
    .catch(err =>{
      console.log("ERROR:\n" + err);
    })

  Order.findOne({ userId:userId },)
  .exec()
  .then(order =>{
    console.log(order);
    SingleOrder.findOne({ _id:order.singleOrder},)
      .exec()
      .then(single =>{
        console.log(single);
      })


  })
  .catch(err=>{
    console.log("ERROR");
    console.log(err);

  }) 


  //se esite o meno
  

  /*
  Order.findOneAndUpdate({ userId:userId }, { $set: singOr },{new: true}) 
  .exec()
  .then(ord => {

    console.log(ord);
    
    for (let k = 0; k < ord[0].order.length; k++) {
      const element = ord[0].order[k];
      
      if (element.eventId==evId) {

        var update = 
        [
          {
            eventId: evId,
            quantity: qua,
            price: pri,
            subTotal: pri*qua
          }
        ];
        console.log(update);

      
      } else {
        console.log("not");
      }
    }
   
  })
  .catch(err => {
    console.log("ERROR:\n" + err);
      res.status(500).json(JSON.stringify({
        error: err
      }));
  });
   */
};


/*

if (user.length >= 1) {
  return res.status(409).json(JSON.stringify({
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
          res.status(201).json(JSON.stringify({
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
        res.status(400).json(JSON.stringify({
          message: "Invalid eventId input",
          error: err
        }));
      } else {
        console.log("ERROR:\n" + err);
        res.status(500).json(JSON.stringify({
          error: err
        }));
      }
    });
  }
})   


*/

//OK
exports.orders_get_order = (req, res, next) => {
  const id = req.params.userId;
  Order.find({ userId: id})
    .select("_id userId singleOrder totalPrice")
    .populate("singleOrder")
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(JSON.stringify({
        order: doc,
        request: {
          type: "GET",
          url: "https://hypermedia19.herokuapp.com/order/" + id
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

//OK
exports.orders_get_order_get_event = (req, res, next) => {
  const id = req.params.userId;
  const evId= req.params.eventId;
  Order.find({ userId: id},{ eventId: evId} )
    .select("_id userId order eventId subTotale totalPrice")
    .exec()
    .then(doc => {
      let el;

      for (let k = 0; k < doc[0].order.length; k++) {
        const element = doc[0].order[k];
        if(element.eventId==evId){
          el =element;
        }
      }

      if (el==undefined) {
        console.log("ERROR:\n" + "provided eventID NOT FOUND\n");
        res.status(404).json(JSON.stringify({ message: "provided eventID NOT FOUND" }));

      } else{
        res.status(200).json(JSON.stringify({
          order: el,
          request: {
            type: "GET",
            url: "https://hypermedia19.herokuapp.com/order/" + id + "/" + evId
          }
        }));
      }
      
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
            url: "https://hypermedia19.herokuapp.com/order/" + id
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
          url: "https://hypermedia19.herokuapp.com/order/",
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

