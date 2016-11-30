'use strict';
app.controller('FirstStepController', ['$scope', '$location', '$filter', '$uibModal', '$document', 'mainService', 'growl',
    function ($scope, $location, $filter, $uibModal, $document, mainService, growl) {
        $scope.model = {
            currentTotal: 0,
            minBuyAmount: 30
        };

        ///////////////Modal!!
        var $ctrl = this;
        $ctrl.animationsEnabled = true;

        $scope.showCart = function () {
            $ctrl.openCart('sm');
        }

        $scope.showKit = function () {
            $ctrl.openKit('sm');
        }

        $ctrl.openCart = function (size, parentSelector) {
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
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $ctrl.openKit = function (size, parentSelector) {
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: '/app/popover/KitPraiera.html',
                controller: 'KitModalController',
                controllerAs: '$ctrl',
                size: size,
                resolve: {
                    content: null
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
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

        $scope.products = [{
            id: '0',
            name: 'Itaipava Pilsen',
            type: 'latinha "shot"',
            capacity: '269ml',
            price: 3,
            image: 'img_itaipava_shot.png',
            qty: 0
        }, {
            id: '1',
            name: 'Brahma Pilsen',
            type: 'lata',
            capacity: '350ml',
            price: 3.5,
            image: 'img_brahma_lt.png',
            qty: 0
        }, {
            id: '2',
            name: 'Devassa Loura',
            type: 'long neck',
            capacity: '355ml',
            price: 5,
            image: 'img_devassa_ln.png',
            qty: 0
        }, {
            id: '3',
            name: 'Brahma Weiss',
            type: 'long neck',
            capacity: '355ml',
            price: 5,
            image: 'img_brahmaex_ln.png',
            qty: 0
        }];

        formatProducts();

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
            $scope.products.push({
                id: '4',
                name: 'Baden laden',
                type: 'long neck',
                capacity: '355ml',
                price: 4,
                image: 'img_brahmaex_ln.png',
                qty: 0
            }, {
                id: '5',
                name: 'Schinariol',
                type: 'long neck',
                capacity: '355ml',
                price: 4,
                image: 'img_brahmaex_ln.png',
                qty: 0
            }, {
                id: '6',
                name: 'Coronia',
                type: 'long neck',
                capacity: '355ml',
                price: 4,
                image: 'img_brahmaex_ln.png',
                qty: 0
            }, {
                id: '7',
                name: 'Skoles',
                type: 'long neck',
                capacity: '355ml',
                price: 4,
                image: 'img_brahmaex_ln.png',
                qty: 0
            })

            formatProducts();
        }

        function formatProducts() {
            $scope.viewProducts = [];

            for (var i = 0; i < $scope.products.length; i = i + 2) {
                if (i + 1 < $scope.products.length) {
                    $scope.viewProducts.push([$scope.products[i], $scope.products[i + 1]]);
                } else {
                    $scope.viewProducts.push([$scope.products[i]]);
                }                
            }
        }

        $scope.nextStep = function () {
            mainService.getConfig().then(function (data) {
                nextStep_callback(data);
            });
        }

        function nextStep_callback(data) {
            if (data.isOnline) {
                if (getTotal() >= data.minimunPurchase) {

                } else {
                    growl.error('Por favor adicione mais itens, o pedido mínimo é de:' + $filter('currency')($scope.model.minBuyAmount, 'R$', 2));
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

        
    }
]);

app.controller('CartModalController', function ($uibModalInstance, productsCart) {
    var $ctrl = this;
    $ctrl.productsCart = productsCart;
    $ctrl.currentTotal = $ctrl.productsCart.reduce(calculateTotal, 0.0);

    function calculateTotal(p1, p2) {
        return p1 + (p2.qty * p2.price);
    }
});

app.controller('KitModalController', function ($uibModalInstance, productsCart) {
});