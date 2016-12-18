'use strict';
app.controller('ThirdStepController', ['$scope', '$location', '$window', '$filter', '$uibModal', '$document', 'mainService', 'cartService', 'productsService', 
    function ($scope, $location, $window, $filter, $uibModal, $document, mainService, cartService, productsService) {
        $scope.title = 'Procurando localização';

        $scope.$on('location_found', function (sender, locationName) {
            $scope.title = locationName;
            $scope.$apply();
        });

        cartService.getProductsCart();
        $scope.strTotal = $filter('currency')(cartService.getTotal(), 'R$', 2);

        $scope.buyerInfo = {
            longitude: 0.0,
            latitude: 0.0,
            comments: '',
            name: '',
            phone: '',
            change: 0
        }

        $scope.previousStep = function () {
            $location.path('secondstep');
        }

        $scope.Save = function () {
            if (isValid()) {
                cartService.saveToDB($scope.buyerInfo).then(function () {
                    $location.path('thankyou')
                }).catch(function (data) {
                    $scope.showAlert('Infelizmente houve um erro ao fazer o pedido. Por favor tente novamente.');
                    console.log(data);
                });
            }
        }

        function isValid() {
            if ($scope.buyerInfo.name.trim() === '') {
                $scope.showAlert('Por favor, digite seu nome.');
                return false;
            }

            if ($scope.buyerInfo.phone) {
                if ($scope.buyerInfo.phone.length < 11) {
                    $scope.showAlert('Por favor, digite seu número de telefone completo com o DDD.');
                    return false;
                }
            } else {
                $scope.showAlert('Por favor, digite seu número de telefone.');
                return false;
            }
                               
            return true;
        }

        $window.scrollTo(0, 0);
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

                    $scope.buyerInfo.latitude = pos.lat;
                    $scope.buyerInfo.longitude = pos.lng;

                    codeLatLng(pos);

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Você está aqui!');
                    map.setCenter(pos);
                }, function (data) {
                    $scope.showAlert('Infelizmente, não conseguimos detectar a sua localização. <br/><br/> Sem problemas, preencha seus dados, pressione "FINALIZAR" e entraremos em contato pelo Whatsapp!');
                });
            } else {
                $scope.showAlert('Infelizmente, não conseguimos detectar a sua localização. <br/><br/> Sem problemas, preencha seus dados, pressione "FINALIZAR" e entraremos em contato pelo Whatsapp!');
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