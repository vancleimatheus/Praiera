'use strict';
app.controller('IndexController', ['$scope', '$location', '$window',
    function ($scope, mainService, $location, $window) {        

        $scope.$on('$viewContentLoaded', function (event) {
            //if ($location.absUrl().indexOf('localhost') == -1)
                //$window.ga('send', 'pageview', { page: $location.url() });
        });
    }
]);