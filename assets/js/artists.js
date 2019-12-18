$(document).ready(function(){

	$.get("http://localhost:3000/artist", function(data, status){

		
		//console.log(data.artists[0]);
		//console.log(data.artists[0].name);
		//const ciao = JSON.parse(data);

		const art= JSON.parse(data);

		art.artists.forEach(element => {
			console.log(element.name);
		});


	});

});