'use strict';
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$routeParams', '$http', 
  function($scope, $routeParams, $http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });
    $scope.orderProp = 'age';
}]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);
