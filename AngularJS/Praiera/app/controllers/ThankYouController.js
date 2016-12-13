'use strict';
app.controller('ThankYouController', ['$scope', '$location', '$window',
    function ($scope, $location, $window) {
        $scope.homePage = function () {
            $location.path('/firststep');
        }

        $window.scrollTo(0, 0);
    }
]);
