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

    var idSeminar=getUrlParameterValue(self.location.href,"id");
    var jsonSeminar;
    

    $.get("https://hypermedia19.herokuapp.com/seminar/"+idSeminar, function(data, status){

        jsonSeminar=JSON.parse(data);        

        $("#seminarName").text(jsonSeminar.seminar.name);

        var splitte= jsonSeminar.seminar.photoGallery.split("\\");
        var url= splitte[2]+ "\\"+splitte[3];

        //link for carousel
        $("#semImage").append(
            `
            <img src="../${url}" class="img-fluid" alt="Responsive image">
            `
        );        
        //add info 
        $("#dateTitle").text("Date: ")
        $("#date").text(jsonSeminar.seminar.date);
        $("#locationTitle").text("Location: ")
        $("#location").text(jsonSeminar.seminar.place);
        
    });

     //evento relativo
     $.get("https://hypermedia19.herokuapp.com/event", function(data, status){

        var jsonEvents=JSON.parse(data);

        for (let h = 0; h < jsonEvents.events.length; h++) {
            var ev = jsonEvents.events[h];

            if(ev.relSeminar==jsonSeminar.seminar._id){
                $("#relEvent").append(
                    `
                    <div class="col-sm-12 col-md-6 col-lg-4">
                        <a href="singleevent.html?id=${ev._id}">  
                            <img src="../images/${ev.photoGallery[0].filename}"class="imagesArtist">                   
                        </a> 
                        <div>
                            <h5><b>${ev.name}</b></h5>
                        </div>
                        <div>
                            <h7><i><b>${ev.date}</b></i></h7>
                        </div>
                    </div>
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