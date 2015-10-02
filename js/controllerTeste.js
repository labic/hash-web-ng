var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', ['$scope', '$http',function ($scope, $http) {
	$http.get('../json/testeJson.json').success(function(data) {
		$scope.phones = data;
		$scope.phones = data.sort(function(a, b){return b-a});
		$scope.phones = data.splice(0, 5);
		
	});

	$scope.orderProp = 'age';
}]);