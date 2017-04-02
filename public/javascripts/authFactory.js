app.factory('authFactory', ['$http', function($http) {

    var urlBase = '/auth/';
    var authFactory = {};
    authFactory.checkAuth = function() {
    	return $http.post(urlBase + "authed")
    }
    authFactory.login = function(user, pass, rememberMe) {
    	return $http.post(urlBase + "login", {
    		username: user,
    		password: pass,
    		rememberMe: rememberMe
    	})
    }
    authFactory.logout = function() {
    	return $http.post(urlBase + "logout")
    }
    return authFactory;
}])