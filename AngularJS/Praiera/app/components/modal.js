app.directive('modal', function () {
    var template = '<div class="{{modalClass}}">' +
            '<div class="{{modalClass1}} {{modalsize}}">' +
              '<div class="modal-content panel panel-border {{panelColor}}">' +
                '<div class="panel-heading">' +
                    '{{htmlclose}}' +
                        '<h3 class="panel-title">{{title}}</h3>' +
                    '</div>' +
                '<div class="modal-body p-b-10" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>';
    return {
        template: template,
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        backdrop: 'static',
        link: function postLink(scope, element, attrs) {
            if (scope.myEmbedded) {
                scope.htmlClose = "";
                scope.modalClass = "";
                scope.modalClass1 = "";
                scope.title = "";

            } else {
                scope.title = attrs.title;
                scope.modalSize = attrs.modalsize;

                scope.htmlClose = '<button aria-hidden="true" class="close" data-dismiss="modal" type="button">×</button>';
                scope.modalClass = "modal fade";
                scope.modalClass1 = "modal-dialog";
                scope.panelColor = attrs.panelcolor ? attrs.panelcolor : "panel-primary";
                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        }
    };
});