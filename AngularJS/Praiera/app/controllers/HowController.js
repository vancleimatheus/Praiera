'use strict';
app.controller('HowController', ['$scope', '$location',
    function ($scope, $location) {
        //$scope.myInterval = 5000;
        //$scope.noWrapSlides = false;
        //$scope.active = 0;
        //$scope.slides = [{
        //    image: '/img/img_passo1.png',
        //    text: '',
        //    id: 1
        //}, {
        //    image: '/img/img_passo2.png',
        //    text: '',
        //    id: 2
        //}, {
        //    image: '/img/img_passo3.png',
        //    text: '',
        //    id: 3
        //}, {
        //    image: '/img/img_passo4.png',
        //    text: '',
        //    id: 4
        //}];
        //var currIndex = 0;

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        var myArr = [{
            image: 'img/img_passo1.png',
            text: '',
            id: 1
        },{
            image: 'img/img_passo2.png',
            text: '',
            id: 2
        },{
            image: 'img/img_passo3.png',
            text: '',
            id: 3
        },{
            image: 'img/img_passo4.png',
            text: '',
            id: 4
        }];

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push(myArr[currIndex++]);
        };


        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

    }
]);
