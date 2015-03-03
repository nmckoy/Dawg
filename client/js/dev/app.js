(function() {// iffy

  var app = angular.module('barkpark', []);

  var MainCtrl = function($scope, $http, $log, Service) {
    $scope.global_message = 'dog parksss';
    
    $scope.parks = [];
    
    var getParks = function() {
      $log.info(Service.test);
      // $http.get("/js/json/parks.json")
      Service.getParks()
        .then(
          function(data){ //success
            // var s = JSON.parse(data);
            $log.info("data: " + JSON.parse(data));
            // $scope.parks = JSON.parse(data);
            // $log.info("json? " + $scope.parks);
          }, 
          function(reason) { //error
            $log.error = "couldnt get parks with data: " + reason;
            $scope.error = "couldnt get the parks";
          }
        );
    };
    // we should get all parks first
    getParks(); 
    

  };

  //service for http
  var Service = function($http, $log) {

    var getParks = function() {
      $log.info("getParks service method being called");
      return $http.get("/js/json/parks.json")
        .then(
          function(response) {
            return response.data;
          }
        );
    };

    var getDogs = function() {
      $log.info("getDogs service method being called");
      return $http.get("/js/json/dogs.json")
        .then(
          function(response) {
            return response.data;
          }
        );
    };

    return {
      getParks: getParks,
      getDogs: getDogs,
      test: "test"
    };

  };
  

  // registering controller and services with angular
  app.controller('MainCtrl', MainCtrl);
  app.factory('Service', Service);
  
}());