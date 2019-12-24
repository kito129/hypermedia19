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
        
        /*
        photo1=jsonEvent.event.photoGallery[0].path;
        photo2=jsonEvent.event[1].path;
        photo3=jsonArtist.event.photoGallery[2].path;

        

        $("#artistName").text(jsonArtist.artist.name);

        //link for carousel
        $("#img1").append(
            `
            <img class="d-block w-100" src="../../../${photo1}">
            `
        );
        $("#img2").append(
            `
            <img class="d-block w-100" src="../../../${photo2}">
            `
        );
        $("#img3").append(
            `
            <img class="d-block w-100" src="../../../${photo3}">
            `
        );
        */
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
                        <img src="../../../${jsonArtist.artist.photoGallery[0].path}"class="imagesArtist">                   
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
        if(jsonEvent.event.relSeminar.length!=0){
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

            for(var i=0;i<jsonAllEvents.events.length;i++){

                if(jsonAllEvents.events[i].data[0]==thisEventOnlyDataAndHour[0]&&jsonAllEvents.events[i].data[1]==thisEventOnlyDataAndHour[1]&&
                    jsonAllEvents.events[i].data[2]==thisEventOnlyDataAndHour[2]&&jsonAllEvents.events[i].data[3]==thisEventOnlyDataAndHour[3]&&
                    jsonAllEvents.events[i].data[4]==thisEventOnlyDataAndHour[4]&&jsonAllEvents.events[i].data[5]==thisEventOnlyDataAndHour[5]&&
                    jsonAllEvents.events[i].data[6]==thisEventOnlyDataAndHour[6]&&jsonAllEvents.events[i].data[7]==thisEventOnlyDataAndHour[7]&&
                    jsonAllEvents.events[i].data[8]==thisEventOnlyDataAndHour[8]&&jsonAllEvents.events[i].data[9]==thisEventOnlyDataAndHour[9])
                {

                    $("#relSameDay").append(
                    
                        `
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <a href="singleevent.html?id=${jsonAllEvents.events[i]._id}">  
                                <img src="../../../${jsonAllEvents.events[i].photoGallery}"class="imagesArtist">                   
                            </a> 
                            <div>
                                <h5><b>${jsonAllEvents.events[i].name}</b></h5>
                            </div>
                            <h7><i><b>${nameArtist}</b></i></h7>                          <br>
                            <h7><i><b>${jsonAllEvents.events[i].type}</b></i></h7>        <br>
                            <h7><i><b>${jsonAllEvents.events[i].date}</b></i></h7>
                        </div>
                        `
                    );
                }
            }
        });
    });
    /*
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
      */
});