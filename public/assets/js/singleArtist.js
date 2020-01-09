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
        $("#currentAffiliation").text(Artist.artist.currentAffiliattion);
        $("#abstract").text(Artist.artist.abstract);
        $("#typeTitle").text("Type: ")
        $("#type").text(Artist.artist.type);

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
                var el = Events.events[i];
                for (let k = 0; k < el.artistId.length; k++) {
                    const element =  el.artistId[k];
                    if (element==idArtist) {
                        $("#event").append(
                            `
                            <div class="col-sm-12 col-md-6 col-lg-4">
                                <a href="singleEvent.html?id=${el._id}">  
                                    <img src="../images/${el.photoGallery[0].filename}"class="imagesArtist">                   
                                </a> 
                                <div>
                                    <h5><b>${el.name}</b></h5>
                                </div>
                                <h7><i><b>${el.date}</b></i></h7>
                            </div>
                            `
                        );
                    }
                }
            }
        });
    });
    
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
});

