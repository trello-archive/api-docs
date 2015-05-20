var app = angular.module('BuildWithTrelloControllers', []);

app.controller('OverviewCtrl', function($scope) {
  
});

app.controller('SandboxCtrl', function($scope, $http, $sce) {
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
    $scope.outputMessages = $sce.trustAsHtml( syntaxHighlight(msg) );
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
  
  var syntaxHighlight = function(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
      
});

app.controller('CommunityCtrl', function($scope, $window) {
  $scope.wrappers = [
    {'name':'Ruby',author:'Jeremy Tregunna', url: 'https://github.com/jeremytregunna/ruby-trello'}
    , {name:'Node', author:'L Matteis', url: 'https://github.com/lmatteis/node-trello'}
    , {name:'Python', author:'Sarumont', url: 'https://github.com/sarumont/py-trello '}
    , {name:'Python', author:'Plish', url: 'https://github.com/plish/Trolly'}
    , {name:'Python', author:'btubs', url: 'https://bitbucket.org/btubbs/trollop'}
    , {name:'.NET', author:'greggs dennis', url: 'https://bitbucket.org/gregsdennis/manatee.trello'}
  ];

  $scope.open = function(url) {
    console.log("opening the url: " + url);
    $window.open(url, '_blank');
  }

});


