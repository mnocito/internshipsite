app.controller('savedCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	$scope.loading = true;
	$http.get("/internships/favorited")
		.then(function(res) {
			console.log("data: ")
		}, function(res) {

		})
}])