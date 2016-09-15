app = angular.module('BuildWithTrello', ['BuildWithTrelloControllers', 'ReviewBarDirective', 'ui.router','ngMaterial', 'ngOpbeat']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $opbeatProvider) {
  $opbeatProvider.config({
    debug: false,
    orgId: '411adc346fa34378a00c88e9de15c529',
    appId: '2428462d71'
  });

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/power-ups', '/power-ups/intro');
  $urlRouterProvider.when('/power-ups/', '/power-ups/intro');


  $stateProvider
    .state('overview', {
      url: '/',
      templateUrl: 'templates/overview.html',
      controller: 'OverviewCtrl'
    })
    .state('get-started', {
      url: '/get-started/',
      templateUrl: 'templates/get-started.html',
      controller: 'GetStartedCtrl',
      data : { pageTitle: 'Get Started' }
    })
	    .state('get-started.start-building', {
	      url: 'start-building',
	      templateUrl: 'templates/apis/start-building.html',
	      controller: 'GetStartedCtrl',
	      data : { pageTitle: 'Start Building' }
	    })
	    .state('get-started.intro', {
	      url: 'intro',
	      templateUrl: 'templates/apis/intro.html',
	      data : { pageTitle: 'API Introduction' }
	    })
    .state('clientjs', {
      url: '/clientjs',
      templateUrl: 'templates/apis/clientjs.html',
      data : { pageTitle: 'Client.js' }
    })
    .state('add-card', {
      url: '/add-card',
      templateUrl: 'templates/apis/add-card.html',
      data : { pageTitle: 'Add Card Share Intent' }
    })
    .state('oauth', {
      url: '/oauth',
      templateUrl: 'templates/apis/oauth.html',
      data : { pageTitle: 'OAuth' }
    })
    .state('authorize', {
      url: '/authorize',
      templateUrl: 'templates/apis/authorize.html',
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
      templateUrl: 'templates/apis/sandbox.html',
      controller: 'SandboxCtrl',
      data : { pageTitle: 'Sandbox' }
    })
    .state('sandbox-key', {
      url: '/sandbox/{key}',
      templateUrl: 'templates/apis/sandbox.html',
      controller: 'SandboxCtrl',
      data : { pageTitle: 'Sandbox' }
    })
    .state('community', {
      url: '/community',
      templateUrl: 'templates/apis/community.html',
      controller: 'CommunityCtrl',
      data : { pageTitle: 'Community' }
    })
    .state('advanced-reference', {
      url: '/advanced-reference',
      templateUrl: 'templates/apis/advanced-reference.html',
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
    	templateUrl: 'templates/api/tutorials.html',
      data : { pageTitle: 'Tutorials' }
    })
    .state('tutorial-page', {
    	url: '/tutorials/{page}',
    	templateUrl:
    		function(stateParams) {
    			return 'templates/tutorials/' + stateParams.page + '.html';
    		}
    })
    .state('power-ups', {
  		url: '/power-ups/',
  		abstract:true,
  		redirectTo: 'power-ups.intro',
  		templateUrl: 'templates/power-ups.html',
  		data : { pageTitle: 'Power-Ups Documentation' }
    })
		.state('power-ups.intro', {
			url: 'intro',
			templateUrl: 'templates/power-ups/intro.html',
			data : { pageTitle: 'Power-Ups Intro' }
		})
		.state('power-ups.architecture', {
			url: 'architecture',
			templateUrl: 'templates/power-ups/architecture.html',
			data : { pageTitle: 'Power-Ups Architecture' }
		})
		.state('power-ups.capabilities', {
			url: 'capabilities',
			templateUrl: 'templates/power-ups/capabilities.html',
			data : { pageTitle: 'Power-Ups Capabilities' },
			controller: 'CapabilitiesCtrl'
		})
		.state('power-ups.client-library', {
			url: 'client-library',
			templateUrl: 'templates/power-ups/client-library.html',
			data : { pageTitle: 'Power-Ups Client Library' }
		})
		.state('power-ups.topics', {
			url: 'topics',
			templateUrl: 'templates/power-ups/topics.html',
			data : { pageTitle: 'Power-Ups Topics' }
		})
    .state('power-ups.style', {
      url: 'style',
      templateUrl: 'templates/power-ups/style.html',
      data : { pageTitle: 'Style' }
    })
    .state('quality-report', {
      url: '/quality-report',
      controller: 'QualityReportCtrl',
      templateUrl: 'templates/quality-report.html',
      data : { pageTitle: 'Documentation Quality Report' }
    });
});

app.run(['$rootScope', '$location', '$window', '$anchorScroll', function($rootScope, $location, $window, $anchorScroll){
  $rootScope
    .$on('$stateChangeSuccess',
      function(event){
        $anchorScroll();
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
