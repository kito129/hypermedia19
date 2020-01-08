
$(document).ready(function(){
	
    $('#navbar').append(

        `
        <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark pl-5 navbarmy>
            <div class="navbar-header">
                <span>
                    <a class="navbar-brand" href="/index.html"><b>MBN2020</b></a>
                    <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation"> 
                        <span class="navbar-toggler-icon"></span> 
                    </button>
                </span>
            </div>
            <div class="collapse navbar-collapse" id="navbarItems">
                <ul class="navbar-nav ml-auto" id ="Btn">
                    <li class="nav-item dropdown" id="event">
                        <a class="nav-link dropdown-toggle" href="/assets/pages/events.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <h7><b>Events</b></h7>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/assets/pages/events.html?value=event"><b>Artistic Events</b></a>
                            <a class="dropdown-item" href="/assets/pages/events.html?value=seminar"><b>Seminars</b></a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/assets/pages/events.html"><b>All</b></a>
                        </div>
                    </li>				
                    <li class="nav-item"><a class="nav-link" id="artist" href="/assets/pages/artists.html"><h7><b>Artists</b></h7></a></li>
                    <li class="nav-item"><a class="nav-link" id="calendar" href="/assets/pages/calendar.html"><h7><b>Calendar</b></h7></a></li>
                    <li class="nav-item"><a class="nav-link" id="contact" href="/assets/pages/about.html"><h7><b>Contact Us</b></h7></a></li>
                    <li class="nav-item"><a class="nav-link"  id="info" href="/assets/pages/infoticket.html"><h7><b>Info T&S</b></h7></a></li>
                </ul>
            </div>
        </nav>
      `
	);
	
    $('#footer').append(

        `
        <footer class="footer pt-4 pt-md-2 border-top bg-dark  id="footer">
		<div class="container">
			<div class="row" align="center">
			  <div class="col-12 col-sm-12 col-md-4 col-lg-4">
				<h5>Features</h5>
				<ul class="list-unstyled text-small" id="dinPage">
				  <li><a class="text-muted" href="/assets/pages/events.html">Events</a></li>
				  <li><a class="text-muted" href="/assets/pages/artists.html">Artists</a></li>
				  <li><a class="text-muted" href="/assets/pages/calendar.html">Calendar</a></li>
				</ul>
			  </div>
			  <div class="col-12 col-sm-12 col-md-4 col-lg-4">
				<h5>About</h5>
				<ul class="list-unstyled text-small" id="statPage">
				  <li><a class="text-muted" href="/assets/pages/infoticket.html">Info Ticket and Shipping</a></li>
				  <li><a class="text-muted" href="/assets/pages/about.html">Contact and How to Reach Us</a></li>
				</ul>
			  </div>
			  <div class="col-12 col-sm-12 col-md-4 col-lg-4">
				<h5>Informations</h5>
				<ul class="list-unstyled text-small">
				  <li><a class="text-muted">area EXPO Milan (Italy)</a></li>
				  <li><a class="text-muted">tel: 899.999.999</a></li>
				  <li><a class="text-muted">email: info@milanbynight.com</a></li>
				</ul>
			  </div>
			</div>
			<div class="row" align="center">
				<div class="col-12">
					<a href="#">
						<img src="/assets/images/public/icons/logo.png" class="logo">
					</a>
					<p align="center">© 2020 <b>MILAN BY NIGHT</b></p>
				</div>
				<div class="col-12">
					<img src="/assets/images/public/icons/fb.png" class="icon">
					<img src="/assets/images/public/icons/insta.png" class="icon">
					<img src="/assets/images/public/icons/snap.png" class="icon">
					<img src="/assets/images/public/icons/twit.png" class="icon">
				</div>
				<div class="col-12">
					<p align="right" class="credit"><i>credit by<br>Marco Selva • Andrea Tresoldi • Simone Zani</i></p>
					<p align="right" class="credit"><i>#milanbynight</i></p>
				</div>
			</div>
		</div>	
      </footer>
      `
	);

	//utils check if logged
	if (localStorage.getItem("userId")==null || localStorage.getItem("token")==null) {
		//not authnticated
		localStorage.clear();
		$('#Btn').append(
			`
			<li class="nav-item" id ="registerBtn"><a class="nav-link signup" href="/assets/pages/registration.html"><h7><b>Sign Up</b></h7></a></li>
			<li class="nav-item" id ="logInBtn"><a class="nav-link login" href="/assets/pages/log.html"><h7><b>Log In</b></h7></a></li>
			`
		);
	} else {
		// authnticated
		$('#Btn').append(
			`
			<li class="nav-item" id ="cartBtn"><a class="nav-link cart" href="/assets/pages/cart.html"><h7><b>Cart</b></h7></a></li>
			<li class="nav-item" id ="logOutBtn"><a class="nav-link login"><h7><b>Log Out</b></h7></a></li>

			`
		);
	}

	//log out function
	$("#logOutBtn").on("click", function () {
		localStorage.clear();
		location.reload();
	});

	//append actie link 
	
	if(self.location.href.search("index")!=-1){

	} else {
		console.log("not in hom");
		var localPage = self.location.href.split("/")[5].split("?")[0];

		switch (localPage) {
			case "events.html":

				$("#event").removeClass('nav-item dropdown').addClass('nav-item dropdown active');
			
				break;
			case "singleEvent.html":

				$("#event").removeClass('nav-item dropdown').addClass('nav-item dropdown active');
			
				break;

			case "artists.html":

				$("#artist").removeClass('nav-link').addClass('nav-link active');
			
				break;
			case "singleSrtists.html":

				$("#artist").removeClass('nav-link').addClass('nav-link active');
			
				break;

			case "calendar.html":

				$("#calendar").removeClass('nav-link').addClass('nav-link active');
			
				break;
		
			case "about.html":

				$("#contact").removeClass('nav-link').addClass('nav-link active');
			
				break;
			case "infoticket.html":

				$("#info").removeClass('nav-link').addClass('nav-link active');
			
				break;
			case "calendar.html":

				$("#calendar").removeClass('nav-link').addClass('nav-link active');
			
				break;

			case "cart.html":

				$("#cart").removeClass('nav-link').addClass('nav-link active');
			
				break;
			default:
				break;
		}
	}
});