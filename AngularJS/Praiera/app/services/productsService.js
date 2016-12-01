
app.factory('productsService', ['$http', 'serviceBase',
    function ($http, serviceBase) {
        var service = {};
        var internalCounter = 0;
        var PRODUCT_CHUNK = 4;

        var _getProducts = function () {

            return $http.get(serviceBase.value + 'api/products/get/?Ranking=' + internalCounter + '&nextQty=' + PRODUCT_CHUNK).then(function (response) {
                if(response.data.length>0)
                    internalCounter = response.data[response.data.length - 1].ranking;

                return response.data;
            });

        };

        service.GetProducts = _getProducts;

        return service;
    }
]);

