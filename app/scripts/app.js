app = angular.module('BuildWithTrello', ['BuildWithTrelloControllers', 'ReviewBarDirective', 'ui.router','ngMaterial']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');



  $stateProvider
    .state('overview', {
      url: '/',
      templateUrl: 'templates/overview.html',
      controller: 'OverviewCtrl'
    })
    .state('get-started', {
      url: '/get-started',
      templateUrl: 'templates/get-started.html',
      controller: 'GetStartedCtrl',
      data : { pageTitle: 'Get Started' }
    })
    .state('apis', {
      url: '/apis',
      templateUrl: 'templates/apis.html',
      data : { pageTitle: 'APIs' }
    })
    .state('clientjs', {
      url: '/clientjs',
      templateUrl: 'templates/clientjs.html',
      data : { pageTitle: 'Client.js' }
    })
    .state('add-card', {
      url: '/add-card',
      templateUrl: 'templates/add-card.html',
      data : { pageTitle: 'Add Card Share Intent' }
    })
    .state('oauth', {
      url: '/oauth',
      templateUrl: 'templates/oauth.html',
      data : { pageTitle: 'OAuth' }
    })
    .state('authorize', {
      url: '/authorize',
      templateUrl: 'templates/authorize.html',
      data : { pageTitle: 'Authorizing' }
    })
    .state('apis-page', {
      url: '/apis/{page}',
      templateUrl:
    		function(stateParams) {
    			return 'templates/apis/' + stateParams.page + '.html';
    		},
      data : { pageTitle: 'API Reference' }
    })
    .state('sandbox', {
      url: '/sandbox',
      templateUrl: 'templates/sandbox.html',
      controller: 'SandboxCtrl',
      data : { pageTitle: 'Sandbox' }
    })
    .state('sandbox-key', {
      url: '/sandbox/{key}',
      templateUrl: 'templates/sandbox.html',
      controller: 'SandboxCtrl',
      data : { pageTitle: 'Sandbox' }
    })
    .state('community', {
      url: '/community',
      templateUrl: 'templates/community.html',
      controller: 'CommunityCtrl',
      data : { pageTitle: 'Community' }
    })
    .state('advanced-reference', {
      url: '/advanced-reference',
      templateUrl: 'templates/advanced-reference.html',
      controller: 'AdvancedReferenceCtrl',
      data : { pageTitle: 'API Reference' }
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
    	templateUrl: 'templates/tutorials.html',
      data : { pageTitle: 'Tutorials' }
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


  // Check to see if they want to subscribe
  // http://eepurl.com/bvmnGP
}]);
