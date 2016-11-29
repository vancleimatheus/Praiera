'use strict';
app.controller('IndexController', ['$scope', '$location', '$window', 'serviceState',
    function ($scope, $location, $window, serviceState) {
        
        $scope.shopStatus = serviceState.shopStatus;

        $scope.$on('$viewContentLoaded', function (event) {
            if ($location.absUrl().indexOf('localhost') == -1)
                $window.ga('send', 'pageview', { page: $location.url() });
        });
    }
]);