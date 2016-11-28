var app = angular.module('Praiera', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

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
