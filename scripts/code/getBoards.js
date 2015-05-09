var board = "4d5ea62fd76aa1136000000c";

var success = function(successMsg) {
  output(successMsg);
};

var error = function(errorMsg) {
  output(errorMsg);
};

Trello.get('/boards', success, error);