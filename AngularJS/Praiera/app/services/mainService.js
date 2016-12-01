
app.factory('mainService', ['$http', 'serviceBase',
    function ($http, serviceBase) {
        var service = {};
        var appState = {
            kitPraiera: {
                selected: false,
                price: 20
            }

        }

        var _getConfig = function () {

            return $http.get(serviceBase.value + 'api/main/getConfig/').then(function (response) {
                return response.data;
            });

        };

        service.appState = appState;
        service.GetConfig = _getConfig;

        return service;
    }
]);

