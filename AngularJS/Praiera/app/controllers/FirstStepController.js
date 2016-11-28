'use strict';
app.controller('FirstStepController', ['$scope', '$location', '$filter',
    function ($scope, $location, $filter) {
        $scope.model = {
            isOnline: true,
            currentTotal: 0,
            showCart: false
        };

        $scope.toggleModalCart = function () {
            $scope.showCart = !$scope.showCart;
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