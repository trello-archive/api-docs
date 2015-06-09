// Register a webhook on the identified list

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

var parameters = {
	description: "A sample webhook created from the sandbox on a list",
	callbackURL: "http://example.com/YOURURL",
	idModel: "555c8e8438613a1b6f665efc"
};

Trello.post('/webhooks/', parameters, success, error);