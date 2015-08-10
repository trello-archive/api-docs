app = angular.module('BuildWithTrello', ['BuildWithTrelloControllers', 'ReviewBarDirective', 'ui.router','ngMaterial']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // Not supported yet until we can serve the same index.html from all URLs
  //$locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/overview');



  $stateProvider
    .state('overview', {
      url: '/overview',
      templateUrl: 'templates/overview.html',
      controller: 'OverviewCtrl'
    })
    .state('get-started', {
      url: '/get-started',
      templateUrl: 'templates/get-started.html',
      controller: 'GetStartedCtrl'
    })
    .state('apis', {
      url: '/apis',
      templateUrl: 'templates/apis.html'
    })
    .state('apis-page', {
      url: '/apis/{page}',
      templateUrl:
    		function(stateParams) {
    			return 'templates/apis/' + stateParams.page + '.html';
    		}
    })
    .state('sandbox', {
      url: '/sandbox',
      templateUrl: 'templates/sandbox.html',
      controller: 'SandboxCtrl'
    })
    .state('community', {
      url: '/community',
      templateUrl: 'templates/community.html',
      controller: 'CommunityCtrl'
    })
    .state('advanced-reference', {
      url: '/advanced-reference',
      templateUrl: 'templates/advanced-reference.html'
    })
    .state('advanced-reference.page', {
    	url: '/{page}',
    	templateUrl:
    		function(stateParams) {
    			return 'templates/docs/' + stateParams.page + '.html';
    		},
    	controller: 'AdvancedReferencePageCtrl'
    })
    .state('tutorials', {
    	url: '/tutorials',
    	templateUrl: 'templates/tutorials.html'
    })
    .state('tutorial-page', {
    	url: '/tutorials/{page}',
    	templateUrl:
    		function(stateParams) {
    			return 'templates/tutorials/' + stateParams.page + '.html';
    		}
    });
});

app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope
    .$on('$stateChangeSuccess',
      function(event){
          if( $window.ga ) {
            $window.ga('send', 'pageview', { page: $location.path() });
          }

          if ($window.sp) {
            $window.sp('trackPageView', $location.protocol() + '//' + $location.host() + $location.path() );
          }
        });
}]);
