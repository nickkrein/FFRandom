angular.module('ffrandom', [])

.controller('CharacterController', ['$scope', 'Characters', function($scope, Characters){
  $scope.chars = {};
  $scope.randomFirst = {};
  $scope.randomSecond = {};
  // $scope.getChars = function() {
  //   Characters.getChars().then(function(data){
  //     $scope.chars.characters = data.results.characters;
  //   })
  // }
  $scope.randomChar = function() {
    $scope.randomFirst = $scope.chars.characters[Math.floor(Math.random() * ($scope.chars.characters.length))]
  }
  $scope.randomInfo = function(response) {
    $scope.randomSecond = response.data.results;
  }
  // var obj = Characters.getChars();

  $scope.getChars = function(){
    Characters.getChars().then(function(response){
      $scope.chars.characters = response.data.results.characters;
      return $scope.chars;
    }).then(function(response){
      // console.log(response)
      $scope.randomChar()
      return $scope.randomFirst;
    }).then(function(response){
      // console.log(response)
      return Characters.charInfo($scope.randomFirst.api_detail_url)
    }).then(function(response){
      $scope.randomInfo(response);
      // console.log($scope.randomSecond)
    });
  }
  $scope.getChars()
}])

.factory('Characters', function($http){
  var getChars = function (){
    var url = 'http://www.giantbomb.com/api/game/3030-13053/';
    return $http({
      method: 'jsonp',
      url: url,
      params: {
        format: 'jsonp',
        json_callback: 'JSON_CALLBACK',
        api_key : 'dcf0322756d855aeef3a2128fd06f4bd6d7b0366',
        field_list: 'characters'
      }
    })
  }
  var charInfo = function(charUrl) {
    return $http({
      method: 'jsonp',
      url: charUrl,
      params: {
        format: 'jsonp',
        json_callback: 'JSON_CALLBACK',
        api_key: 'dcf0322756d855aeef3a2128fd06f4bd6d7b0366'
      }
    })
  }
  return {
    getChars : getChars,
    charInfo : charInfo
  }
})