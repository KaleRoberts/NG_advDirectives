(function () {
	"use strict";

	var app = angular.module("myApp", []);

	app.directive("country", function() {
		return {
			restrict: "E",
			controller: function() {
				this.makeAnnouncement = function(message) {
					console.log("Country says: " + message);
				};
			}
		};
	});

	app.directive("state", function() {
		return {
			restrict: "E",
			controller: function() {
				this.makeLaw = function(law) {
					console.log("Law: " + law);
				};
			}
		};
	});

	app.directive("city", function() {
		return {
			restrict: "E",
			require: ["^country", "^state"],	// Here country is the parent directive, while city is the child directive. We want to be able to pass down makeAnnouncement from country
			link: function(scope, element, attrs, ctrls) {
				ctrls[0].makeAnnouncement("This city rocks");
				ctrls[1].makeLaw("Jump Higher");
			}
		};
	});

	app.controller("choreCtrl", function($scope) {
	$scope.logChore = function(chore) {
		alert(chore + " is done!");
		};
	});

	app.directive("child", function() {		// This will help understand isolated scope
		return {
			retrict: "E",
			scope: {
				done: "&"	// The ampersand tells us that the scope is going to contain an expression
			},	// Before adding scope all child directives shared the same scope bindings, now we're isolating scope.
			template: '<input type="text" ng-model="chore">' +
			'{{chore}}' +
			'<div class="button" ng-click="done({chore:chore})">I\'m done</div>'
			}
	});

	app.controller('drinkCtrl', function($scope) {	// Making another example of isloating scope with @, which denotes a String identifier for the scope
		$scope.ctrlFlavor = 'blueberry';
	})

	// app.directive("drink", function() {
	// 	return {
	// 		scope: {
	// 			flavor: '@'
	// 		},
	// 		template: '<div>{{flavor}}</div>',
	// 		link: function(scope, element, attrs) {
	// 			scope.flavor = attrs.flavor;
	// 		}
	// 	};
	// });

	app.directive('drinktwo', function() {	// Isolated scope with = operator which expects an object to which it can bind.
		return {
			scope: {
				flavor: '='
			},
			template: '<input type="text" ng-model="flavor">'
		};
	});

	app.controller('phoneCtrl', function($scope) {
		$scope.callHome = function(message) {
			alert(message);
		};
	});

	app.directive('phone', function () {
		return {
			// restrict: 'E',
			scope: {
				dial: '&' // The ampersand operator allows invocation or evaluation of an expression on the parent scope of whatever the directive is inside of.
			},
			template: '<input type="text" ng-model="value">' +
					  '<div class="button" ng-click="dial({message:value})">' +
					  'Call home!</div>',
		};
	});

}());