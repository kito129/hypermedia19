$(document).ready(function(){

	$.get("http://localhost:3000/artist", function(data, status){

		var jsonDataArtists=JSON.parse(data);
		console.log(jsonDataArtists);


	});

});