<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Praiera.Index" %>

<!DOCTYPE html>

<html lang="pt-br" ng-app="Praiera">
<head>
    <meta charset="utf-8">   
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Praiêra Delivery</title>
    <!-- Bootstrap -->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <link rel="stylesheet" href="js/angular-growl.min.css" />
    <link rel="stylesheet" href="app/components/ng-dialog/ngDialog.min.css">
    <link rel="stylesheet" href="app/components/ng-dialog/ngDialog-theme-default.min.css">
    <link rel="stylesheet" href="styles/RobotoFont.css" />
    <link rel="stylesheet" href="styles/style.css" />
    <link rel="stylesheet" href="styles/425px.css" />
    <link rel="stylesheet" href="styles/375px.css" />
    <link rel="stylesheet" href="styles/360px.css" />
    <link rel="stylesheet" href="styles/320px.css" />
</head>
<body>
    <div class="container-fluid" ng-controller="IndexController">
        <div id="mydiv" data-loading>
            <div class="ajax-loader">
                <p class="bottomThin">Aguarde, processando...</p>
                <img src="img/loading.gif" />
            </div>
        </div>
		<div class="wraper">
            <div class="header row rowHeader">
                <div style="margin-top: 20px; width:15.8%">
                    <a href="#menu" id="toggle"><span></span></a>
                    <div id="menu">
                        <ul>
                            <li ng-click="goHome()"><a>INÍCIO</a></li>
                            <li ng-click="goHow()"><a>COMO FUNCIONA?</a></li>
                            <li ng-click="goContact()" style="border-bottom: none"><a>CONTATO</a></li>
                        </ul>
                    </div>
                </div>
                <div style="text-align:center; width: 59%">
                    <span class="helper"></span><img src="img/logo_Praiera_transp.png" class="img img-responsive">
                </div>
                <div class="radio-btn" style="padding-left: 5px;padding-right: 5px; width: 25%" ng-cloak>
                    <img ng-src="{{shopStatus.image}}" class="img img-responsive">
                    <p class="radio-text" style="font-size: 8px;" ng-show="shopStatus.isOnline">ESTAMOS<br /> ENTREGANDO</p>
                    <p class="radio-text" style="font-size: 8px;" ng-show="!shopStatus.isOnline">FECHADO.<br /> RETORNO: 10h</p>
                </div>
            </div>
            <div ng-view="">

            </div>
        </div>
        <div id="mydiv" data-loading ng-show="isProcessing">
            <img src="img/loading.gif" class="ajax-loader" />
        </div>
    </div>
</body>
</html>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBi6SNPJ14_iHhzKmjXAESYWO6xe7MmfCo" async defer></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0-rc.2/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0-rc.2/angular-sanitize.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0-rc.2/angular-route.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0-rc.2/angular-touch.js"></script>
<script src="js/ui-bootstrap-tpls-2.3.0.min.js"></script>
<script src="app/components/angular-locale_pt-br.js" charset="utf-8"></script>
<script src="app/app.js?v=2"></script>
<script src="app/services/mainService.js?v=2" charset="utf-8"></script>
<script src="app/services/productsService.js?v=2" charset="utf-8"></script>
<script src="app/services/cartService.js?v=2" charset="utf-8"></script>
<script src="app/controllers/IndexController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/FirstStepController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/SecondStepController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/ThirdStepController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/ThankYouController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/HowController.js?v=2" charset="utf-8"></script>
<script src="app/controllers/ContactUsController.js?v=2" charset="utf-8"></script>
<script src="js/angular-growl.min.js"></script>
<script src="app/components/ng-dialog/ngDialog.min.js"></script>

<script>
     var theToggle = document.getElementById('toggle');

    // based on Todd Motto functions
    // http://toddmotto.com/labs/reusable-js/

    // hasClass
    function hasClass(elem, className) {
	    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    // addClass
    function addClass(elem, className) {
        if (!hasClass(elem, className)) {
    	    elem.className += ' ' + className;
        }
    }
    // removeClass
    function removeClass(elem, className) {
	    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	    if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
    // toggleClass
    function toggleClass(elem, className) {
	    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(" " + className + " ") >= 0 ) {
                newClass = newClass.replace( " " + className + " " , " " );
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        } else {
            elem.className += ' ' + className;
        }
    }

    theToggle.onclick = function() {
       toggleClass(this, 'on');
       return false;
    }

    function getWidth() {
        if (self.innerWidth) {
            return self.innerWidth;
        }

        if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }

        if (document.body) {
            return document.body.clientWidth;
        }
    }

    //alert(getWidth());
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-88926317-1', 'auto');
  ga('send', 'pageview');

</script>