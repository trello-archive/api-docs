// To retreive a list of webhooks, query your current token

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

Trello.get('/tokens/TOKEN/webhooks', success, error);