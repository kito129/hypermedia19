$(document).ready(function(){

	$.get("https://hypermedia19.herokuapp.com/artist", function(data, status){

		var jsonArtists=JSON.parse(data);

		for(var i=0;i<jsonArtists.artists.length;i++){

			var  text= jsonArtists.artists[i].photoGallery[0].filename;

			$("#performer").append(

				`
				<div class="col-sm-12 col-md-6 col-lg-4">
					<a href="singleartist.html?id=${jsonArtists.artists[i]._id}">  
						<img src="../images/${text}"class="imagesArtist">                   
					</a> 
					<div>
						<h5><b>${jsonArtists.artists[i].name}</b></h5>
					</div>
					<h7><i><b>${jsonArtists.artists[i].type}</b></i></h7>
				</div>
			
				`
			);
		}
	});
});

	