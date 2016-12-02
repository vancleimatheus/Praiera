
app.factory('cartService', ['$http', 'serviceBase', 'mainService',
    function ($http, serviceBase, mainService) {
        var service = {};
        
        var _productsCart = [];
        var _currentTotal = 0;

        var _updateCart = function (products) {
            _productsCart = products.filter(filterProduct);

            if (mainService.appState.kitPraiera.selected) {
                _productsCart.push({
                    id: 7,
                    name: 'KIT PRAIÊRA',
                    type: 'Cx Isopor + Gelo 3kg',
                    capacity: '',
                    qty: 1,
                    price: mainService.appState.kitPraiera.price
                });
            }

            _currentTotal = getTotal(_productsCart);

            return _currentTotal;
        }

        var _saveCart = function () {
            localStorage.setItem('praiera_Cart', JSON.stringify(_productsCart));
        }

        var _saveToDB = function (buyerInfo) {
            var data = {
                purchase: buyerInfo,
                products: _getProductsCart()
            }

            return $http.post(serviceBase.value + 'api/purchase/save/', data).then(function (response) {
                localStorage.setItem('praiera_Cart', null);
                return response;
            });
        }

        function filterProduct(v) {
            return v.qty > 0;
        }

        function getTotal(products) {
            return products.reduce(calculateTotal, 0.0);
        }

        function calculateTotal(p1, p2) {
            return p1 + (p2.qty * p2.price);
        }

        var _getProductsCart = function () {
            if (_productsCart.length === 0) {
                var _savedCart = localStorage.getItem('praiera_Cart');

                if (_savedCart !== null)
                    _productsCart = JSON.parse(_savedCart);
            }

            return _productsCart;
        }

        var _getTotal = function () {
            return _currentTotal;
        }

        service = {
            updateCart: _updateCart,
            getTotal: _getTotal,
            getProductsCart: _getProductsCart,
            saveCart: _saveCart,
            saveToDB: _saveToDB
        }        

        return service;
    }
]);

