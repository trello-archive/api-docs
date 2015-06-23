var app = angular.module('BuildWithTrelloControllers', []);

app.controller('OverviewCtrl', function($scope) {

});

app.controller('SandboxCtrl', function($scope, $http, $sce, $timeout, $window, $location) {
  // Get rid of this in production
  $scope.key = "167e94d08df6c0cb0dbc7e2f274bd654";


  $scope.connect  = function() {
    var scriptZone = document.getElementById('scriptZone');
    var client = document.createElement("script");

    $scope.url = "https://api.trello.com/1/client.js?key=" + $scope.key;
    client.src = $scope.url;

    scriptZone.appendChild(client);
    $scope.connected = true;

    $window.ga('send', 'pageview', { page: ($location.path() + "/connected") });

  };

  $scope.authenticate = function() {
    Trello.authorize({
      type: 'popup',
      name: 'Sandbox Trello Application',
      scope: {read: true, write: true, account: true},
      success: $scope.authenticationSuccess,
      error: $scope.authenticationError
    });

  };

  $scope.authenticationSuccess = function() {
    //$scope.$apply(function() {
	    $scope.authenticated = true;
	    console.log("Authentication was successful!");
	    $scope.token = Trello.token();
	//});
 	$window.ga('send', 'pageview', { page: ($location.path() + "/" + $scope.codes[0]) });
  };

  $scope.authenticationError = function(error) {
    $scope.authenticationErrorMessage = error;
  };

  var output = function(msg) {
    console.log("Starting output.");

    console.log("Scope applying output");
    $scope.outputMessages = $sce.trustAsHtml( syntaxHighlight(msg) );
    console.log("Done output.");
  };

  var asyncOutput = function(msg) {
    $scope.$apply(function() {
      output(msg);
    });
  }

  $scope.run = function(codeSource) {
    console.log("About to run");
    console.log(codeSource);
    /*jslint evil: true */
    eval(codeSource);
    console.log("Finished running.");
  };

  $scope.codeContent = [];
  $scope.codes = ["getBoards", "getLists", "createCard", "createWebhook", "getWebhooks"];

  var attachTo = function(codeName) {
    //console.log("Creating attach function.");
    return function(output) {
      //console.log("Executing attach function.");
      //console.log("HTTP pulled '" + codeName + "': " + output);
      $scope.codeContent[codeName] = output;
    };

  };

  //console.log("Running through codes.");
  for(i = 0;i<$scope.codes.length;i++) {
    //console.log("Running code #" + i);
    $http.get('scripts/code/' + $scope.codes[i] + ".js", {
      transformResponse: undefined
    }).success( attachTo( $scope.codes[i] ) );
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


	// Register the tabs with analytics by watching selected index
	$scope.$watch('selectedCodeSample', function(newValue, oldValue) {
		$window.ga('send', 'pageview', { page: ($location.path() + "/" + $scope.codes[newValue]) });
	});

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

  $scope.samples = [
    {name:'Trello Calendar', author:'Francois Metz',url:'https://github.com/francois2metz/trello-calendar'},
    {name:'Cardorizer', author:'Mark Drago',url:'https://github.com/markdrago/cardorizer'},
    {name:'Trello Bookmarklet', author:'danlec',url:'https://github.com/danlec/Trello-Bookmarklet'},
    {name:'Trellobo', author:'oisin',url:'https://github.com/oisin/trellobo'},
    {name:'taskboards', author:'Jake Ginnivan',url:'https://bitbucket.org/JakeGinnivan/taskboards'}
  ];

  $scope.open = function(url) {
    console.log("opening the url: " + url);
    $window.open(url, '_blank');
  }

});



app.controller('GetStartedCtrl', function($scope, $location, $anchorScroll) {
	$scope.scrollTo = function(destination) {
		$location.hash(destination);
		$anchorScroll();
	}


});

app.controller('AdvancedReferencePageCtrl', function($scope, $http){
  // We want to collapse the arguments section so people can more easily scan
  // the routes. Since we autogenerate the full API reference docs from the
  // server using Sphinx, doing this client side allows us to add the toggle
  // without having to modify the HTML from the server.

  var i, len, section, sections;

  var sections = $('.section').find('strong');

  for (i = 0, len = sections.length; i < len; i++) {
    $section = $(sections[i]);
    if ($section.text() == "Arguments") {
      $parent = $section.parent().addClass('js-section');
      $list = $parent.find('ul').addClass('js-list u-hidden');
      $button = $("<button>").addClass('mod-inline js-toggle-list').text("Show");
      $section.append(" ").append($button);
    };
  };

  $('.sphinxsidebar').remove();

});
