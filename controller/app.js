
var app = angular.module("myApp",["ngRoute","ui.bootstrap"]);
app.config(function($routeProvider){
	$routeProvider
	.when("/main",{
		templateUrl: "main.html",
		controller : "mainCtrl"
	})
	.when("/emi",{
		templateUrl: "emi_calculator.html",
		controller : "emiFormCtrl"
	})
	.otherwise({redirectTo:"/main"});
});

// Initialization code goes here
app.run( function($rootScope){
});
