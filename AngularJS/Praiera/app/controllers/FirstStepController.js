'use strict';
app.controller('FirstStepController', ['$scope', '$location', '$filter', '$uibModal', '$document',
    function ($scope, $location, $filter, $uibModal, $document) {
        $scope.model = {
            isOnline: true,
            currentTotal: 0,
        };

        var $ctrl = this;
        $ctrl.animationsEnabled = true;

        $scope.showCart = function () {
            $ctrl.open('sm');
        }

        $ctrl.open = function (size, parentSelector) {
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

        $scope.viewProducts = [];
        $scope.viewProducts.push([$scope.products[0], $scope.products[1]]);
        $scope.viewProducts.push([$scope.products[2], $scope.products[3]]);

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
            $scope.productsCart = $scope.products.filter((v) => { return v.qty > 0 });

            $scope.model.currentTotal = $scope.products.reduce((p1, p2) => { return p1 + (p2.qty * p2.price) }, 0.0);

            if ($scope.kitPraiera.selected)
                $scope.model.currentTotal += $scope.kitPraiera.price;
        }
    }
]);

app.controller('CartModalController', function ($uibModalInstance, productsCart) {
    var $ctrl = this;
    $ctrl.productsCart = productsCart;
    $ctrl.currentTotal = $ctrl.productsCart.reduce((p1, p2) => { return p1 + (p2.qty * p2.price) }, 0.0);
});