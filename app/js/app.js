var angularApp = angular.module('AngularFileUploaderApp', ['demo.home']);

angularApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    }).otherwise({redirectTo : '/'});
}]);

