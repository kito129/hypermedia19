if (localStorage.getItem("userId")!=null && localStorage.getItem("token")!=null) {

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
            if(res.order[0].order.length==0){
                $("#allert").empty();
                $("#allert").append(
                    `
                    <h4 class="text-center mt-4 mb-4">Your cart are Empty. Add Ticket to cart for puchase here.</h4>
                    `
                );
            } else {

                /*
                for (let i = 0; i < res.order[0].order.length; i++) {
                    const element =  res.order[0].order[i];
            
                    $.get("https://hypermedia19.herokuapp.com/event" + , function(data, status){
                        var name = element.
                    });

		            Events=JSON.parse(data)
                    var name = element.
                    var date 
                    var price
                    var quantity
                    
                }
                */
                
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


