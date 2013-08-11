var angularAppHome = angular.module('demo.home', []);

angularAppHome.controller('HomeCtrl', ['$scope', function($scope){
    $scope.title = "Angular File Uploader Demo";
}]);