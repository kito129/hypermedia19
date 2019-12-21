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
    var jsonArtist;
    $.get("https://hypermedia19.herokuapp.com/artist/"+idArtist, function(data, status){

        jsonArtist=JSON.parse(data);
        


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

                text=text+jsonArtist.artist.achivements[i]+"--";

            }

             $("#singleEvent").append(

                    `<a class="achievements">Achievements: <b id="bold"></b></a><br>`
                );


             $("#bold").text(text);

        }

        $("#singleEvent").append(

            `
            <a class="currentAffiliation">Current Affiliation: <b>${jsonArtist.artist.currentAffiliattion}</b></a><br>

            `
            );

        if(jsonArtist.artist.isCompany==true){

            var members="";

            for(var i=0;i<jsonArtist.artist.companyMembers.length;i++){

                members=members+jsonArtist.artist.companyMembers[i]+"--";

            }

            $("#singleEvent").append(

            `
            <a class="date">Company Members: <b id="members"></b></a><br>
            

            `
            );

            $("#members").text(members);

        }

        $("#singleEvent").append(

            `

            <div style="text-align:justify" class="paragrafofullpage">
				<br>
                <p class="descrizione"><b>${jsonArtist.artist.abstract}</b></p>
            </div>
           

            `
            );


    });

    $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){

        var jsonEvents=JSON.parse(data);


        for(var i=0;i<jsonEvents.events.length;i++){

            if(jsonEvents.events[i].artistId==idArtist){

                
                $("#fotoEvento").append(

                    `
                    <img src="../../../${jsonEvents.events[i].photoGallery}" class="imageSingleEvent">

                    `

                    );
                $("#infoEvent").append(

                    //da finire il riferimento all'evento singolo

                     `
                    <a class="name" href="singleevent.html"><b>SEVEN DAYS WALKING TOUR</b></a><br> 
                    <a class="artista"><b>${jsonArtist.artist.name}</b></a><br>
                    <a class="date">Date: <b>12/06/2020 - 21.00</b></a><br>
                    <a class="place">Place: <b>Place of Tree of Life</b></a><br>
                    <a class="price">Price: <b>50.00€</b></a><br>
                    <span>
                        <button type="button" class="btn btn-dark btncart"><b>-</b></button>
                        <span class="quantity"><b>3</b></span>
                        <b>TICKETS&ensp;</b>
                        <button type="button" class="btn btn-dark btncart"><b>+</b></button>
                        <button type="button" class="btn btn-dark" disabled><b>SOLD OUT</b></button><br>
                    </span>

                      `

                      );
                    
            }
            
        }
    });
    
    



});

