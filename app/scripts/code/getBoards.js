var board = "555c8e81e8d5aff570505f5b";

var success = function(successMsg) {
  output(successMsg);
};

var error = function(errorMsg) {
  output("error: " + errorMsg);
};

Trello.get('/boards/' + board, success, error);