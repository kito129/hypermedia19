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

    var idArtist=getUrlParameterValue(self.location.href,"id");
    $.get("https://hypermedia19.herokuapp.com/artist/"+idArtist, function(data, status){

        var jsonArtist=JSON.parse(data);
        //console.log(jsonArtist.artist);


        $("#singoloArtista").append(

            `
            <img src="../../../${jsonArtist.artist.photoGallery}" class="imageSingleArtist">
                
             `
            );
        

        $("#singleEvent").append(

             `
            <a class="artista"><b>${jsonArtist.artist.name}</b></a><br>

            `

            );

        if(jsonArtist.artist.achivements.length!=0){

            var text="";

            for(var i=0;i<jsonArtist.artist.achivements.length;i++){

                text=text+jsonArtist.artist.achivements[i]+"---";

            }

             $("#singleEvent").append(

                    `<a class="achievements">Achievements: <b id="bold"></b></a><br>`
                );


             $("#bold").text(text);

        }

        $("#singleEvent").append(

            `
            <a class="currentAffiliation">Current Affiliation: <b>${jsonArtist.artist.currentAffiliattion}</b></a><br>
            <a class="date">Company Members: <b>-------------------------ciao</b></a><br>
            <div style="text-align:justify" class="paragrafofullpage">
                <p class="descrizione"><b>${jsonArtist.artist.abstract}</b></p>
            </div>


              `
            );
    });

/*
    $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){

        var jsonEvents=JSON.parse(data);
        console.log(jsonEvents.events.length);

        for(var i=0;i<jsonEvents.events.lenght;i++){

            
          
            if(){

                $("singoloEvento").append(

                    `
                    <img src="../../../${jsonEvents[i].photoGallery}" class="imageSingleEvent">

                    `

                    );
            }
            
        }
    });
    
    */



});

