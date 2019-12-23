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

            &("#relArtist").append(

                `
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <a href="singleartist.html?id=${jsonArtist.artist._id}">  
                        <img src="../../../${jsonEvents.events[i].photoGallery}"class="imagesArtist">                   
                    </a> 
                    <div>
                        <h5><b>${jsonEvents.events[i].name}</b></h5>
                    </div>
                    <h7><i><b>${jsonEvents.events[i].date}</b></i></h7>
                </div>
                `

                )


            

        });





    });



   /*
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
      */
});