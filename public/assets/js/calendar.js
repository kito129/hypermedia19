document.addEventListener('DOMContentLoaded', function() {
	
	var calendarEl = document.getElementById('calendar');

    $.get("http://localhost:5000/event", function(data, status){

	  Events=JSON.parse(data);

	  $.get("http://localhost:5000/seminar",function(data,status){

		Seminars=JSON.parse(data);

		var event=[];

		//populate event
		for(var i=0;i<Events.events.length;i++){
			var el = Events.events[i];
			var date=el.date;
			//get and format date
			var arr = date.split("-")[0].replace(/\s+/g, '').split("/");
			var hour = date.split("-")[1].replace(/\s+/g, '').split(".");
			var dateTxt = arr[2] + "-" + arr[1] + "-" +arr[0] + "T" +hour[0] + ":"+hour[1]+":00" ;
			//get and fromat color
			var type=el.type;
		
			var col;
			switch (type) {
				case "concert":
					col='red';
					break;
				case "theater":
					col="yellow";
					break;
				case "opera":
					col="#7AD7F0";
					break;
				case "dance":
					col="grey";
					break;
		
				default:
					break;
			}
			var text = {
				id: el._id,
				title: el.name,
				start: dateTxt,
				url:   '../pages/singleEvent.html?id='+ el._id,
				color: col
			};
			event.push(text);
		}

		//populate seminar
		for(var i=0;i<Seminars.seminars.length;i++){
			var el = Seminars.seminars[i];
			var date=el.date;
			var arr = date.split("-")[0].replace(/\s+/g, '').split("/");
			var hour = date.split("-")[1].replace(/\s+/g, '').split(".");
			var dateTxt = arr[2] + "-" + arr[1] + "-" +arr[0] + "T" +hour[0] + ":"+hour[1]+":00" ;
			var text = {
				id: el._id,
				title: el.name,
				start: dateTxt,
				url:   '../pages/singleSeminar.html?id='+ el._id,
				color: 'green'
			};
			event.push(text);
		}

		var calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [  'list','timeGrid' ],			
			views: {
				listDay: { buttonText: 'Day' },
				listWeek: { buttonText: 'Full' }
			},
			defaultView: 'listWeek',
			hiddenDays: [ 1, 2, 3 ],
			themeSystem: 'bootstrap',
			firstDay: 1,
			eventColor: '#378006',
			header: {
			left: 'listDay,listWeek',
			center: 'title',
			right: 'prev,next, today'
			},
			minTime: '13:00:00',
			maxTime: '23:59:59',
			defaultDate: '2020-06-12',
			navLinks: true, // can click day/week names to navigate views
			editable: false,
			eventLimit: true, // allow "more" link when too many events
			//compile here
			events: event
		});

		calendar.render();
		});
	});
});