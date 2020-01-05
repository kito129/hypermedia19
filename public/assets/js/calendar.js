document.addEventListener('DOMContentLoaded', function() {
	
	var calendarEl = document.getElementById('calendar');

    $.get("https://hypermedia19.herokuapp.com/event", function(data, status){

	  Events=JSON.parse(data);

	  $.get("https://hypermedia19.herokuapp.com/seminar",function(data,status){

		Seminars=JSON.parse(data);

		var event=[];

		//populate event
		for(var i=0;i<Events.events.length;i++){
			var el = Events.events[i];
			var date=el.date;
			var arr = date.split("-")[0].replace(/\s+/g, '').split("/");
			var hour = date.split("-")[1].replace(/\s+/g, '').split(".");
			var dateTxt = arr[2] + "-" + arr[1] + "-" +arr[0] + "T" +hour[0] + ":"+hour[1]+":00" ;
			var text = {
				id: el._id,
				title: el.name,
				start: dateTxt,
				url:   '../pages/singleevent.html?id='+ el._id,
				color: 'red'
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
				url:   '../pages/singleseminar.html?id='+ el._id,
				color: 'green'
			};
			event.push(text);
		}

		var calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [  'list','timeGrid' ],			
			views: {
				listDay: { buttonText: 'list day' },
				listWeek: { buttonText: 'list week' }
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