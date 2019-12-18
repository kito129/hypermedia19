$(document).ready(function(){

	$.get("http://localhost:3000/artist", function(data, status){

		var jsonDataArtists=JSON.parse(data);
		console.log(jsonDataArtists);

		for (var i =0;i<jsonDataArtists.lenght;i++){

			$("#performer").append(

				`
				<div class="col-md-4 col-6 mb-4">   
					<a href="singleartist.html">  
						<img src="../images/private/artists/bolle.jpg" class="imagesArtist">                   
					</a> 
					<div class="artista"><h5><b>ROBERTO BOLLE</b></h5></div>
					<h7 class="type"><i><b>dancer</b></i></h7>
				</div> 
				
				`
			);
				




				








	
		}


	});

});