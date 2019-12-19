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

    var id=getUrlParameterValue(self.location.href,"id");
    $.get("http://hypermedia19.herokuapp.com/artist/"+id, function(data, status){

        var jsonArtist=JSON.parse(data);
        console.log(jsonArtist);

        $("#singoloArtista").append(

            `
            <div align="center" class="singoloArtista">
                <img src="../../../${jsonArtist.photoGallery}" class="imageSingleArtist">
            </div>

             `
            );











        /*
        for(var i=0;i<jsonArtists.artists.length;i++){

            $("#performer").append(

                `
                <div class="col-md-4 col-6 mb-4">   
                    <a href="singleartist.html?id=${jsonArtists.artists[i]._id}">  
                        <img src="../../${jsonArtists.artists[i].photoGallery}"class="imagesArtist">                   
                    </a> 
                    <div class="artista"><h5><b>${jsonArtists.artists[i].name}</b></h5></div>
                    <h7 class="type"><i><b>${jsonArtists.artists[i].type}</b></i></h7>
                </div> 


                `
                );
        }
        */
    });


});

