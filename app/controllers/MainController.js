module.exports = function($scope, $http, $filter, configValue, routeInfo) {

	$scope.appName = $filter('uppercase')(configValue.appName);
	$scope.page = routeInfo.routeName;
	$scope.navClass = routeInfo.navClass;
}