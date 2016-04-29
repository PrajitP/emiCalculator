
var app = angular.module("myApp",["ngRoute","ui.bootstrap"]);
app.config(function($routeProvider){
	$routeProvider
	.when("/main",{
		templateUrl: "view/main.html",
		controller : "mainCtrl"
	})
	.when("/emi",{
		templateUrl: "view/emi_calculator.html",
		controller : "emiFormCtrl"
	})
	.when("/faq",{
		templateUrl: "view/FAQ.html",
	})
	.otherwise({redirectTo:"/main"});
});

// Initialization code goes here
app.run( function($rootScope){
});
