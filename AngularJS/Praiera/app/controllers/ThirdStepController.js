'use strict';
app.controller('ThirdStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'cartService', 'productsService', 'growl',
    function ($scope, $location, $filter, $uibModal, $document, mainService, cartService, productsService, growl) {
        $scope.title = 'Procurando localização';

        $scope.$on('location_found', function (sender, locationName) {
            $scope.title = locationName;
            $scope.$apply();
        });
    }
]);

app.directive('myMap', function () {
    // directive link function
    var link = function ($scope, $element, $attrs) {
        var map, infoWindow;
        var markers = [];
        $scope.locationName = '';

        // map config
        var mapOptions = {
            center: new google.maps.LatLng(-27.4245595, -48.3998562),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map($element[0], mapOptions);
            }

            var infoWindow = new google.maps.InfoWindow({ map: map });

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    codeLatLng(pos);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Você está aqui!');
                    map.setCenter(pos);
                }, function () {
                    console.log('Deu erro!!!');
                });
            } else {
                // Browser doesn't support Geolocation
                //handleLocationError(false, infoWindow, map.getCenter());
                console.log('Deu erro!!!');
            }
        }


        function codeLatLng(latlng) {

            var geocoder = new google.maps.Geocoder();

            //var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //formatted address
                        $scope.locationName = results[1].formatted_address

                        $scope.$emit('location_found', $scope.locationName);

                    } else {
                        console.log('Address not found.');
                    }
                } else {
                    console.log("Geocoder failed due to: " + status);
                }
            });
        }

        // show the map and place some markers
        initMap();

    };

    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});