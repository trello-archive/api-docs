var app = angular.module('BuildWithTrelloControllers');

app.controller('NavCtrl', function($scope, $state) {
	$scope.navClass = function(page) {
		if($state.current.name.startsWith(page)) {
			return "is-active";
		}

	};
});