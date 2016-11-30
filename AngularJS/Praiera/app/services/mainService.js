
app.factory('mainService', ['$http', 'serviceBase',
    function ($http, serviceBase) {
        var mainService = {};

        var _getConfig = function () {

            return $http.get(serviceBase.value + 'api/main/getConfig/').then(function (response) {
                return response.data;
            });

        };

        mainService.GetConfig = _getConfig;

        return mainService;
    }
]);

