app.controller('dashboardCtrl', ['$scope', '$rootScope', 'authFactory', '$location', '$http', function($scope, $rootScope, authFactory, $location, $http) {
	var busy = false;
	var page = 1;
	$scope.internships = [{
		description: "Seeking enthusiastic, creative, and hard-working individuals for the following positions: general counselors, certified swim instructos and life guards, sport specialists, performing arts specialists (music and theater), creative arts specialists, science and technology specialists.",
		companyType: "Toy shop tho"
	},
	{
		description: "Seeking enthusiastic, creative, and hard-working individuals for the following positions: general counselors, certified swim instructos and life guards, sport specialists, performing arts specialists (music and theater), creative arts specialists, science and technology specialists.",
		companyType: "Toy shop tho"
	},
	{
		description: "Seeking enthusiastic, creative, and hard-working individuals for the following positions: general counselors, certified swim instructos and life guards, sport specialists, performing arts specialists (music and theater), creative arts specialists, science and technology specialists.",
		companyType: "Toy shop tho"
	}]
	$scope.logout = function() {
		authFactory.logout()
			.then(function(res) {
				$location.path("/");
			}, function(res) {
				// flash here: failed to log out.
			})
	}
	$scope.goToSaved = function() {
		$location.path("/favorites")
	}
	$scope.favorite = function(id) {
		$http.post("/internships/favorite", {
			id: id
		}).then(function(res) {

		}, function(res) {

		})
	}
	$scope.myPagingFunction = function() {
		if(!busy) {
			busy = true;
			$http.post("/internships/getInternships", {
				page: page,
				amount: 5
			}).then(function(res) {
				console.log(res.data.internships)
				$scope.internships = $scope.internships.concat(res.data.internships);
				page++;
				busy = false;
			})
		} else {
			
		}
	}
}])