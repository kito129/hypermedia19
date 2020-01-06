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
    //global
    var Artist;
    var Events;

    $.get("https://hypermedia19.herokuapp.com/artist/"+idArtist, function(data, status){

        Artist=JSON.parse(data);
        var photo1=Artist.artist.photoGallery[0].filename;
        var photo2=Artist.artist.photoGallery[1].filename;
        var photo3=Artist.artist.photoGallery[2].filename;

        //add name
        $("#artistName").text(Artist.artist.name);
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
        $("#affiliationTitle").text("Current Affiliation: ")
<<<<<<< HEAD
        $("#currentAffiliation").text(jsonArtist.artist.currentAffiliattion);
        $("#abstract").text(jsonArtist.artist.abstract);
        $("#typeTitle").text("Type: ")
        $("#type").text(jsonArtist.artist.type);
=======
        $("#currentAffiliation").text(Artist.artist.currentAffiliattion);
        $("#abstract").text(Artist.artist.abstract);
>>>>>>> cf3f980ffddb6bd97f8f03587afe1983f30f5d53

        //check for achivements 
        if(Artist.artist.achivements.length>0){
            var text="";
            for(var i=0;i<Artist.artist.achivements.length;i++){
                text=text+Artist.artist.achivements[i]+"; ";
            }
    
            $("#achievementsTitle").text("Achievements: ");
            $("#achievements").text(text);
        }
        //check for Company member
        if(Artist.artist.isCompany==true){
            var members="";
            for(var i=0;i<Artist.artist.companyMembers.length;i++){
                members=members+Artist.artist.companyMembers[i]+"; ";
            }
            $("#memebersTitle").text("Members: ");
            $("#members").text(members);
        }


        //RELATIVE EVENT
        $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){

            Events=JSON.parse(data);

            for(var i=0;i<Events.events.length;i++){
                if(Events.events[i].artistId==idArtist){
                    $("#event").append(
                        `
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <a href="singleevent.html?id=${Events.events[i]._id}">  
                                <img src="../images/${Events.events[i].photoGallery[0].filename}"class="imagesArtist">                   
                            </a> 
                            <div>
                                <h5><b>${Events.events[i].name}</b></h5>
                            </div>
                            <h7><i><b>${Events.events[i].date}</b></i></h7>
                        </div>
                        `
                    );
                }
            }
        });
    });
    
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
});

