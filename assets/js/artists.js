$(document).ready(function(){

	$.get("http://localhost:3000/artist", function(data, status){

		
		//console.log(data.artists[0]);
		//console.log(data.artists[0].name);
		//const ciao = JSON.parse(data);

		const art= JSON.parse(data);

		art.artists.forEach(element => {
			console.log(element.name);
		});

		for (var i =0;i<jsonDataArtists.lenght;i++){

			$("#performer").append(

				`
				<div class="col-md-4 col-6 mb-4">   
					<a href="singleartist.html">  
						<img src="../../${jsonDataArtists[i].photoGallery}" class="imagesArtist">                   
					</a> 
					<div class="artista"><h5><b>${jsonDataArtists[i].name}</b></h5></div>
					<h7 class="type"><i><b>${jsonDataArtists[i].type}</b></i></h7>
				</div> 
				
				`
			);
		}
	});
});