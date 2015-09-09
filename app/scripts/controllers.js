var app = angular.module('BuildWithTrelloControllers', []);


app.controller('OverviewCtrl', function($scope) {

});

app.controller('SandboxCtrl', function($scope, $http, $sce, $timeout, $window, $location) {
  $scope.key = localStorage["applicationKey"];

  $scope.connect  = function() {
    if(!$scope.key) {
      $scope.error = "You must enter a valid key to proceed.";
      return;
    }
    
    
    var scriptZone = document.getElementById('scriptZone');
    var client = document.createElement("script");
    
    $scope.url = "https://api.trello.com/1/client.js?key=" + $scope.key;
    client.src = $scope.url;

    scriptZone.appendChild(client);
    $scope.connected = true;

    $window.ga('send', 'pageview', { page: ($location.path() + "/connected") });
    $window.sp('trackPageView', $location.protocol() + '//' + $location.host() + $location.path() + "/connected" );

  };
  
  $scope.saveKey = function() {
    localStorage["applicationKey"] = $scope.key;
    $scope.saved = true;
  }
  
  $scope.clearKey = function() {
    localStorage["applicationKey"]
    $scope.saved = false;
    localStorage.removeItem("applicationKey");
    $scope.key = "";
    $scope.connected = false;
  }

  $scope.authenticate = function() {
	$scope.waitingForResolution = false;
    Trello.authorize({
      type: 'popup',
      name: 'Sandbox Trello Application',
      scope: {read: true, write: true, account: true},
      expiration: "never",
      success: $scope.authenticationSuccess,
      error: $scope.authenticationError
    });
	$scope.waitingForResolution = true;

  };

  $scope.authenticationSuccess = function() {
	var finishAuth = function() {

		$scope.authenticated = true;
		$scope.token = Trello.token();
		console.log("Authentication was successful! (Token: " + $scope.token + ")");
		$window.ga('send', 'pageview', { page: ($location.path() + "/" + $scope.codes[0]) });
		$window.sp('trackPageView', $location.protocol() + '//' + $location.host() + $location.path() + "/" + $scope.codes[0] );
	};
	if($scope.waitingForResolution) {
		$scope.$apply(finishAuth);
	} else {
		finishAuth();
	}
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
    	if(msg && msg.status === 401) {
    		Trello.deauthorize();
    		$scope.authenticated = false;
    		console.warn("Clearing token and logging the user out based on expired token.");
    	}
      output(msg);
    });
  };

  $scope.run = function(codeSource) {
    console.log("About to run");
    console.log(codeSource);
    /*jslint evil: true */
    eval(codeSource);
    console.log("Finished running.");
  };

  $scope.codeContent = [];
  $scope.codes = ["getBoards", "getLists", "createCard", "createWebhook", "getWebhooks"];
  $scope.codeNames = ["Get Boards", "Get Lists", "Create Card", "Create Webhook", "Get Webhooks"];

  // Create a method that generates methods to be called upon sucessful load of Javascript
  // from the filesystem
  var attachTo = function(codeName) {
    return function(output) {
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


	// Register the tabs with analytics and respond to example selection
	$scope.selectSample = function(number) {
		$window.ga('send', 'pageview', { page: ($location.path() + "/" + $scope.codes[number]) });
    $window.sp('trackPageView', $location.protocol() + '//' + $location.host() + $location.path() + "/" + $scope.codes[number] );
		var name = $scope.codes[number];
		$scope.selectedCodeIndex = number;
	};
	$scope.selectSample(0);

  // Handle key loading / saving on load
  if($scope.key) {
    $scope.saved = true;
    $scope.connect();
  }


});

app.controller('CommunityCtrl', function($scope, $window) {
  $scope.wrappers = [
    {'name':'Ruby',author:'Jeremy Tregunna', url: 'https://github.com/jeremytregunna/ruby-trello'}
    , {name:'Node', author:'Luca Matteis', url: 'https://github.com/lmatteis/node-trello'}
    , {name:'Python', author:'Richard Kolkovich', url: 'https://github.com/sarumont/py-trello '}
    , {name:'Python', author:'Luke Rigby', url: 'https://github.com/plish/Trolly'}
    , {name:'Python', author:'Brent Tubbs', url: 'https://bitbucket.org/btubbs/trollop'}
    , {name:'.NET', author:'Greg Dennis', url: 'https://bitbucket.org/gregsdennis/manatee.trello'}
  ];

  $scope.samples = [
    {name:'Trello Calendar', author:'Francois Metz',url:'https://github.com/francois2metz/trello-calendar'},
    {name:'Cardorizer', author:'Mark Drago',url:'https://github.com/markdrago/cardorizer'},
    {name:'Trello Bookmarklet', author:'Daniel LeCheminant',url:'https://github.com/danlec/Trello-Bookmarklet'},
    {name:'Trellobo', author:'Oisín Hurley',url:'https://github.com/oisin/trellobo'},
    {name:'taskboards', author:'Jake Ginnivan',url:'https://bitbucket.org/JakeGinnivan/taskboards'},
    {name:'Read Cards jsfiddle', author: 'Daniel LeCheminant',url:'http://jsfiddle.net/nNesx/'},
    {name:'Add Comment jsfiddle', author: 'Daniel LeCheminant',url:'http://jsfiddle.net/E4rLn/'}
  ];

  $scope.open = function(url) {
    console.log("opening the url: " + url);
    $window.open(url, '_blank');
  };

});



app.controller('GetStartedCtrl', function($scope, $location, $anchorScroll, $window) {
	$scope.scrollTo = function(destination) {
		$location.hash(destination);
		$anchorScroll();
	};

	$scope.openAppKey = function() {
		$window.open('https://trello.com/app-key', '_blank');
	};


});

app.controller('AdvancedReferencePageCtrl', function($scope, $http, $location){
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

  $('.headerlink').each(
  	function(i) {
  		$(this).attr('href',$location.path() + $(this).attr('href') ); 
  		$(this).text('link');
  	}
  );

});
