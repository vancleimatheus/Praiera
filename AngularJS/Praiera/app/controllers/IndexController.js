'use strict';
app.controller('IndexController', ['$scope', '$location', '$window', 'mainService',
    function ($scope, $location, $window, mainService) {

        $scope.shopStatus = {
            isOnline: false,
            image: 'img/Offline.png'
        }

        mainService.GetConfig().then(function (data) {
            if (data.isOnline === true) {
                $scope.shopStatus = {
                    isOnline: true,
                    image: 'img/Online.png'
                } 
            } else {
                $scope.shopStatus ={
                    isOnline: false,
                    image: 'img/Offline.png'
                }
            }
        });

        $scope.$on('$viewContentLoaded', function (event) {
            if ($location.absUrl().indexOf('localhost') == -1)
                $window.ga('send', 'pageview', { page: $location.url() });
        });

        $scope.goHome = function (closeMenu) {
            if(closeMenu)
                document.getElementById('toggle').click();

            $location.path('firststep');
        }

        $scope.goHow = function () {
            document.getElementById('toggle').click();
            $location.path('howitworks');
        }

        $scope.goContact = function () {
            document.getElementById('toggle').click();
            $location.path('contactus');
        }
    }
]);