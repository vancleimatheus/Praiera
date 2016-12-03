'use strict';
app.controller('FirstStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'productsService', 'cartService', 
    function ($scope, $location, $filter, $uibModal, $document, mainService, productsService, cartService) {
        $scope.model = {
            noMoreProducts: false,
            total: 0
        };

        $scope.products = [];
        $scope.viewProducts = [];

        ///////////////Modal!!
        var $ctrl = this;
        $ctrl.animationsEnabled = false;

        $scope.showCart = function () {
            $ctrl.openCart('sm');
        }

        $scope.showKit = function () {
            $ctrl.openKit();
        }

        $ctrl.openCart = function (size) {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/popover/Cart.html',
                controller: 'CartModalController',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    productsCart: function () {
                        return cartService.getProductsCart();
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {                
            }, function () {                
            });
        };

        $ctrl.openKit = function (size) {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/popover/KitPraiera.html',
                controller: 'KitModalController',
                controllerAs: '$ctrl',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
            });
        };

        ///////////////Close Modal!!

        $scope.kitPraiera = mainService.appState.kitPraiera;

        $scope.productsCart = cartService.productsCart;

        $scope.popOverCart = {
            content: 'Carrinho!',
            templateUrl: 'Cart.html',
            title: 'Carrinho'
        };

        $scope.Increase = function (model) {
            model.qty++;
            $scope.updateCart();
        }

        $scope.Decrease = function (model) {
            if (model.qty > 0)
                model.qty--;
            else
                model.qty = 0;

            $scope.updateCart();
        }

        $scope.updateCart = function () {
            $scope.model.total = cartService.updateCart($scope.products);
        }

        $scope.checkValue = function (model) {
            if (!(Number(model.qty) === model.qty) || (model.qty % 1 !== 0)) {
                model.qty.isInteger = 0;
            }
        }


        $scope.moreProducts = function (sendMore) {
            var currentSize = $scope.products.length;

            productsService.GetProducts(sendMore).then(function (data) {
                if (data.length !== currentSize) {
                    $scope.products = data;

                    formatProducts(currentSize);
                } else {
                    $scope.model.noMoreProducts = true;

                    $scope.showAlert('Exibindo todos os produtos');
                }

                $scope.updateCart();
            });            
        }

        function formatProducts(start) {
            for (var i = start; i < $scope.products.length; i = i + 2) {
                if (i + 1 < $scope.products.length) {
                    $scope.viewProducts.push([$scope.products[i], $scope.products[i + 1]]);
                } else {
                    $scope.viewProducts.push([$scope.products[i]]);
                }                
            }
        }

        $scope.nextStep = function () {
            mainService.GetConfig().then(function (data) {
                nextStep_callback(data);
            });
        }

        function nextStep_callback(data) {
            if (data.isOnline) {
                if (cartService.getTotal() >= data.minimunPurchase) {
                    cartService.saveCart();
                    $location.path('/secondstep');
                } else {
                    $scope.showAlert('Por favor adicione mais itens, o pedido mínimo é de:' + $filter('currency')(data.minimunPurchase, 'R$', 2));
                }
            } else {
                $scope.showAlert('Desculpe-nos, não estamos entregando no momento');
            }
        }

        $scope.moreProducts(false);        
    }
]);

app.controller('CartModalController', function ($uibModalInstance, productsCart) {
    var $ctrl = this;
    $ctrl.productsCart = productsCart;
    $ctrl.currentTotal = $ctrl.productsCart.reduce(calculateTotal, 0.0);

    function calculateTotal(p1, p2) {
        return p1 + (p2.qty * p2.price);
    }

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller('KitModalController', function ($uibModalInstance) {
    var $ctrl = this;

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});