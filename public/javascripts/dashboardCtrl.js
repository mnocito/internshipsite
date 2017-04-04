app.controller('dashboardCtrl', ['$scope', '$rootScope', 'authFactory', '$location', '$http', function($scope, $rootScope, authFactory, $location, $http) {
	var init = function() {
		$http.get('/internships/favorited').then(function(res){
			if(res.data.errormessage) {
				console.log(res.data.errormessage);
			} else {
				$scope.favorited = res.data.favorited
			}
		})
	}
	init();
	var busy = false;
	var page = 1;
	$scope.internships = [];
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

	
	var searchInput = "";
	$scope.searchResults = [];
	$scope.search = function(){
		$scope.searchResults = [];
		for (var internship in $scope.internships){
			if($scope.internships[internship].description.search($scope.searchInput) != -1){
				console.log("found one")
				console.log($scope.internships[internship])
				$scope.searchResults.push($scope.internships[internship])
			}
		}
		$scope.searching = true;
		if($scope.internships.length == 0){
			document.getElementById("sorry").innerHTML = "Sorry we could not find what you were looking for, please try again";
		}
	}
	$scope.favorite = function(id) {
		$scope.favorited.push(id)
		$http.post("/internships/favorite", {
			id: id
		}).then(function(res) {
			if(res.data.favorited) {
				console.log("favorited successfully")
			}
		}, function(res) {

		})
	}
	$scope.unfavorite = function(id) {
		delete $scope.favorited[$scope.favorited.indexOf(id)]
	
		
	}
	$scope.myPagingFunction = function() {
		if(!busy) {
			busy = true;
			$http.post("/internships/getInternships", {
				page: page,
				amount: 1000
			}).then(function(res) {
				$scope.internships = $scope.internships.concat(res.data.internships);
				page++;
				busy = false;
			})
		} else {
			
		}
	}
}])