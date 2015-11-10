angular.module('ffrandom', [])

.controller('CharacterController', ['$scope', 'Characters', function($scope, Characters){
  $scope.chars = {test:'test'};
  $scope.getChars = function() {
    Characters.getChars().then(function(data){
      $scope.chars.characters = data.results.characters;
    })
  }
  $scope.getChars();
}])

.factory('Characters', function($http){
  var getChars = function (){
    var url = 'http://www.giantbomb.com/api/game/3030-8825/';
    return $http({
      method: 'jsonp',
      url: url,
      params: {
        format: 'jsonp',
        json_callback: 'JSON_CALLBACK',
        api_key : 'dcf0322756d855aeef3a2128fd06f4bd6d7b0366',
        field_list: 'characters'
      }
      // responseType: 'json'
    })
    .then(function(resp){
      console.log(resp.data);
      return resp.data;
    })
  }
  return {
    getChars : getChars
  }
})