app.controller('favoritedCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location) {
	$scope.loading = true;
	var init = function() {
		$http.get('/internships/favoritedCards').then(function(res){
			if(res.data.errormessage) {
				console.log(res.data.errormessage);
			} else { 
				console.log("ehheree")
				console.log(res.data.favoritedCards);
				$scope.favoritedCards = res.data.favoritedCards
				$scope.favorited = res.data.favorited;
			}
		}
		)
	}
	init();
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
		console.log("index: " + $scope.favorited.indexOf(id))
		delete $scope.favorited[$scope.favorited.indexOf(id)]
	}
	$scope.goToDash = function() {
		$location.path("/dashboard")
	}
}])