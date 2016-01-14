var app = angular.module('BuildWithTrelloControllers');

app.controller('NavCtrl', function($scope, $state) {
	$scope.navClass = function(page) {
		if($state.is(page)) {
			return "is-active";
		}

	};
});