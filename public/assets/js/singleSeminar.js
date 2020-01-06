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

    $.get("https://hypermedia19.herokuapp.com/seminar/"+idSeminar, function(data, status){

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
     $.get("https://hypermedia19.herokuapp.com/event", function(data, status){

        Events=JSON.parse(data);

        for (let h = 0; h < Events.events.length; h++) {

            var ev = Events.events[h];
            if(ev.relSeminar==Seminar.seminar._id){
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

        //relative same day events + seminars
        $.get("https://hypermedia19.herokuapp.com/event/", function(data, status){
                
            Events=JSON.parse(data);

                $.get("https://hypermedia19.herokuapp.com/seminar/", function(data, status){

                    Seminars=JSON.parse(data);
                    var iSem;
                    var test = false;

                    for(let i=0;i<Events.events.length;i++){

                        iSem = Events.events[i];
                        iEventDate= new Date (iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                            iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                            iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                            iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                            iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[1],0);
                        
                        if(thisSeminarDataAndHour.getFullYear() == iEventDate.getFullYear() 
                        && thisSeminarDataAndHour.getMonth() == iEventDate.getMonth()
                        && thisSeminarDataAndHour.getDate() == iEventDate.getDate()){

                            test=true;
                            $.get("https://hypermedia19.herokuapp.com/artist/"+Events.events[i].artistId, function(data, status){

                                Artist=JSON.parse(data);

                                $("#relSameDay").append(
                                    `
                                    <div class="col-sm-12 col-md-6 col-lg-4">
                                        <a href="singleevent.html?id=${Events.events[i]._id}">  
                                            <img src="../images/${Events.events[i].photoGallery[0].filename}"class="imagesArtist">                   
                                        </a> 
                                        <div>
                                            <h5><b>${Events.events[i].name}</b></h5>
                                        </div>
                                        <div>
                                            <h7><i><b>${Artist.artist.name}</b></i></h7>
                                        </div>
                                        <div>                         
                                            <h7><i><b>${Events.events[i].type}</b></i></h7>
                                        </div>
                                        <div>        
                                            <h7><i><b>${Events.events[i].date}</b></i></h7>
                                        </div>
                                    </div>
                                    `
                                );
                            });
                        }
                    }

                    if(test){
                        $("#sameTitle").text("RELATIVE SAME DAY");
                    }
                    var phSplit;
                    var phurl;
                    var iSeminarDate;

                        for(let j=0;j<Seminars.seminars.length;j++){
                            
                            iSem = Seminars.seminars[j];
                            iSeminarDate = new Date (iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[2],
                                iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[1],
                                iSem.date.split("-")[0].replace(/\s+/g, '').split("/")[0],
                                iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[0],
                                iSem.date.split("-")[1].replace(/\s+/g, '').split(".")[1],0);
                            
                            if(thisSeminarDataAndHour.getFullYear() == iSeminarDate.getFullYear() 
                            && thisSeminarDataAndHour.getMonth() == iSeminarDate.getMonth()
                            && thisSeminarDataAndHour.getDate() == iSeminarDate.getDate()
                            && iSem._id!=SeminarId){
                
                            phSplit= Seminars.seminars[j].photoGallery.split("\\");
                            phurl= phSplit[2]+ "\\"+phSplit[3];

                            $("#relSameDay").append(
                            `
                                <div class="col-sm-12 col-md-6 col-lg-4">
                                    <a href="singleseminar.html?id=${Seminars.seminars[j]._id}">         

                                        <img src="../${phurl}"class="imagesArtist">                   

                                    </a> 
                                    <div>
                                        <h5><b>${Seminars.seminars[j].name}</b></h5>
                                    </div>
                                    <h7><i><b>seminar</b></i></h7>        <br>
                                    <h7><i><b>${Seminars.seminars[j].date}</b></i></h7>
                                </div>
                                `
                            );
                        }
                    }
                });
            });
        });
    });

    //CAROUSEL
    $('.carousel').carousel({
        interval: 2000
    })
      
});