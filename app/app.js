require('angular');
require('angular-route');
require('angular-material');
require('ng-cordova');
require('./locale/angular-locale_pt-br');

const 	configValue 					= 	require('./config/configValue'),
		configConstant 					= 	require('./config/configConstant'),
		routeConfig 					= 	require('./config/routeConfig'),
		filterAdjustText				= 	require('./filters/adjustText'),
		ScanService						=	require('./services/ScanService'),
		ActionsService						=	require('./services/ActionsService'),
		HistoryController 				= 	require('./controllers/HistoryController'),
		MainController 					= 	require('./controllers/MainController'),
		ScanController 					= 	require('./controllers/ScanController');

angular.module('app', ['ngRoute', 'ngCordova', 'ngMaterial'])
	   .config(function($mdThemingProvider) {
	   		// $mdThemingProvider.theme('default').backgroundPalette('blue-grey');
	   });

angular.module('app')
		.value('configValue', configValue);

angular.module('app')
		.config(['$routeProvider', routeConfig]);

angular.module('app')
		.service('ScanService', ['$mdToast', '$mdDialog', '$filter', ScanService])
		.service('ActionsService', ['$cordovaAppAvailability', '$cordovaInAppBrowser', ActionsService]);

angular.module('app')
		.controller('HistoryController', ['$scope', 'ScanService', 'ActionsService', '$http', '$filter', 'configValue', 'routeInfo', '$mdBottomSheet', '$mdToast', '$mdDialog', '$cordovaInAppBrowser', '$cordovaClipboard', '$sce', '$cordovaSocialSharing', HistoryController])
		.controller('MainController', ['$scope', '$http', '$filter', 'configValue', 'routeInfo', MainController])
		.controller('ScanController', ['$scope', '$location', 'ScanService', '$http', '$filter', 'configValue', 'routeInfo', '$cordovaBarcodeScanner', ScanController]);

angular.module('app')
		.filter('adjust', filterAdjustText);