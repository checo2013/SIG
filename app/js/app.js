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

  function mapCtrl($scope,$log){

    $log.log(geeServerDefs);

    for (var i = 0; i < geeServerDefs.layers.length; i++) {
        geeServerDefs.layers[i].initialState = true;
    }

    $scope.inegi = geeServerDefs;

    $scope.map = { center: { latitude: 23.84, longitude: -102.18 }, zoom: 5 };
    $scope.options = {scrollwheel: false};

    $scope.miUbicacion = function(){

      if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function (posicion){

              $log.log(posicion);

              $scope.$apply(function(){
                $scope.map.center.latitude = posicion.coords.latitude;
                $scope.map.center.longitude = posicion.coords.longitude;
                $scope.map.zoom = 15;

                $scope.marker.coords.latitude = posicion.coords.latitude;
                $scope.marker.coords.longitude = posicion.coords.longitude;
              });


          });
          
      }else{

        alert('tu navegador no es compatible para saber tu ubicacion');

      }
    }

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(marker);
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };


  }

})();