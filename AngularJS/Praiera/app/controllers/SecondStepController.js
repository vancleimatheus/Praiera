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
            $scope.showAlert('Para o próximo e último passo precisamos da sua localização.<br/>Por favor, clique em "<strong>Permitir</strong>" quando for solicitada a autorização.', nextStep_callback, "&nbsp;&nbsp;&nbsp;Ok, continuar&nbsp;&nbsp;&nbsp;");
        }

        function nextStep_callback() {
            $location.path('thirdstep');
        }

        if (!$scope.productsCart || $scope.productsCart.length === 0) {
            $scope.previousStep();
        }
    }
]);