// Get all of the information about the boards you have access to

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

Trello.get('/member/me/boards', success, error);
