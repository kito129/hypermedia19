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

    //ARTIST
    var idArtist=getUrlParameterValue(self.location.href,"id");
    var jsonArtist;

    $.get("https://hypermedia19.herokuapp.com/artist/"+idArtist, function(data, status){

        jsonArtist=JSON.parse(data);

        $("#artistName").text(jsonArtist.artist.name);

        //link for carousel
        $("#img1").append(
            `
            <img class="d-block w-100" src="../../../${jsonArtist.artist.photoGallery}">
            `
        );
        $("#img2").append(
            `
            <img class="d-block w-100" src="../../assets/images/private/artisti/Negramaro_2.jpeg">
            `
        );
        $("#img3").append(
            `
            <img class="d-block w-100" src="../../assets/images/private/artisti/cirquedusoleil2.jpg">
            `
        );

        //add info 
        $("#affiliationTitle").text("Current Affiliation: ")
        $("#currentAffiliation").text(jsonArtist.artist.currentAffiliattion);
        $("#abstract").text(jsonArtist.artist.abstract);

        //check for achivements 
        if(jsonArtist.artist.achivements.length>0){
            var text="";
            for(var i=0;i<jsonArtist.artist.achivements.length;i++){
                text=text+jsonArtist.artist.achivements[i]+"; ";
            }
    
            $("#achievementsTitle").text("Achievements: ");
            $("#achievements").text(text);
        }
        //check for Company member
        if(jsonArtist.artist.isCompany==true){
            var members="";
            for(var i=0;i<jsonArtist.artist.companyMembers.length;i++){
                members=members+jsonArtist.artist.companyMembers[i]+"; ";
            }
        
            $("#memebersTitle").text("Members: ");
            $("#members").text(members);
        }
    });


    //RELATIVE EVENT
    $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){

        var jsonEvents=JSON.parse(data);

        for(var i=0;i<jsonEvents.events.length;i++){
            if(jsonEvents.events[i].artistId==idArtist){
                $("#event").append(
                    `
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <a href="singleevent.html?id=${jsonEvents.events[i]._id}">  
                            <img src="../../../${jsonEvents.events[i].photoGallery}"class="imagesArtist">                   
                        </a> 
                        <div>
                            <h5><b>${jsonEvents.events[i].name}</b></h5>
                        </div>
                        <h7><i><b>${jsonEvents.events[i].date}</b></i></h7>
                    </div>
                    `

                    );
                $("#infoEvent").append(

                    //da finire il riferimento all'evento singolo e gestire bottone

                     `
                    <a class="name" href="singleevent.html"><b>${jsonEvents.events[i].name}</b></a><br> 
                    <a class="artista"><b>${jsonArtist.artist.name}</b></a><br>
                    <a class="date">Date: <b>${jsonEvents.events[i].date}</b></a><br>
                    <a class="place">Place: <b>${jsonEvents.events[i].place}</b></a><br>
                    <a class="price">Price: <b>${jsonEvents.events[i].price}</b></a><br>
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

    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
});

