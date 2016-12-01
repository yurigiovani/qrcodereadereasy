module.exports = function($scope, ScanService, ActionsService, $http, $filter, configValue, routeInfo, $mdBottomSheet, $mdToast, $mdDialog, $cordovaInAppBrowser, $cordovaClipboard, $sce, $cordovaSocialSharing) {

	$scope.appName = $filter('uppercase')(configValue.appName);
	$scope.page = routeInfo.routeName;

	$scope.scans = ScanService.all();
	$scope.height = screen.height - 60 + "px";

	// ScanService.save({
	// 	"format": "QR_CODE",
	// 	"text": "BEGIN:VEVENT SUMMARY:My Event Name LOCATION:Event Location DTSTART:20110505T160000Z DTEND:20110505T170000Z END:VEVENT"
	// });

	$scope.showDetails = function(scan) {
		$scope.selected = scan;

		$mdBottomSheet.show({
			templateUrl: 'views/history/detail.html',
			scope: $scope,
			preserveScope: true
		})
		.then(function(clickedItem) {
			// console.log(clickedItem);
		});
	};

	$scope.deleteScan = function(scan, $event) {
		const 	confirm = $mdDialog.confirm()
							.title('Do you sure you want to delete the record ?')
							.textContent('It will not be possible to retrieve it later.')
							.ariaLabel('Lucky day')
							.targetEvent($event)
							.ok('Yes')
							.cancel('No');

		$mdDialog.show(confirm).then(function() {
			ScanService.delete(scan);
		}, function() {
		});
	};

	$scope.addEvent = function(scan) {
		let event = {
			title: ScanService.getContent(scan.text, 'SUMMARY'),
			startDate: ScanService.getContent(scan.text, 'DTSTART'),
			endDate: ScanService.getContent(scan.text, 'DTEND'),
			location: ScanService.getContent(scan.text, 'LOCATION')
		};

		ActionsService.addEvent(event);
	};

	$scope.callPhone = function(scan) {
		ActionsService.openInBrowser(scan.text);
	};

	$scope.sendEmail = function(scan) {
		ActionsService.openInBrowser(scan.text);
	};

	$scope.sendSMS = function(scan) {
		const contentSMS = scan.text.replace('smsto:', '').replace('SMS Content:', '').split(':');

		ActionsService.sms(contentSMS[0], contentSMS[1]);
	};

	$scope.searchWeb = function(scan, searchProduct) {
		let url = 'https://www.google.com/#q=' + scan.text

		if(searchProduct === true) {
			url += '&tbm=shop';
		}

		if(scan.type == 'Weblink') {
			url = scan.text;
		}

		$cordovaInAppBrowser.open(url, '_system', {
			location: 'yes',
			clearcache: 'yes'
		})
		.then(function(event) {
		})
		.catch(function(event) {
		});
	};

	$scope.showMap = function(scan) {
		ActionsService.show(scan.text); 
	};
	$scope.navigateTo = function(scan) {
		ActionsService.navigate(scan.text); 
	};

	$scope.copyClipboard = function(scan) {
		$cordovaClipboard
			.copy(scan.text)
			.then(function () {
				$mdToast.show(
		            $mdToast.simple()
		              .textContent(scan.text + ' copied')
		              .position('top')
		              .hideDelay(1500)
		          );
			}, function () {
				// error
			});
	};

	$scope.shareScan = function(scan) {
		const message = $filter('adjust')(scan.text, scan.type);

		$cordovaSocialSharing
			.share(message, null, null, null)
			.then(function(result) {
			}, function(err) {
			});
	};

	$scope.toTrusted = function(html_code) {
	    return $sce.trustAsHtml(html_code);
	}
};