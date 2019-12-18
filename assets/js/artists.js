$(document).ready(function(){

	$.get("http://localhost:3000/artist", function(data, status){

		const jsonDataArtists= JSON.parse(data);

		for (var i =0;i<jsonDataArtists.lenght;i++){

			$("#performer").append(
<<<<<<< HEAD

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
=======
			`
			<div class="col-md-4 col-6 mb-4">   
				<a href="singleartist.html">  
					<img src="" class="imagesArtist">                   
				</a> 
				<div class="artista">
					<h5>
						<b>${jsonDataArtists[i].name}</b>
					</h5>
				</div>
				<h7 class="type"><i>
					<b>${jsonDataArtists[i].type}</b>
					</i>
				</h7>
			</div> 
			`
		);
>>>>>>> 71a1bdd6daeb79d5ac3bc1643d9329616f4dfe91
		}
	});
});