app.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authFactory', function($scope, $rootScope, $location, authFactory) {
	$scope.rememberMe = false;
	$scope.login = function() {
		$scope.loading = true;
		authFactory.login($scope.username, $scope.password, $scope.rememberMe)
		.then(function(res) {
			if(res.data.authed) {
				$scope.loading = false;
				$location.path("/dashboard")
			} 
		}, function(res) {
			// flash msg (res.errormessage) here
			console.log("failed to auth")
		});
	}
}])