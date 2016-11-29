var app = angular.module('Praiera', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'angular-growl']);

app.config(function ($routeProvider) {    
    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.config(function ($routeProvider) {    

    $routeProvider.when("/firststep", {
        controller: "FirstStepController",
        templateUrl: "/app/views/FirstStep.html"
    });

    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(2000);
    growlProvider.globalDisableCountDown(true);
}]);

app.factory('serviceState', function () {
    return {
        shopStatus: {
            isOnline: true,
            deliveryText: 'ESTAMOS ENTREGANDO',
            image: 'img/Online.png'
        }
    };
});
