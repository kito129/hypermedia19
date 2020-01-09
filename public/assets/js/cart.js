//utli funtion
function isEmpty( el ){
    return !$.trim(el.html())
}

//empty order
function emptyOrder(eventId,price) {
    $.ajax({

        url : "https://hypermedia19.herokuapp.com/order/" + localStorage.getItem("userId"),
        type: "POST",
        contentType: "application/json; carset=utf-8",
        dataType   : "json",
        data: JSON.stringify(
            {		
                "eventId":eventId,
                "price": price,
                "quantity":0,

            }
        ),
        beforeSend: function (xhr) {
    
            xhr.setRequestHeader ("Authorization",localStorage.getItem("token"));
        },
        success    : function(data,status,xrh){
        },
        error      : function (err) {
            console.log(err);
        }
    
    });
}

if (localStorage.getItem("userId")!=null && localStorage.getItem("token")!=null) {
    let total =0;
    let count=0;
    
    $.ajax({
        url : "https://hypermedia19.herokuapp.com/order/" + localStorage.getItem("userId"),
        type: "GET",
        contentType: "application/json; carset=utf-8",
        dataType   : "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization",localStorage.getItem("token"));
        },
        success    : function(data,status,xrh){
            var res = JSON.parse(data);
            
            for (let i = 0; i < res.order[0].singleOrder.length; i++) {
                const element =  res.order[0].singleOrder[i];

                $.ajax({
                    url : "https://hypermedia19.herokuapp.com/order/single/" + element,
                    type: "GET",
                    contentType: "application/json; carset=utf-8",
                    dataType   : "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization",localStorage.getItem("token"));
                    },
                    success    : function(data,status,xrh){
                        var sing = JSON.parse(data);
                        if(!(sing.single==null)){
                            var quantity = sing.single.quantity;
                            var sub = sing.single.subTotal;
                            total=total + sub;
                            $.ajax({
                                url : "https://hypermedia19.herokuapp.com/event/" + sing.single.eventId,
                                type: "GET",
                                contentType: "application/json; carset=utf-8",
                                dataType   : "json",
                                success    : function(data,status,xrh){
                                    var event = JSON.parse(data);
                                    var el = event.event;
                                
                                    count=count+1;
                                    $("#cart").append(
                                        `
                                        <div class="row mt-2 mb-2">
                                            <div class="col-4">
                                                <a href="singleEvent.html?id=${el._id}">
                                                    <img src="../images/${el.photoGallery[0].filename}" class="img-thumbnail">                   
                                                </a> 
                                            </div>
                                            <div class="col-8">
                                                <div>
                                                    <a href="singleEvent.html?id=${el._id}">
                                                        <h5><b>${el.name}</b></h5>
                                                    </a> 
                                                </div>
                                                <div>                         
                                                    <h7><i><b>Price: ${el.price}.00€</b></i></h7>
                                                </div>
                                                <div>        
                                                    <h7><i><b>Quantity: ${quantity}</b></i></h7>
                                                </div>
                                                <div>        
                                                    <h7><i><b>SubTotale: ${sub}.00€</b></i></h7>
                                                </div>
                                                <!--
                                                <div>        
                                                    <button type="button" class="btn btn-danger" id="${sing.single._id}+${el._id}+${el.price}"> x</button>    
                                                </div>  
                                                -->                                        
                                            </div>
                                        </div>
                                        `
                                    );
    
                                    $("#cartTotal").empty();
                                    $("#cartTotal").append(
                                        `
                                        <div class="row mt-2 mb-2">
                                            <div class="col-12">
                                                <h3>Total: ${total}.00€</h3>
                                                <button class="btn btn-primary btn-block">Pay</button
                                            </div>
                                        </div>
                                        `
                                    );
                                },
                                error      :function (err) {
                                }
                            });
                        }
                        
                    },
                    error      : function (err) {
                    }
                });                          
            }
        },
        error       : function (err) {
            
            console.log("Auth failed");
            $("#allert").empty();
            $("#allert").append(
                `
                <h4 class="text-center mt-4 mb-4">You are not Logged in. Cart feauture is not enabled for not logged user.</h4>
                `
            );
        },
        complete    :function(){
            //check if carty is empty

            setTimeout(function(){
                if (isEmpty($('#cart'))) {
                    // do something
                    $("#allert").append(
                        `
                        <h4 class="text-center mt-4 mb-4">Your cart is empty.. go  <a href="https://hypermedia19.herokuapp.com/assets/pages/events.html?value=event">events</a>  , find one to buy and add it into the cart.</h4>
                        `
                    );
                }
            }, 3500);
            
            
        }
    });

    

} else {

    $("#allert").empty();
    $("#allert").append(
        `
        <h4 class="text-center mt-4 mb-4">You are not Logged in. Cart feauture is not enabled for not logged user.</h4>
        `
    );

}


$(document).ready(function(){

    $( "#cart").on('click','.btn btn-danger' , function() {
        console.log( $( this ));
        var evId = $(this).attr("id");
      

    });
});


