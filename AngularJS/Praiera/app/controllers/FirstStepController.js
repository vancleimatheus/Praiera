'use strict';
app.controller('FirstStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'productsService', 'growl',
    function ($scope, $location, $filter, $uibModal, $document, mainService, productsService, growl) {
        $scope.model = {
            currentTotal: 0,
            noMoreProducts: false
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
                        return $scope.productsCart;
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

        ///////////////Modal!!

        $scope.kitPraiera = {
            selected: false,
            price: 20
        }

        $scope.productsCart = [];

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

        $scope.checkValue = function (model) {
            if (!(Number(model.qty) === model.qty) || (model.qty % 1 !== 0)) {
                model.qty.isInteger = 0;
            }
        }

        $scope.updateCart = function () {
            $scope.productsCart = $scope.products.filter(filterProduct);

            $scope.model.currentTotal = getTotal();

            if ($scope.kitPraiera.selected)
                $scope.model.currentTotal += $scope.kitPraiera.price;
        }

        $scope.moreProducts = function () {
            var currentSize = $scope.products.length;

            productsService.GetProducts().then(function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++)
                        $scope.products.push(data[i]);

                    formatProducts(currentSize);
                } else {
                    $scope.model.noMoreProducts = true;
                    growl.success('Exibindo todos os produtos');
                }
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
                if (getTotal() >= data.minimunPurchase) {

                } else {
                    growl.error('Por favor adicione mais itens, o pedido mínimo é de:' + $filter('currency')(data.minimunPurchase, 'R$', 2));
                }
            } else {
                growl.error('Desculpe-nos, não estamos entregando no momento');
            }
        }



        function showError(message) {
            $scope.model.cantBuyMessage = message;
            $scope.model.showCantBuy = true;
            setTimeout(function () { $scope.model.showCantBuy = false; }, 2000);

        }

        function getTotal() {
            return $scope.products.reduce( calculateTotal, 0.0);
        }

        function filterProduct(v) {
            return v.qty > 0;
        }

        function calculateTotal(p1, p2) {
            return p1 + (p2.qty * p2.price);
        }

        $scope.moreProducts();
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