module.exports = function($routeProvider) {

	$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			resolve: {
				routeInfo: function() {
					return {
						routeName: "Home",
						navClass: 'navbar-default'
					}
				}
			}
		})
		.when('/history', {
			templateUrl: "views/history/index.html",
			controller: "HistoryController",
			resolve: {
				routeInfo: function() {
					return {
						routeName: 'History list'
					}
				}
			}
		})
		.when('/scan', {
			templateUrl: "views/scan/index.html",
			controller: "ScanController",
			resolve: {
				routeInfo: function() {
					return {
						routeName: 'Scan'
					}
				}
			}
		});

	$routeProvider.otherwise({
		redirectTo: "/history"
	});

};