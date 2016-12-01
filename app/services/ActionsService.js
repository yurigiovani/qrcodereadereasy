module.exports = function($cordovaAppAvailability, $cordovaInAppBrowser) {
	this.adjustDate = function(date) {
		let str = date.match(/^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/),
			type = 0;

		if(!str) {
			str = date.match(/^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])T(\d{6}|\d{7})Z$/);
			type = 1;
		}

		if (str) {
			if(type == 0) {
				str[0] = new Date (+str[1], +str[2] - 1, +str[3]);
			}
			else {
				var horario = str[4];

				str[0] = new Date (+str[1], +str[2] - 1, +str[3], horario.substring(0, 2), horario.substring(2, 4), 00);
			}

			if (str[0].getMonth() === +str[2] - 1) {
				return str[0];
			}
        }
	};
	this.addEvent = function(event) {
		event.startDate = this.adjustDate(event.startDate);
		event.endDate = this.adjustDate(event.endDate);

		// this.openInBrowser('https://www.google.com/calendar/render?action=TEMPLATE&text=' + event.title + '&dates=' + event.startDate + '/' + event.endDate + '&details=&location=' + event.location + '&sf=true&output=xml');

		if(window.plugins != undefined && window.plugins.calendar != undefined) {
			window.plugins.calendar.createEventInteractively(event.title, event.location, '', event.startDate, event.endDate, {}, function() {
			}, function(err) {
			});
		}
	};

	this.show = function(coordinates) {
		const 	latLong = coordinates.substring(4),
				url = coordinates + "?q=" + latLong;

    	this.openInBrowser(url);
	};

	this.navigate = function(coordinates) {
		const 	latLong = coordinates.substring(4),
				url = "google.navigation:q=" + latLong + "&mode=d";

    	this.openInBrowser(url);
	};

	this.sms = function(phone, content) {
		const url = "sms:" + phone + "?body=" + content;

		this.openInBrowser(url);
	};

	this.openInBrowser = function(url) {
		$cordovaInAppBrowser.open(url, '_system', {
    		location: 'no',
    		clearcache: 'yes'
    	})
    	.then(function(event) {
    		alert('Success');
    		alert(JSON.stringify(event));
    	})
    	.catch(function(event) {
    		alert('Error');
    		alert(JSON.stringify(event));
    	});
	};
};