$(document).ready(function(){

	$.get("https://hypermedia19.herokuapp.com/artist", function(data, status){

		var Artists=JSON.parse(data);

		for(var i=0;i<Artists.artists.length;i++){

			var  text= Artists.artists[i].photoGallery[0].filename;

			$("#performer").append(

				`
				<div class="col-sm-12 col-md-6 col-lg-4">
					<a href="singleArtist.html?id=${Artists.artists[i]._id}">  
						<img src="../images/${text}"class="imagesArtist">                   
					</a> 
					<div>
						<h5><b>${Artists.artists[i].name}</b></h5>
					</div>
					<h7><i><b>${Artists.artists[i].type}</b></i></h7>
				</div>
			
				`
			);
		}
	});
});

	