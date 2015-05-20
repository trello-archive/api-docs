// Get all of the information about the boards you have access to

var success = function(successMsg) {
  output(successMsg);
};

var error = function(errorMsg) {
  output("error: " + errorMsg);
};

Trello.get('/member/me/boards', success, error);