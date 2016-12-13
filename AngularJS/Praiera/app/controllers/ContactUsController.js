'use strict';
app.controller('ContactUsController', ['$scope', '$location', 'mainService',
    function ($scope, $location, mainService) {

        $scope.contactInfo = {
            name: '',
            phone: '',
            email: '',
            message: '',
            suggestion: ''
        };

        $scope.sendMessage = function() {
            if (isValid()) {
                mainService.SendMessage($scope.contactInfo).then(function () {
                    $scope.showAlert('Obrigado pela sua mensagem.<br/>Se foi solicitado em breve retornaremos o contato.');
                    $scope.contactInfo = {
                        name: '',
                        phone: '',
                        email: '',
                        message: '',
                        suggestion: ''
                    };
                }).catch(function (data) {
                    $scope.showAlert('Infelizmente houve um erro ao enviar a sua mensagem. Por favor tente novamente.');
                    console.log(data);
                });
            }

        }

        function isValid() {
            if ($scope.contactInfo.name.trim() === '') {
                $scope.showAlert('Por favor, digite seu nome.');
                return false;
            }

            if ($scope.contactInfo.message.trim() === '') {
                $scope.showAlert('Por favor, digite a mensagem.');
                return false;
            }

            if ($scope.contactInfo.phone) {
                if ($scope.contactInfo.phone.length < 11) {
                    $scope.showAlert('Por favor, digite seu número de telefone completo com o DDD.');
                    return false;
                }
            } else {
                if($scope.contactInfo.email.trimg() === '') {
                    $scope.showAlert('Por favor, digite seu número de telefone ou um email.');
                    return false;
                } 
            }
                               
            return true;
        }

    }
]);
