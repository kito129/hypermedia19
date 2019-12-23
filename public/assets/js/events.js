$(document).ready(function(){

	var jsonArtists;
	var jsonEvents;

	$.get("https://hypermedia19.herokuapp.com/event", function(data, status){

		jsonEvents=JSON.parse(data);

		$.get("https://hypermedia19.herokuapp.com/artist",function(data,status){

			jsonArtists=JSON.parse(data);

			console.log(jsonArtists.artists);

			//aggiungere  FORSE IL BOTTONE PER COMPRARE IL BIGLIETTO

			for(var i=0;i<jsonEvents.events.length;i++){

				var nameArtist;

				for(var j=0;j<jsonArtists.artists.length;j++){

					if(jsonArtists.artists[j]._id==jsonEvents.events[i].artistId){

						nameArtist=jsonArtists.artists[j].name;

					}
				};

				$("#events").append(
					
					`
					<div class="col-sm-12 col-md-6 col-lg-4">
						<a href="singleartist.html?id=${jsonEvents.events[i]._id}">  
							<img src="../../../${jsonEvents.events[i].photoGallery}"class="imagesArtist">                   
						</a> 
						<div>
							<h5><b>${jsonEvents.events[i].name}</b></h5>
						</div>
						<h7><i><b>${nameArtist}</b></i></h7>                          <br>
						<h7><i><b>${jsonEvents.events[i].type}</b></i></h7>        <br>
						<h7><i><b>${jsonEvents.events[i].date}</b></i></h7>
					</div>
					`

				);
			}
		});
	});
});