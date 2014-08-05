
var myApp=angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/welcome', {templateUrl: 'views/welcome.html',   controller: 'loginCtrl'}).
      when('/level/:levelId', {templateUrl: 'views/level.html', controller: 'levelCtrl'}).
      when('/gameover', {templateUrl: 'views/gameover.html', controller: 'gameoverCtrl'}).
      when('/gamefinish', {templateUrl: 'views/gamefinish.html', controller: 'gamefinishCtrl'}).
      otherwise({redirectTo: '/welcome'});
}]);




  /*---- DIRECTIVA QUE PINTA LAS CARTAS ----*/
myApp.directive('mpcartas', [function () {
    return {
      restrict: 'E',
      replace: true,
     // template: '<div id="{{usuario.id}}" class="carta" posicion="{{$index}}" ng-click="igual(usuario.id,$index,$event)"  ng-class="{\'selected\' : $index == $parent.posa|| $index == $parent.posb || $parent.inicio == true}" ><div class="front side"><img class="fcenter" ng-src={{usuario.img}} > <ul class="data"> <li class="name"><b>{{usuario.name}}</b></li><li class="surname"><b>Surname:{{usuario.surname}}</b></li><li class="job">{{usuario.job}}</li> <li class="city">{{usuario.city}}</li> </ul></div><div class="back side"><p>Click on me to resolve</p></div>'
        template: '<div id="{{usuario.id}}" class="carta" posicion="{{$index}}" ng-click="igual(usuario.id,$index,$event)" ng-class="{\'selected\' : $index == $parent.posa|| $index == $parent.posb || $parent.inicio == true}" >'+
        '<div class="front side"><img class="fcenter" ng-src={{usuario.img}} > <ul class="data"> <li class="name"><b>{{usuario.name}}</b></li><li class="surname"><b>Surname:{{usuario.surname}}</b></li><li class="job">{{usuario.job}}</li> <li class="city">{{usuario.city}}</li> </ul></div>'+
        '<div class="back side"><p>Click on me to resolve</p></div>'

    };
  }]);



