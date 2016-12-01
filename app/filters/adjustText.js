module.exports = function() {
	return function(text, type) {

		let res = [];
		text = text.replace(/mailto:|tel:|smsto:|geo|SMS Content|MECARD:|BEGIN:VEVENT|END:VEVENT|,,+/g, "");

		if(type.toLowerCase() == 'calendar') {
			let iAux
			text = text.split(':');

			for(var i = 0; i < text.length; i++) {

				if(text[i].indexOf('SUMMARY') >= 0) {
					res.push(text[i + 1]);
				}
				if(text[i].indexOf('DTSTART') >= 0) {
					let dtStart = text[i + 1];
						dtStart = dtStart.substring(6, 8) + '/' + dtStart.substring(4, 6) + '/' + dtStart.substring(4, 0)

					res.push(dtStart);
				}
				if(text[i].indexOf('DTEND') >= 0) {
					let dtEnd = text[i + 1];
						dtEnd = dtEnd.substring(6, 8) + '/' + dtEnd.substring(4, 6) + '/' + dtEnd.substring(4, 0)

					res.push(dtEnd);
				}
				if(text[i].indexOf('LOCATION') >= 0) {
					res.push(text[i + 1]);
				}
			}

			text = res.join("<br>");
			text = text.replace(/LOCATION|DTSTART|DTEND+/g, "");
		}
		else if(type.toLowerCase() == 'sms') {
			text = text.split(':').join("<br>");
		}
		else if(type.toLowerCase() == 'contact') {
			text.split(';').forEach(function(row) {
				if(row.indexOf('N:') >= 0) {
					res.push(row.replace('N:', '').replace(',', ', '));
				}
				if(row.indexOf('TEL:') >= 0) {
					res.push(row.replace('TEL:', ''));
				}
				if(row.indexOf('EMAIL:') >= 0) {
					res.push(row.replace('EMAIL:', ''));
				}
			});

			text = res.join("<br>");
		}

		return text;
	};
};