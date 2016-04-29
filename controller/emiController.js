
var app = angular.module("myApp");

var emiFormCtrl = function($scope, $http){
	
	// Set some defaults values
	$scope.emi 					= 0;		// Monthly installment amount
	$scope.loanAmount 			= 50000;	// Loan amount
	$scope.interestRate 		= 10;		// Yearly interest rate
	$scope.loanPeriod 			= 5;		// Loan period in months
	$scope.installmentCycles 	= [];		// Will contain details about each installment cycle
	$scope.isIntrestForDefaultEmiSet = 0;

	$scope.resetEmi = function() {
		$scope.installmentCycles = [];
		$scope.overallStatistics = [];
		$scope.intrestForDefaultEmi = 0;
		$scope.isIntrestForDefaultEmiSet = 0;
		$scope.diffIntrestWithDefaultEmi = 0;
	}

	$scope.updateEmi = function() {
		var p = $scope.loanAmount;
		var r = $scope.interestRate / 12 / 100;
		var n = $scope.loanPeriod;
		$scope.emi =( p * r * ( ( Math.pow( (1 + r), n) ) / ( Math.pow( (1 + r), n) - 1 ) ) );	
		$scope.emi = $scope.emi.toFixed(); // Rounding of EMI value for simplicity
		var result = calculateInstallment( $scope.installmentCycles, p, r, n, $scope.emi);
		$scope.installmentCycles = result.installmentCycles;
		$scope.overallStatistics = result.overallStatistics;
		if($scope.isIntrestForDefaultEmiSet == 0){
			$scope.intrestForDefaultEmi = result.overallStatistics['Total Interest'];
			$scope.isIntrestForDefaultEmiSet = 1;
		}
		$scope.diffIntrestWithDefaultEmi = ($scope.intrestForDefaultEmi - result.overallStatistics['Total Interest']);
	}

	var calculateInstallment = function( installmentCycles, principleAmount, interestRate, loanPeriod, emi){
		var currentPrinciple 	= principleAmount;
		var totalIntrest 		= 0;
		var totalEmi 			= 0;
		var currentMonth 		= 0; 

		while ( ( currentPrinciple > 0 ) && ( currentMonth < loanPeriod ) ) {

			currentPrinciple = currentPrinciple.toFixed();

			interest 	  = Number(interestRate * currentPrinciple).toFixed();
			totalIntrest += parseFloat(interest);

			// If value for installment cycle is not defined use EMI as default value
			var installment = emi;
			if( !(installmentCycles[currentMonth] === undefined) ){
				if( !(installmentCycles[currentMonth].installment === undefined) ){
					installment = installmentCycles[currentMonth].installment;
				}
			}

			// Last installment will be entire remaining amount
			// Last installment paid before last loan period
			if( ( parseFloat(currentPrinciple) + parseFloat(interest) ) < parseFloat(installment) ){
				installment = parseFloat(currentPrinciple) + parseFloat(interest); 
			}
			// Last installment paid on last loan period 
			if( ( currentMonth + 1 ) == loanPeriod ){
				installment = parseFloat(currentPrinciple) + parseFloat(interest); 
			}
			
			totalEmi += parseFloat(installment);

			currentPrinciple = ( ( parseFloat(currentPrinciple) + parseFloat(interest) ) - parseFloat(installment) );
			var cycle = { 	'remainingAmount'	: currentPrinciple, 
							'interest'			: interest, 
							'principle'			: (installment - interest), 
							'installment'		: installment };

			// If entry for installment cycle already exists update existing entry else add new entry
			if( installmentCycles[currentMonth] === undefined || installmentCycles[currentMonth] == null ){
				installmentCycles.push( cycle );
			} else {
				installmentCycles[currentMonth] = cycle;
			}

			currentMonth++;
		}

		// Remove all entries since the last installment
		installmentCycles.splice( currentMonth, installmentCycles.length );
		var overallStatistics = { 'Total Interest': totalIntrest, 'Total Emi': totalEmi };
		return { 'installmentCycles': installmentCycles, 'overallStatistics': overallStatistics };
	}
}
app.controller( "emiFormCtrl", [ "$scope", "$http" , emiFormCtrl ] );
