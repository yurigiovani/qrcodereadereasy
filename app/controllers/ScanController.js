module.exports = function($scope, $location, ScanService, $http, $filter, configValue, routeInfo, $cordovaBarcodeScanner) {
	$scope.appName = $filter('uppercase')(configValue.appName);

	document.addEventListener("deviceready", function () {
		$cordovaBarcodeScanner
		.scan()
		.then(function(barcodeData) {
			ScanService.save(barcodeData);

			$location.path('history');

		}, function(error) {
			$location.path('history');
		});

	});

};