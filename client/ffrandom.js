angular.module('ffrandom', [])

.controller('CharacterController', ['$scope', 'Characters', function($scope, Characters){
  $scope.chars = {};
  $scope.random = {};
  // $scope.getChars = function() {
  //   Characters.getChars().then(function(data){
  //     $scope.chars.characters = data.results.characters;
  //   })
  // }
  $scope.randomChar = function() {
    $scope.random = $scope.chars.characters[Math.floor(Math.random() * ($scope.chars.characters.length))]
  }
  var obj = Characters.getChars();

  obj.then(function(response){
    console.log("this is the response object:", response);
    $scope.chars.characters = response.data.results.characters;
    console.log($scope.chars.characters);
  }).then(function(){
    $scope.randomChar()
  });

  // $scope.randomChar();
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
  }
  return {
    getChars : getChars
  }
})