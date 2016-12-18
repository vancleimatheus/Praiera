
app.factory('productsService', ['$http', '$q', 'serviceBase',
    function ($http, $q, serviceBase) {
        var service = {};
        var internalCounter = 0;
        var PRODUCT_CHUNK = 6;
        var _products = [];

        var _getProducts = function (sendMore) {

            if (sendMore || _products.length === 0) {
                return $http.get(serviceBase.value + 'api/products/get/?Ranking=' + internalCounter + '&nextQty=' + PRODUCT_CHUNK).then(function (response) {

                    if (response.data.length > 0) {
                        for (var i = 0; i < response.data.length; i++)
                            _products.push(response.data[i]);

                        internalCounter = _products[_products.length - 1].ranking;
                    }

                    return _products;
                });
            } else {
                return $q(function (resolve) { resolve(_products) } );
            }

        };

        service.GetProducts = _getProducts;

        return service;
    }
]);

