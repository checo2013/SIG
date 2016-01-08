(function(){
  'use strict';

  angular.module('app',['uiGmapgoogle-maps'])
         .config(config)
         .controller('mapCtrl',mapCtrl);

  function config(uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
        mx: true,
        language:'es'
    });
      
  };

  function mapCtrl($scope,$rootScope){
    
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (posicion){

            $rootScope.localidad = posicion;
            console.log($rootScope.localidad);

        });
        
    };


    $scope.map = { center: { latitude: 23.84, longitude: -102.18 }, zoom: 5 };
  }

})();