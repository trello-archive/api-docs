// Retrieve a list of your tokens, and include any webhooks

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

Trello.get('/members/me/tokens?webhooks=true', success, error);