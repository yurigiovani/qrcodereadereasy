module.exports = function($mdToast, $filter) {
	const types = {
		calendar: {
			name: "Calendar",
			icon: "today"
		},
		contact: {
			name: "Contact",
			// icon: "account_box"
			icon: "contact_mail"
		},
		email: {
			name: "Email",
			icon: "email"
		},
		geo: {
			name: "Geo",
			icon: "location_on"
		},
		phone: {
			name: "Phone",
			icon: "phone"
		},
		product: {
			name: "Product",
			icon: "local_mall"
		},
		sms: {
			name: "Sms",
			// icon: "perm_phone_msg"
			// icon: "chat"
			// icon: "message"
			icon: "textsms"
		},
		weblink: {
			name: "Weblink",
			icon: "link"
		},
		wifi: {
			name: "Wifi",
			icon: "network_wifi"
		}
	};
	const records = angular.fromJson(localStorage.getItem('scans'));
	this.records = records || [];

	this._saveRecords = function() {
		localStorage.setItem('scans', angular.toJson(this.records));
	};

	this.all = function() {
		return this.records;
	};
	this.save = function(scan) {
		let message = 'Scan cancelled!';

		if(! scan.cancelled) {
			scan.type = this.getType(scan.text, 'name');
			scan.icon = this.getType(scan.text, 'icon');
			scan.date = new Date();

			this.records.push(scan);

			this._saveRecords();

			message = 'Scanned successfully!';
		}

		$mdToast.show(
		    $mdToast.simple()
		      .textContent(message)
		      .position('top')
		      .hideDelay(1500)
	  	);
	};

	this.delete = function(scan) {
		const index = this.records.indexOf(scan);
		let message = 'Could not delete the record.'

		if(index >= 0) {
			message = 'Scan deleted!';
			this.records.splice(index, 1);
			this._saveRecords();
		}

		$mdToast.show(
		    $mdToast.simple()
		      .textContent(message)
		      .position('top')
		      .hideDelay(1500)
	  	);
	};

	this.getContent = function(text, node, type) {
		text = text.replace(/BEGIN:EVENT|END:VEVENT+/g, "");

		var arr = text.split(':');
		let value = '';

		for(var i = 0; i < arr.length; i++) {
			if(arr[i].indexOf(node) >= 0) {
				value = arr[i + 1];

				if(i == arr.length) {
					value = arr[i];
				}
			}
		}

		value = value.replace(/SUMMARY|DTSTART|DTEND|LOCATION+/g, "").trim();

		return value;
	};

	this.getType = function(str, node) {
		str = str.toLowerCase()

		if(str.indexOf('begin:vevent') >= 0) {
			return types.calendar[node];
		}
		else if(str.indexOf('mecard:') >= 0 || str.indexOf('vcard:') >= 0) {
			return types.contact[node];
		}
		else if(str.indexOf('mailto:') >= 0) {
			return types.email[node];
		}
		else if(str.indexOf('geo:') >= 0) {
			return types.geo[node];
		}
		else if(str.indexOf('tel:') >= 0) {
			return types.phone[node];
		}
		else if(str.indexOf('smsto:') >= 0) {
			return types.sms[node];
		}
		else if(str.indexOf('wifi:') >= 0) {
			return types.wifi[node];
		}
		else {
			var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
			if(!regex .test(str)) {
				return types.product[node];
			} else {
				return types.weblink[node];
			}
		}
	};
};