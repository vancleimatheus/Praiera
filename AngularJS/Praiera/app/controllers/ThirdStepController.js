'use strict';
app.controller('ThirdStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'cartService', 'productsService', 'growl',
    function ($scope, $location, $filter, $uibModal, $document, mainService, cartService, productsService, growl) {

    }
]);

app.directive('myMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

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
                map = new google.maps.Map(element[0], mapOptions);
            }

            var infoWindow = new google.maps.InfoWindow({ map: map });

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
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

        // place a marker

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