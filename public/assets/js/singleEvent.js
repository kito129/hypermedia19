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

$(document).ready(function(){

    var idEvent=getUrlParameterValue(self.location.href,"id");
    var jsonEvent;

    $.get("https://hypermedia19.herokuapp.com/event/"+idEvent, function(data, status){

        jsonEvent=JSON.parse(data);
        var photo1;
        var photo2;
        var photo3;
        
       
        photo1=jsonEvent.event.photoGallery[0].filename;
        photo2=jsonEvent.event.photoGallery[1].filename;
        photo3=jsonEvent.event.photoGallery[2].filename;

        

        $("#eventName").text(jsonEvent.event.name);

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
        $("#date").text(jsonEvent.event.date);
        $("#abstract").text(jsonEvent.event.abstract);
        $("#locationTitle").text("Location: ")
        $("#location").text(jsonEvent.event.place);
        
        //artisti relativi
        $.get("https://hypermedia19.herokuapp.com/artist/"+jsonEvent.event.artistId, function(data, status){

            var jsonArtist=JSON.parse(data);

            $("#relArtist").append(

                `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <a href="singleartist.html?id=${jsonArtist.artist._id}">  

                        <img src="../images/${jsonArtist.artist.photoGallery[0].filename}"class="imagesArtist">                   

                    </a> 
                    <div>
                        <h5><b>${jsonArtist.artist.name}</b></h5>
                    </div>
                    <h7><i><b>${jsonArtist.artist.type}</b></i></h7>
                </div>
                `

                );
        });

        //seminari relativi
        if(jsonEvent.event.relSeminar!=undefined){
            $.get("https://hypermedia19.herokuapp.com/seminar/"+jsonEvent.event.relSeminar, function(data, status){

                jsonSeminar=JSON.parse(data);

                $("#relSeminar").append(
                    
                        `
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <a href="singleseminar.html?id=${jsonSeminar.seminar._id}">  
                                <img src="../../../${jsonSeminar.seminar.photoGallery}"class="imagesArtist">                   
                            </a> 
                            <div>
                                <h5><b>${jsonSeminar.seminar.name}</b></h5>
                            </div>
                            <h7><i><b>seminar</b></i></h7>        <br>
                            <h7><i><b>${jsonSeminar.seminar.date}</b></i></h7>
                        </div>
                        `
                    );
            });
        }

        $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){

            var jsonAllEvents=JSON.parse(data);
            var thisEventDataAndHour=jsonEvent.event.date;
            
            for(let i=0;i<jsonAllEvents.events.length;i++){

                if(jsonAllEvents.events[i].date[0]==thisEventDataAndHour[0]&&jsonAllEvents.events[i].date[1]==thisEventDataAndHour[1]&&
                    jsonAllEvents.events[i].date[2]==thisEventDataAndHour[2]&&jsonAllEvents.events[i].date[3]==thisEventDataAndHour[3]&&
                    jsonAllEvents.events[i].date[4]==thisEventDataAndHour[4]&&jsonAllEvents.events[i].date[5]==thisEventDataAndHour[5]&&
                    jsonAllEvents.events[i].date[6]==thisEventDataAndHour[6]&&jsonAllEvents.events[i].date[7]==thisEventDataAndHour[7]&&
                    jsonAllEvents.events[i].date[8]==thisEventDataAndHour[8]&&jsonAllEvents.events[i].date[9]==thisEventDataAndHour[9]
                    &&jsonAllEvents.events[i]._id!=idEvent){
                   
                    $.get("https://hypermedia19.herokuapp.com/artist/"+jsonAllEvents.events[i].artistId, function(data, status){

                        var jsonSingleArtist=JSON.parse(data);

                        $("#relSameDay").append(
                    
                                `
                                <div class="col-sm-12 col-md-6 col-lg-4">
                                    <a href="singleevent.html?id=${jsonAllEvents.events[i]._id}">  
                                        <img src="../images/${jsonAllEvents.events[i].photoGallery[0].filename}"class="imagesArtist">                   
                                    </a> 
                                    <div>
                                        <h5><b>${jsonAllEvents.events[i].name}</b></h5>
                                    </div>
                                    <h7><i><b>${jsonSingleArtist.artist.name}</b></i></h7>                          <br>
                                    <h7><i><b>${jsonAllEvents.events[i].type}</b></i></h7>        <br>
                                    <h7><i><b>${jsonAllEvents.events[i].date}</b></i></h7>
                                </div>
                                `
                        );
                    });
                }
            }
        });
    });
    
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
      
});