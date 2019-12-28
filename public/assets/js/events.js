//global varible
let evCount = true;
let seCount = true;
let danceCount = true;
let operaCount = true;
let concertCount = true;
let theaterCount = true;
let Count12 = true;
let Count13 = true;
let Count14 = true;

//get parameter from URL
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

//change state from true to false
function changeState(val) {
	if(val){
		val=false;
	} else {
		val=true;
	}
	return val;
}

//function by changing state if the button
//ARISTI AND SEMINAR
function eventBtn() {
	
	if(evCount){

		$('#eventBtn').removeClass('btn btn-primary').addClass('btn btn-primary disabled ');
		$('#danceBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled ');
		$('#concertBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled ');
		$('#theaterBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled ');
		$('#operaBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled ');
		/*
		$('#Btn1206').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		$('#Btn1306').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		$('#Btn1406').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		*/
		$('[type=dance]').hide();
		$('[type=concert]').hide();
		$('[type=theater]').hide();
		$('[type=opera]').hide();
		/*
		$('[date=12/06/2020]').hide();
		$('[date=13/06/2020]').hide();
		$('[date=14/06/2020]').hide();
		*/
		danceCount = false;
		operaCount = false;
		concertCount = false;
		theaterCount = false;
		
		Count12 = false;
		Count13 = false;
		Count14 = false;
		

	} else {
		$('#eventBtn').removeClass('btn btn-primary disabled').addClass('btn btn-primary');
		$('#eventBtn').removeClass('btn btn-danger disabled').addClass('btn btn-primary');
		$('#danceBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');
		$('#concertBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');
		$('#theaterBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');
		$('#operaBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');
		/*
		$('#Btn1206').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		$('#Btn1306').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		$('#Btn1406').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		*/
		$('[type=dance]').show();
		$('[type=concert]').show();
		$('[type=theater]').show();
		$('[type=opera]').show();
		/*
		$('[date=12/06/2020]').show();
		$('[date=13/06/2020]').show();
		$('[date=14/06/2020]').show();
		*/
		danceCount = true;
		operaCount = true;
		concertCount = true;
		theaterCount = true;
		
		Count12 = true;
		Count13 = true;
		Count14 = true;
		

	}
	evCount= changeState(evCount);
}

function seminarBtn() {

	if(seCount){
		$('#seminarBtn').removeClass('btn btn-secondary').addClass('btn btn-secondary disabled ');
		$('.seminars').hide();
	} else {
		$('#seminarBtn').removeClass('btn btn-secondary disabled').addClass('btn btn-secondary');
		$('.seminars').show();
	}
	seCount = changeState(seCount);
}

//TYPE
function danceBtn() {

	if(danceCount){
		$('#danceBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled ');
		$('[type=dance]').hide();
	} else {
		$('#danceBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');
		$('[type=dance]').show();
	}
	danceCount = changeState(danceCount);
}

function concertBtn() {

	if(concertCount){
		$('#concertBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
		$('[type=concert]').hide();
	} else {
		$('#concertBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
		$('[type=concert]').show();
	}
	concertCount = changeState(concertCount);
}

function theaterBtn() {

	if(theaterCount){
		$('#theaterBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
		$('[type=theater]').hide();
	} else {
		$('#theaterBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
		$('[type=theater]').show();
	}
	theaterCount = changeState(theaterCount);
}

function operaBtn() {

	if(operaCount){
		$('#operaBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
		$('[type=opera]').hide();
	} else {
		$('#operaBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
		$('[type=opera]').show();
	}
	
	operaCount = changeState(operaCount);
}

//DATA

//12/06
function Btn1206() {

	if(Count12){
		$('#Btn1206').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		$('[date=12062020]').hide();

	} else {
		$('#Btn1206').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		$('[date=12062020]').show();
	}
	Count12 = changeState(Count12);
}
//13/06
function Btn1306() {

	if(Count13){
		$('#Btn1306').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		$('[date=13062020]').hide();

	} else {
		$('#Btn1306').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		$('[date=13062020]').show();
	}
	Count13 = changeState(Count13);
}
//14/06
function Btn1406() {

	if(Count14){
		$('#Btn1406').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
		$('[date=14062020]').hide();

	} else {
		$('#Btn1406').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
		$('[date=14062020]').show();
	}
	Count14 = changeState(Count14);
}


//ready get data from API adn populate DOM
$(document).ready(function(){

	var Artists;
	var Events;
	var Seminars;

	$.get("https://hypermedia19.herokuapp.com/event", function(data, status){

		Events=JSON.parse(data);

		$.get("https://hypermedia19.herokuapp.com/artist",function(data,status){

			Artists=JSON.parse(data);

			$.get("https://hypermedia19.herokuapp.com/seminar",function(data,status){

				Seminars=JSON.parse(data);

				//append event
				for(var i=0;i<Events.events.length;i++){
					var nameArtist;
					for(var j=0;j<Artists.artists.length;j++){
						if(Artists.artists[j]._id==Events.events[i].artistId){
							nameArtist=Artists.artists[j].name;
						}
					};
					var arr = Events.events[i].date.split("-")[0].replace(/\s+/g, '').split("/");
					var dateTxt = arr[0] + arr[1] +arr[2];
					$("#events").append(
						`
						<div class="col-sm-12 col-md-6 col-lg-4 events" type="${Events.events[i].type}" date="${dateTxt}">
							<a href="singleevent.html?id=${Events.events[i]._id}">  
								<img src="../images/${Events.events[i].photoGallery[0].filename}"class="imagesArtist">                   
							</a> 
							<div>
								<h5><b>${Events.events[i].name}</b></h5>
							</div>
							<div>
								<h7><i><b>${nameArtist}</b></i></h7>
							</div>
							<div>
								<h7><i><b>${Events.events[i].type}</b></i></h7>    
							</div>  
							<div>
								<h7 class="date"><b>${Events.events[i].date}</b></h7>
							</div>
						</div>
						`
					);
				}
				
				//append seminar
				for(var k=0;k<Seminars.seminars.length;k++){
					var split= Seminars.seminars[k].photoGallery.split("\\");
					var url= split[2]+ "\\"+split[3];
					var arr = Seminars.seminars[k].date.split("-")[0].replace(/\s+/g, '').split("/");
					var dateTxt = arr[0] + arr[1] +arr[2];
					$("#events").append(
						`
						<div class="col-sm-12 col-md-6 col-lg-4 seminars" date="${dateTxt}">
							<a href="singleseminar.html?id=${Seminars.seminars[k]._id}">  
								<img src="../${url}"class="imagesArtist">                   
							</a> 
							<div>
								<h5><b>${Seminars.seminars[k].name}</b></h5>
							</div>
							<div>
								<h7><i><b>seminar</b></i></h7>
							</div>
							<div>
							<h7><i><b>${Seminars.seminars[k].date}</b></i></h7>
							</div>
						</div>
						`
					);
				}

				//check for initial filter
				var value=getUrlParameterValue(self.location.href,"value");
				
				if(value=="seminar"){
					eventBtn();
				} else if(value=="event"){
					seminarBtn();
				}

			});
		});
	});
});

//observe for update the DOM
let cEvent = false;
let cSeminar = false;
var observer = new MutationObserver(function(mutations, observer) {
	var ev = document.getElementsByClassName("events");
	var sem = document.getElementsByClassName("seminars");
	//check empty event
	for (let i = 0; i < ev.length; i++) {
		const evEl = ev[i];
		if(evEl.style.display==="none"){
			cEvent=true;
		} else {
			cEvent = false;
			break;
		}
	}
	//check empty seminar
	for (let k = 0; k < sem.length; k++) {
		const semEl = sem[k];
		if(semEl.style.display==="none"){
			cSeminar=true;
		} else {
			cSeminar = false;
			break;
		}
	}
	//check for no data
	if(cEvent && cSeminar){
		$("#events").append(
			`
			<div class="col-12 mt-5 mb-5" id="noData" align="center">
				<h3><i>No data..</i></h3>
			</div>
			`
		);
	} else {
		$("#noData").remove();
	}
});

//observe for update the DOM in all subTree
observer.observe(document, {
	subtree: true,
	attributes: true
  });

//filter button
//EVENT
$( "#eventBtn" ).click (function() {
	eventBtn();
});
//SEMINAR
$( "#seminarBtn" ).click(function() {
	seminarBtn();
});
//TODAY
$( "#todayBtn" ).click(function() {
	todayBtn();
});
//TYPE
$( "#concertBtn" ).click(function() {
	concertBtn();
});
$( "#theaterBtn" ).click(function() {
	theaterBtn();
});
$( "#operaBtn" ).click(function() {
	operaBtn();
});
$( "#danceBtn" ).click(function() {
	danceBtn();
});
//date
$( "#Btn1206" ).click(function() {
	Btn1206();
});
$( "#Btn1306" ).click(function() {
	Btn1306();
});
$( "#Btn1406" ).click(function() {
	Btn1406();
});



/*
$( document ).on("click",text,function() {
	console.log("ciao");
});

*/



