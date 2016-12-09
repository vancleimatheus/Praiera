'use strict';
app.controller('SecondStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'cartService', 'productsService', 
    function ($scope, $location, $filter, $uibModal, $document, mainService, cartService, productsService) {
        $scope.productsCart = [];
        $scope.kitPraiera = mainService.appState.kitPraiera;
        $scope.productsCart = cartService.getProductsCart();
        $scope.model = {
            total: cartService.getTotal()
        }


        $scope.previousStep = function () {
            $location.path('firststep');
        }

        $scope.nextStep = function () {
            $scope.showAlert('No próximo e último passo iremos obter a sua localização<br/>Por favor clique em "Permitir" quando for solicitada a autorização.', nextStep_callback);            
        }

        function nextStep_callback() {
            $location.path('thirdstep');
        }

        if (!$scope.productsCart || $scope.productsCart.length === 0) {
            $scope.previousStep();
        }
    }
]);