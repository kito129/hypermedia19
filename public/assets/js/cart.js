if (localStorage.getItem("userId")!=null && localStorage.getItem("token")!=null) {
    let total =0;
    
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
            console.log(res);
            if(res.order[0].singleOrder.length==0){
                $("#allert").empty();
                $("#allert").append(
                    `
                    <h4 class="text-center mt-4 mb-4">Your cart are Empty. Add Ticket to cart for puchase here.</h4>
                    `
                );
            } else {

               

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
                                
                                    console.log(el);
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
                                                    <h5><b>${el.name}</b></h5>
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
                                                <div>        
                                                    <button type="button" class="btn btn-danger"> x</button>    
                                                </div>                                           
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
                        },
                        error      : function (err) {
                            
                        }
                    });                          
                }
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


