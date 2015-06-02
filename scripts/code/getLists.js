// Get all of the information about the list from a public board

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

Trello.get('/boards/555c8e81e8d5aff570505f5b/lists', success, error);