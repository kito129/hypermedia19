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
        var photo1;
        var photo2;
        var photo3;
        

        photo1=jsonArtist.artist.photoGallery[0].filename;
        photo2=jsonArtist.artist.photoGallery[1].filename;
        photo3=jsonArtist.artist.photoGallery[2].filename;

        
        $("#artistName").text(jsonArtist.artist.name);

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
                }
            }
        });
    });
    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
      })
});

