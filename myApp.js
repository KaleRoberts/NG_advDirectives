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

	app.directive("child", function() {		// This will help understand isolated scope
		return {
			retrict: "E",
			template: "<input type='text' ng-model='chore'>{{chore}}"
		};
	});

}());