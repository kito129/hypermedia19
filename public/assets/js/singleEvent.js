function getUrlParameterValue(url, parameter) {
    var questionSplit = url.split('?');
    questionSplit.shift();
    var onlyParameters = questionSplit.join('?');
    var splittedParameters = onlyParameters.split('&');
    var found = false;
    var value = null;
    for (var c = 0; c < splittedParameters.length; c++) {
        var parts = splittedParameters[c].split('=');
        if (parts[0] == parameter) {
            value = parts[1];
            if (value.trim()== '') {
                found = false;
            } else {
                found = true;
            }
        }
        if (found) {
            return value;
        }
    }
    if (!found) {
        return false;
    }
}

let eventInCart=false;
let quantity=0;
let idEvent;
let eVprice;

$(document).ready(function(){

    idEvent=getUrlParameterValue(self.location.href,"id");
    var Event;
    var Events;
    var Seminars;
    var Artist;
    var Artist;
    
    $.get("https://hypermedia19.herokuapp.com/event/"+idEvent, function(data, status){

        Event=JSON.parse(data);
        let thisEventDataAndHour= new Date (Event.event.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                Event.event.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                Event.event.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                Event.event.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                Event.event.date.split("-")[1].replace(/\s+/g, '').split(".")[1],
                0);

        var photo1=Event.event.photoGallery[0].filename;
        var photo2=Event.event.photoGallery[1].filename;
        var photo3=Event.event.photoGallery[2].filename;

        $("#eventName").text(Event.event.name);
        //link for carousel
        $("#img1").append(
            `
            <img class="d-block w-100" src="../images/${photo1}">
            `
        );
        $("#img2").append(
            `
            <img class="d-block w-100" src="../images/${photo2}">
            `
        );
        $("#img3").append(
            `
            <img class="d-block w-100" src="../images/${photo3}">
            `
        );
        
        //add info 
        $("#dateTitle").text("Date: ")
        $("#date").text(Event.event.date);
        $("#abstract").text(Event.event.abstract);
        $("#locationTitle").text("Location: ")
        $("#location").text(jsonEvent.event.place);
        $("#typeTitle").text("Type: ")
        $("#type").text(jsonEvent.event.type);
        

        
        //relative artist
        $.get("https://hypermedia19.herokuapp.com/artist/"+Event.event.artistId, function(data, status){

            Artist=JSON.parse(data);

            $("#relArtist").append(
                `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <a href="singleartist.html?id=${Artist.artist._id}">  
                        <img src="../images/${Artist.artist.photoGallery[0].filename}"class="imagesArtist">                   
                    </a> 
                    <div>
                        <h5><b>${Artist.artist.name}</b></h5>
                    </div>
                    <div>
                        <h7><i><b>${Artist.artist.type}</b></i></h7>
                    </div>
                </div>
                `
            );
        });

        //relative seminar
        if(Event.event.relSeminar!=undefined){
            $.get("https://hypermedia19.herokuapp.com/seminar/"+Event.event.relSeminar, function(data, status){

                Seminar=JSON.parse(data);

                var splitte= Seminar.seminar.photoGallery.split("\\");
                var url= splitte[2]+ "\\"+splitte[3];
                
                $("#relativeTitle").text("RELATIVE SEMINAR")
                $("#relSeminar").append(
                    
                        `
                        <div class="col-sm-12 col-md-6 col-lg-4" >
                            <a href="singleseminar.html?id=${Seminar.seminar._id}">  
                                <img src="../${url}"class="imagesArtist">                   
                            </a> 
                            <div>
                                <h5><b>${Seminar.seminar.name}</b></h5>
                            </div>
                            <div>
                                <h7><i><b>seminar</b></i></h7>
                            </div>
                            <div>
                                <h7><i><b>${Seminar.seminar.date}</b></i></h7>
                            </div>
                        </div>
                        `
                    );
                
            });
        }

        //relative same day events + seminars
        $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){
            
        Events=JSON.parse(data);

            $.get("https://hypermedia19.herokuapp.com/seminar/", function(data, status){

                Seminars=JSON.parse(data);
                var iSem;
                var test = false;

                for(let i=0;i<Events.events.length;i++){

                    iSem = Events.events[i];
                    iEventDate= new Date (iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                        iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                        iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                        iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                        iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[1],0);
                    
                    if(thisEventDataAndHour.getFullYear() == iEventDate.getFullYear() 
                    && thisEventDataAndHour.getMonth() == iEventDate.getMonth()
                    && thisEventDataAndHour.getDate() == iEventDate.getDate()
                    && Events.events[i]._id!=idEvent){

                        test=true;
                        $.get("https://hypermedia19.herokuapp.com/artist/"+Events.events[i].artistId, function(data, status){

                            Artist=JSON.parse(data);

                            $("#relSameDay").append(
                                `
                                <div class="col-sm-12 col-md-6 col-lg-4">
                                    <a href="singleevent.html?id=${Events.events[i]._id}">  
                                        <img src="../images/${Events.events[i].photoGallery[0].filename}"class="imagesArtist">                   
                                    </a> 
                                    <div>
                                        <h5><b>${Events.events[i].name}</b></h5>
                                    </div>
                                    <div>
                                        <h7><i><b>${Artist.artist.name}</b></i></h7>
                                    </div>
                                    <div>                         
                                        <h7><i><b>${Events.events[i].type}</b></i></h7>
                                    </div>
                                    <div>        
                                        <h7><i><b>${Events.events[i].date}</b></i></h7>
                                    </div>
                                </div>
                                `
                            );
                        });
                    }
                }

                if(test){
                    $("#sameTitle").text("RELATIVE SAME DAY");
                }
                var phSplit;
                var phurl;
                var iSeminarDate;

                    for(let j=0;j<Seminars.seminars.length;j++){
                        
                        iSem = Seminars.seminars[j];
                        iSeminarDate = new Date (iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                            iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                            iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                            iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                            iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[1],0);
                        
                        if(thisEventDataAndHour.getFullYear() == iSeminarDate.getFullYear() 
                        && thisEventDataAndHour.getMonth() == iSeminarDate.getMonth()
                        && thisEventDataAndHour.getDate() == iSeminarDate.getDate()
                        ){
            
                        phSplit= Seminars.seminars[j].photoGallery.split("\\");
                        phurl= phSplit[2]+ "\\"+phSplit[3];

                        $("#relSameDay").append(
                        `
                            <div class="col-sm-12 col-md-6 col-lg-4">
                                <a href="singleseminar.html?id=${Seminars.seminars[j]._id}">         

                                    <img src="../${phurl}"class="imagesArtist">                   

                                </a> 
                                <div>
                                    <h5><b>${Seminars.seminars[j].name}</b></h5>
                                </div>
                                <h7><i><b>seminar</b></i></h7>        <br>
                                <h7><i><b>${Seminars.seminars[j].date}</b></i></h7>
                            </div>
                            `
                        );
                    }
                }
            });
        });
   
        //check for order
        if (localStorage.getItem("userId")!=null && localStorage.getItem("token")!=null) {

            var userId=localStorage.getItem("userId");
            //call to torder api
            $.ajax({
                url : "https://hypermedia19.herokuapp.com/order/" + localStorage.getItem("userId") +  "/" + idEvent,
                type: "GET",
                contentType: "application/json; carset=utf-8",
                dataType   : "json",
                beforeSend: function (xhr) {

                    xhr.setRequestHeader ("Authorization",localStorage.getItem("token"));
                },
                success    : function(data,status,xrh){

                    var or =  JSON.parse(data);
                    var qua = or.order.quantity;
                    quantity = qua;
                    eventInCart=true;
                    $("#orderTitle").text("Order");
                    $('div').find("input[type=text]").each(function(ev)
                    {
                        if(!$(this).val()) { 
                       $(this).attr("placeholder", quantity);
                    }
                    });
                },
                error       : function (err) {
                    eventInCart=false;
                    quantity =0;
                    $("#orderTitle").text("Order");
                }
            });
        } else{
            //if not logged
            $("#orderTitle").text("You are not logged, can't use order feature");
            $("#order").hide();
        }
    });
    
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
    })
      
});


function addUpdateBtn() {
    $("#updateSpace").empty();
    $("#updateSpace").append(
        `
        <button type="button" class="btn btn-success m-1" id="updateBtn">Update</button>
        `
    );
}


$( "#increment" ).click(function() {
    quantity=quantity+1;
    if(quantity<6){
        addUpdateBtn();
        $('div').find("input[type=text]").each(function(ev)
            {
                if(!$(this).val()) { 
                $(this).attr("placeholder", quantity);
            }
        });
    } else {
        quantity=quantity-1;
    }	
});

$( "#decrement" ).click(function() {

    quantity=quantity-1;
    if(quantity>-1){
        addUpdateBtn();
        $('div').find("input[type=text]").each(function(ev)
            {
                if(!$(this).val()) { 
                $(this).attr("placeholder", quantity);
            }
        });
    } else {
        quantity=quantity+1;
    }	
});

//sumbit modification
$( "#updateSpace").on("click",'#updateBtn' , function() {
    $("#updateSpace").empty();
    //post order to 
    order(quantity);

});


function order(newQuantity) {

    $.ajax({

        url : "https://hypermedia19.herokuapp.com/order/" + localStorage.getItem("userId"),
        type: "POST",
        contentType: "application/json; carset=utf-8",
        dataType   : "json",
        data: JSON.stringify(
            [
                {		
                    "propName":"eventId"  ,"value":idEvent,
                    "propName":"price"  ,"value":evPrice,
                    "propName":"quantity"  ,"value":newQuantity,

                }
            ]
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