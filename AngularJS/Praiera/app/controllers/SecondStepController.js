'use strict';
app.controller('SecondStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'cartService', 'productsService', 'growl',
    function ($scope, $location, $filter, $uibModal, $document, mainService, cartService, productsService, growl) {
        $scope.productsCart = [];
        $scope.kitPraiera = mainService.appState.kitPraiera;
        $scope.productsCart = cartService.getProductsCart();
        $scope.model = {
            total: cartService.getTotal()
        }

        if ($scope.productsCart.length === 0) {
            $scope.previousStep();
        }

        $scope.previousStep = function () {
            $location.path('firststep');
        }

        $scope.nextStep = function () {
            $location.path('thirdstep');
        }
    }
]);