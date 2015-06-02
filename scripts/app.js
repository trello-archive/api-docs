app = angular.module('BuildWithTrello', ['BuildWithTrelloControllers', 'ui.router','ngMaterial']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/overview");
  
  $stateProvider
    .state('overview', {
      url: "/overview",
      templateUrl: "templates/overview.html",
      controller: 'OverviewCtrl'
    })
    .state('get-started', {
      url: "/get-started",
      templateUrl: "templates/get-started.html",
      controller: 'GetStartedCtrl'
    })
    .state('apis', {
      url: "/apis",
      templateUrl: "templates/apis.html"
    })
    .state('sandbox', {
      url: '/sandbox',
      templateUrl: 'templates/sandbox.html',
      controller: 'SandboxCtrl'
    })
    .state('community', {
      url: "/community",
      templateUrl: "templates/community.html",
      controller: 'CommunityCtrl'
    })
    .state('advanced-reference', {
      url: "/advanced-reference",
      templateUrl: "templates/advanced-reference.html"
    });
});

app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
     $rootScope
        .$on('$stateChangeSuccess',
            function(event){
 
                if (!$window.ga)
                    return;
 
                $window.ga('send', 'pageview', { page: $location.path() });
        });
}]);