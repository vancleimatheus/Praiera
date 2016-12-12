var app = angular.module('Praiera', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngDialog']);

app.run(function ($rootScope, ngDialog) {
    $rootScope.isProcessing = false;
    $rootScope.showAlert = function (message, callback, buttonCaption) {
        var caption = "Fechar";

        if (buttonCaption)
            caption = buttonCaption;

        ngDialog.open({
            template: '<div class="infoBox"><div style="padding-bottom: 15px">' + message +
                        '</div><div><button class="dialogButton" ng-click="closeThisDialog()">' + caption + '</button></div></div>',
            preCloseCallback: callback,
            plain: true,
            showClose: false
        });
    }
});

app.config(function ($routeProvider) {    
    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    scope.isProcessing = true;
                } else {
                    scope.isProcessing = false;
                }
            });
        }
    };

}]);


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

    $routeProvider.when("/thankyou", {
        controller: "ThankYouController",
        templateUrl: "/app/views/ThankYou.html"
    });

    $routeProvider.otherwise({ redirectTo: "/firststep" });
});

app.constant('serviceBase', { value: 'http://192.168.0.4:50974/' });