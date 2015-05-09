var app = angular.module('BuildWithTrelloControllers', []);

app.controller('OverviewCtrl', function($scope) {
  
});

app.controller('SandboxCtrl', function($scope, $http) {
  // Get rid of this in production
  $scope.key = "167e94d08df6c0cb0dbc7e2f274bd654";
  
  $scope.connect  = function() {
    var scriptZone = document.getElementById('scriptZone');
    var client = document.createElement("script");
    
    $scope.url = "https://api.trello.com/1/client.js?key=" + $scope.key;
    client.src = $scope.url;
    
    scriptZone.appendChild(client);
    $scope.connected = true;
  };
  
  $scope.authenticate = function() {
    Trello.authorize({
      type: 'popup',
      name: 'Sandbox Trello Application',
      scope: {read: true, write: true},
      success: $scope.authenticationSuccess,
      error: $scope.authenticationError
    });
    
  };
  
  $scope.authenticationSuccess = function() {
    $scope.authenticated = true;
  };
  
  $scope.authenticationError = function(error) {
    $scope.authenticationErrorMessage = error;
  };
  
  var output = function(msg) {
    document.getElementById('output').innerText += msg;
  };
  
  $scope.run = function(codeSource) {
    console.log("About to run");
    console.log(codeSource);
    /*jslint evil: true */
    eval(codeSource);
  };
  
  $scope.codeContent = [];
  var codes = ["getBoards", "createCard"];
  
  var attachTo = function(codeName) {
    console.log("Creating attach function.");
    return function(output) {
      console.log("Executing attach function.");
      console.log("HTTP pulled '" + codeName + "': " + output); 
      $scope.codeContent[codeName] = output;
    };
    
  };
  
  console.log("Running through codes.");
  for(i = 0;i<codes.length;i++) {
    console.log("Running code #" + i);
    $http.get('scripts/code/' + codes[i] + ".js", {
      transformResponse: undefined
    }).success( attachTo( codes[i] ) );
  }
  
  
      
});
