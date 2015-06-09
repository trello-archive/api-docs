// Get all of the information about the boards you have access to

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};
var p = {urls: ["/boards/544803ec3c397d80c328c685/","/boards/5332e08764df8ed02481c7e9/lists"]};
Trello.get('/batch',p, success, error);
