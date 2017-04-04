var app = angular.module('internships', ['ngRoute', 'ngMaterial', 'ngMessages', 'infinite-scroll']);
app.run(function($rootScope, $http, $location, authFactory) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        authFactory.checkAuth()
        	.then(function(res) {
        		if(!res.data.authed) {
        			$location.path("/");
        		} else if($location.$$path == "/") {
        				$location.path("/dashboard");
        		}
        	})
    });
});
app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
		.when("/", {
			templateUrl:"/partials/login.html",
			controller: "loginCtrl"
		})
		.when("/dashboard", {
			templateUrl:"/partials/dashboard.html",
			controller: "dashboardCtrl"
		})
        .when("/favorites", {
            templateUrl:"/partials/favorited.html",
            controller: "favoritedCtrl"
        })
		.otherwise({templateUrl:"/partials/error.html"})
})