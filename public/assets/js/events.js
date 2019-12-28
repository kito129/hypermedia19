// ------  UTIL SECTION ------- 

//global varible
let counter = [];
for (let o = 0; o < 8; o++) {
	counter.push(false);
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

//ON/OFF FUNCITON FILTER
function onSeminar() {
	$('#seminarBtn').removeClass('btn btn-secondary disabled').addClass('btn btn-secondary');
	$('.seminars').show();
}
function offSeminar() {
	$('#seminarBtn').removeClass('btn btn-secondary').addClass('btn btn-secondary disabled ');
	$('.seminars').hide();
}
//TYPE
function onDance() {
	$('#danceBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
	$('[type="dance"]').show();
}
function offDance() {
	$('#danceBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
	$('[type="dance"]').hide();
}
function onConcert() {
	$('#concertBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
	$('[type=concert]').show();
}
function offConcert() {
	$('#concertBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
	$('[type=concert]').hide();
}
function onTheater() {
	$('#theaterBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
	$('[type=theater]').show();
}
function offTheater() {
	$('#theaterBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
	$('[type=theater]').hide();
}
function onOpera() {
	$('#operaBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
	$('[type=opera]').show();
}
function offOpera() {
	$('#operaBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
	$('[type=opera]').hide();
}
//DATE
function on1206() {
	$('#Btn1206').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
	$('[date=12062020]').show();
}
function off1206() {
	$('#Btn1206').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
	$('[date=12062020]').hide();
}
function on1306() {
	$('#Btn1306').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
	$('[date=13062020]').show();
}
function off1306() {
	$('#Btn1306').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
	$('[date=13062020]').hide();
}
function on1406() {
	$('#Btn1406').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
	$('[date=14062020]').show();
}
function off1406() {
	$('#Btn1406').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
	$('[date=14062020]').hide();
}
function onToday() {
	console.log("today: ");
	console.log(counter);
}
function offToday() {
	console.log("today: ");
	console.log(counter);
}

//BUTTON FUNCTION
function seminarBtn() {
	counter[0] = updateFilter(0);
}
//TYPE
function danceBtn() {
	counter[1] = updateFilter(1);
}
function concertBtn() {
	counter[2] = updateFilter(2);
}
function theaterBtn() {
	counter[3] = updateFilter(3);	
}
function operaBtn() {
	counter[4] = updateFilter(4);
}
//DATA
function Btn1206() {
	counter[5] = updateFilter(5);
}
function Btn1306() {
	counter[6] = updateFilter(6);
}

function Btn1406() {
	counter[7] = updateFilter(7);
}

function todayBtn() {
	counter[8] = updateFilter(8);
}
//function update filter
function updateFilter(params) {

	counter[params] = changeState(counter[params]);
		switch (params) {
			//seminar
			case 0:
				if(counter[params]){
					offSeminar();
				}else {
					onSeminar();
				}
				break;
			//dance
			case 1:
				if(counter[params]){
					offDance();
				}else {
					onDance();
				}
			break;
			//concert
			case 2:
				if(counter[params]){
					offConcert();
				}else {
					onConcert();
				}
			break;
			//theater
			case 3:
				if(counter[params]){
					offTheater();
				}else {
					onTheater();
				}
			break;
			//opera
			case 4:
				if(counter[params]){
					offOpera();
				}else {
					onOpera();
				}			
			break;
			//12/06
			case 5:
				if(counter[params]){
					off1206();
				}else {
					on1206();
				}
			break;
			//13/06
			case 6:
				if(counter[params]){
					off1306();
				}else {
					on1306();
				}
			break;
			//14/06
			case 7:
				if(counter[params]){
					off1406();
				}else {
					on1406();
				}
			break;
			//today
			case 8:
				if(counter[params]){
					onToday();
				}else {
					offToday();
				}
			break;
			}
	
	return counter[params];
}


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



// ------  MAIN SECTION ------- 
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
						<div class="col-sm-12 col-md-6 col-lg-4 events " type="${Events.events[i].type}" date="${dateTxt}" >
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
					onSeminar();
				} else if(value=="event"){
					offSeminar();
				}

			});
		});
	});
});

// ------  EVENT SECTION ------- 

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
$( "#todayBtn" ).click(function() {
	todayBtn();
});

// ------  OBSERVER SECTION ------- 

//global varible
let obs = [];
for (let o = 0; o < 9; o++) {
	obs.push(false);
}
//function for check if exist elemt end update array obs

function checkEmpty(params,index) {
	//check empty event
	for (let i = 0; i < params.length; i++) {
		const el = params[i];
		if(el.style.display==="none"){
			obs[index]=true;
		} else {
			obs[index] = false;
			break;
		}
	}
}

//observe for update the DOM
var observer = new MutationObserver(function(mutations, observer) {

	//get reference for the html objext
	var ev = document.getElementsByClassName("events");
	var sem = document.getElementsByClassName("seminars");
	var dance = $('[type="dance"]');
	var concert = $('[type=concert]');
	var theater = $('[type=theater]');
	var opera = $('[type=opera]');
	var d12 = $('[date=12062020]');
	var d13 = $('[date=13062020]');
	var d14 = $('[date=14062020]');
	//check if elemt is present
	checkEmpty(ev,0);
	checkEmpty(sem,1);
	checkEmpty(dance,2);
	checkEmpty(concert,3);
	checkEmpty(theater,4);
	checkEmpty(opera,5);
	checkEmpty(d12,6);
	checkEmpty(d13,7);
	checkEmpty(d14,8);
	//update button state
	for (let z = 0; z < counter.length; z++) {

		if(counter[z]!=obs[z+1]){
			switch (z) {
				//seminar
				case 0:
					if(obs[z+1]){
						$('#seminarBtn').removeClass('btn btn-secondary').addClass('btn btn-secondary disabled');		
					} else {
						$('#seminarBtn').removeClass('btn btn-secondary disabled').addClass('btn btn-secondary');		
					}
				break;
				//dance
				case 1:
					if(obs[z+1]){
						$('#danceBtn').removeClass('btn btn-danger').addClass('btn btn-danger disabled');			
					} else {
						$('#danceBtn').removeClass('btn btn-danger disabled').addClass('btn btn-danger');		
					}
				break;
				//concert
				case 2:
					if(obs[z+1]){
						$('#concertBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');			
					} else { 
						$('#concertBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');			
					}
				break;
				//theater
				case 3:
					if(obs[z+1]){
						$('#theaterBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
					} else {
						$('#theaterBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
					}
				break;
				//opera
				case 4:
					if(obs[z+1]){
						$('#operaBtn').removeClass('btn btn-danger m-1').addClass('btn btn-danger disabled m-1');
					} else {
						$('#operaBtn').removeClass('btn btn-danger disabled m-1').addClass('btn btn-danger m-1');
					}
				break;
				//12/06
				case 5:
					if(obs[z+1]){
						$('#Btn1206').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');			
					} else {
						$('#Btn1206').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
					}
				break;
				//13/06
				case 6:
					if(obs[z+1]){
						$('#Btn1306').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');			
					} else {
						$('#Btn1306').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
					}
				break;
				//14/06
				case 7:
					if(obs[z+1]){
						$('#Btn1406').removeClass('btn btn-success m-1').addClass('btn btn-success disabled m-1');
					} else {
						$('#Btn1406').removeClass('btn btn-success disabled m-1').addClass('btn btn-success m-1');
					}
				break;
			}
		}
	}
	//check for no data
	if(obs[0] && obs[1]){

		if($("#noData").length==0){
			$("#events").append(
				`
				<div class="col-12 mt-5 mb-5" id="noData" align="center">
					<h3><i>No data..</i></h3>
				</div>
				`
			);
		}
	} else {
		$("#noData").remove();	
	}
	//update button status
	counter[0]=obs[1];
	counter[1]=obs[2];
	counter[2]=obs[3];
	counter[3]=obs[4];
	counter[4]=obs[5];
	counter[5]=obs[6];
	counter[6]=obs[7];
	counter[7]=obs[8];
});

//observe for update the DOM in all subTree
observer.observe(document, {
	subtree: true,
	attributes: true
  });



  


