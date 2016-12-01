var app = angular.module('Praiera', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'angular-growl']);

app.config(function ($routeProvider) {    
    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.config(function ($routeProvider) {    

    $routeProvider.when("/firststep", {
        controller: "FirstStepController",
        templateUrl: "/app/views/FirstStep.html"
    });

    $routeProvider.when("/secondstep", {
        controller: "SecondStepController",
        templateUrl: "/app/views/SecondStep.html"
    });

    $routeProvider.when("/thirdstep", {
        controller: "ThirdStepController",
        templateUrl: "/app/views/ThirdStep.html"
    });

    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.config(['growlProvider', function (growlProvider) {
    growlProvider.globalTimeToLive(2000);
    growlProvider.globalDisableCountDown(true);
}]);

app.constant('serviceBase', { value: 'http://localhost:50974/' });