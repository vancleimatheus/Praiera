﻿
app.factory('mainService', ['$http', 'serviceBase',
    function ($http, serviceBase) {
        var service = {};

        var _getConfig = function () {

            return $http.get(serviceBase.value + 'api/main/getConfig/').then(function (response) {
                return response.data;
            });

        };

        service.GetConfig = _getConfig;

        return service;
    }
]);
