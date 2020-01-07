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
    var Seminar;
    var Event;
    var Events;
    var Seminars;
    var SeminarId;

    $.get("http://localhost:5000/seminar/"+idSeminar, function(data, status){

        Seminar=JSON.parse(data);   
        SeminarId = Seminar.seminar._id;

        let thisSeminarDataAndHour= new Date (Seminar.seminar.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                Seminar.seminar.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                Seminar.seminar.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                Seminar.seminar.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                Seminar.seminar.date.split("-")[1].replace(/\s+/g, '').split(".")[1],
                0);

        $("#seminarName").text(Seminar.seminar.name);

        var splitte= Seminar.seminar.photoGallery.split("\\");
        var url= splitte[2]+ "\\"+splitte[3];

        //link for carousel
        $("#semImage").append(
            `
            <img src="../${url}" class="img-fluid" alt="Responsive image">
            `
        );        
        //add info 
        $("#dateTitle").text("Date: ")
        $("#date").text(Seminar.seminar.date);
        $("#locationTitle").text("Location: ")
        $("#location").text(Seminar.seminar.place);
        
   

        //relative event
        $.get("http://localhost:5000/event", function(data, status){

            Events=JSON.parse(data);
            for (let h = 0; h < Events.events.length; h++) {
                var ev = Events.events[h];
                if(ev.relSeminar==Seminar.seminar._id){
                    $("#relEvent").append(
                        `
                        <div class="col-sm-12 col-md-6 col-lg-4">
                            <a href="singleEvent.html?id=${ev._id}">  
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
    });

    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
    })
      
});