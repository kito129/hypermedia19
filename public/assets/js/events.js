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

					$("#events").append(
						`
						<div class="col-sm-12 col-md-6 col-lg-4 events">
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
								<h7><i><b>${Events.events[i].date}</b></i></h7>
							</div>
						</div>
						`
					);
				}
				//append seminar
				for(var k=0;k<Seminars.seminars.length;k++){
					var split= Seminars.seminars[k].photoGallery.split("\\");
					var url= split[2]+ "\\"+split[3];
					$("#events").append(
						`
						<div class="col-sm-12 col-md-6 col-lg-4 seminars">
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
			});
		});
	});
});


let evCout = false;
let seCout = false;

function changeStateEv() {
	if(evCout){
		evCout=false;
	} else {
		evCout=true;
	}
}

function changeStateSe() {
	if(seCout){
		seCout=false;
	} else {
		seCout=true;
	}
}



//filter
//EVENT
$( "#eventBtn" ).click (function() {
	
	changeStateEv();
	if(evCout){
		$('.seminars').hide();
	} else {
		$('.seminars').show();
	}
	
	

});
//TYpE
$( "#dropType" ).click(function() {

});
//DATA
$( "#dropData" ).click(function() {

});
//EVENT

//SEMINAR
$( "#seminarBtn" ).click(function() {
	
	changeStateSe();
	if(seCout){
		$('.events').hide();
	} else {
		$('.events').show();
	}

});


