/**
 * Created by zwilhelm on 9/24/17.
 */

// Start with adding Angular
var app = angular.module("myEtherWalletDapp", ['ngRoute']);

app.controller("MainController", function ($scope) {
    $scope.myVar = 'Main';
});

app.controller("ShoweventsController", function ($scope) {
    $scope.myVar = 'Showevents';
});

app.controller("SendFunds", function ($scope) {
    //$scope.myVar = 'SendFunds';

    //web3 object is attached to the window
    // Get list of accounts:
    $scope.accounts = web3.eth.accounts;

    $scope.depositFunds = function(address, amount) {
        var contract = SimpleContract.deployed();
        web3.eth.sendTransaction({from: address, to: contract.address, value: web3.toWei(amount, "ether")}, function(error, result) {
            if(error) {
                $scope.has_errors = "It didn't work";
            } else {
                $scope.transfer_success = true;
            }
        });
        // Working outside of angular: must send update to the scope:
        $scope.$apply();
    }

});

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
    }).when('/events', {
        templateUrl: 'views/events.html',
        controller: 'ShowEventsController'
    }).when('/sendFunds', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
    }).otherwise({redirectTo: '/'});
});

// As soon as you build out the project with truffle
// the web3 object will be attached to a window

