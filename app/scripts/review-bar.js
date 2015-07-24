angular.module('ReviewBarDirective', [])
.directive('reviewBar', function( $location, $http) {
	return {
		templateUrl: 'templates/review-bar.html',
		scope: {
			ratingValue : '=',
			hoverRating : '=',
			permanent : '=',
			reviewId : '='
		},
		link: function(scope, elem, attr) {
			scope.stars = [];
			scope.permanent = 0;
				
			for ( var i = 0; i < 5; i++) {
				scope.stars.push({
					filled : i < scope.hoverRating
				});
			}
			scope.updateStarColor = function() {
				for ( var i = 0; i < 5; i++) {
					scope.stars[i].filled = i < scope.hoverRating;
				}
				
				
			}
			
			scope.toggle = function(index) {
				var review = {"rating":index+1, "page": $location.path(), "timestamp": Date.now()};
				if(scope.reviewId) {
					$http.put('https://trevelopers-reviews.firebaseio.com/reviews/'+scope.reviewId+'.json', review)
						.success(function(data) {
							//console.log("PUT was successful " + data.name);
							scope.askForMore = true;
						});
				} else {
					$http.post('https://trevelopers-reviews.firebaseio.com/reviews.json', review)
						.success(function(data) {
							//console.log("POST was successful " + data.name);
							scope.reviewId = data.name;

							scope.askForMore = true;
						});
				}
				scope.permanent = index+1;
			}

			scope.sendFeedback = function() {
				$http.put('https://trevelopers-reviews.firebaseio.com/reviews/'+scope.reviewId+'/details.json', {message:scope.moreFeedback})
						.success(function(data) {
							//console.log("PUT was successful " + data.name);
						});
						scope.askForMore = false;
			}

			scope.hover = function(index) {
				scope.hoverRating = index + 1;
				scope.updateStarColor();
				var messages = [
					"Unusable documentation",
					"Poor documentation",
					"OK documentation",
					"Good documentation",
					"Excellent documentation"
				];
				scope.description = messages[index];

			}
			scope.noHover = function() {
				scope.hoverRating = scope.permanent;
				scope.updateStarColor();
				scope.description = "";

			}
			scope.updateStarColor();

		}

	};
});

