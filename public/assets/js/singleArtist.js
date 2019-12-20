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
    $.get("https://hypermedia19.herokuapp.com/artist/"+id, function(data, status){

        var jsonArtist=JSON.parse(data);
        console.log(jsonArtist.artist);

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
        /*

        for(var i=0;i<jsonArtist.artist.achievements.lenght();i++){

            $("#singleEvent").append(

                `<a class="achievements">Achievements: <b>${jsonArtist.artist.achievements[i]+"/ "}</b></a><br>`
            );
        }
        */

        $("#singleEvent").append(

            ciaooo

             `
            <a class="currentAffiliation">Current Affiliation: <b>${jsonArtist.artist.currentAffiliation}</b></a><br>
            <a class="date">Company Members: <b>-</b></a><br>
            <div style="text-align:justify" class="paragrafofullpage">
                <p class="descrizione"><b>${jsonArtist.artist.abstract}</b></p>
            </div>


              `
            );

    












        











    });


});

