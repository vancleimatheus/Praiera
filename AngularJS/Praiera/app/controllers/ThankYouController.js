'use strict';
app.controller('ThankYouController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.homePage = function () {
            $location.path('/firststep');
        }
    }
]);
