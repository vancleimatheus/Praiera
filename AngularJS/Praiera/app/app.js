var app = angular.module('Praiera', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngDialog']);

app.run(function ($rootScope, ngDialog) {
    $rootScope.showAlert = function (message, callback) {
        ngDialog.open({
            template: '<div class="infoBox"><div style="padding-bottom: 15px">' + message +
                        '</div><div><button class="dialogButton" ng-click="closeThisDialog()">Fechar</button></div></div>',
            preCloseCallback: callback,
            plain: true,
            showClose: false
        });
    }
});

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

app.constant('serviceBase', { value: 'http://192.168.0.9:50974/' });