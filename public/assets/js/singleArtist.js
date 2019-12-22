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

        console.log(data);
        jsonArtist=JSON.parse(data);
        $("#artist").append(
            `
            
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-lg-4 mb-5 ">
                        <img src="../../../${jsonArtist.artist.photoGallery}" class="imageSingleArtist">
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-8">
                        <!--affiliattion-->
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-4 " align="left">
                                <h4><b>CurrentAffiliation: </b></h4>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-8 " align="left">
                                <h5 id="currentAffiliation"></h5>
                            </div>
                        </div>
                        <!--member-->
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-4 " align="left">
                                <h4><b id="memebersTitle"></b></h4>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-8 " align="left">
                                <h5  id="members"></h5>
                            </div>
                        </div>
                        <!--achievements-->
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-4 " align="left">
                                <h4><b id="achievementsTitle"></b></h4>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-8 " align="left">
                                <h5 id="achievements"></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5 mb-5">
                    <div style="text-align:justify">
                        <p>${jsonArtist.artist.abstract}</p>
                    </div>
                </div>
        
            `
        );    

        $("#artistName").text(jsonArtist.artist.name);
        $("#currentAffiliation").text(jsonArtist.artist.currentAffiliattion);

        if(jsonArtist.artist.achivements.length>0){
            var text="";
            for(var i=0;i<jsonArtist.artist.achivements.length;i++){
                text=text+jsonArtist.artist.achivements[i];
            }
    
            $("#achievementsTitle").text("Achievements: ");
            $("#achievements").text(text);
        }
    
        if(jsonArtist.artist.isCompany==true){
            var members="";
            for(var i=0;i<jsonArtist.artist.companyMembers.length;i++){
                members=members+jsonArtist.artist.companyMembers[i];
            }
        
            $("#memebersTitle").text("Members: ");
            $("#members").text(members);
        }
       
    
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

