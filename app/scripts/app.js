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
      templateUrl: "templates/get-started.html"
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
    });
});