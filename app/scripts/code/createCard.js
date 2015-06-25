// Set the destination list for the new card
var destinationList = "";

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput("error: " + errorMsg);
};

var newCard = 
  {name: "I just created a new card!", 
  desc: "Using the Trello API is fun and easy!",
  pos: "top", 
  due: null,
  idList: destinationList
  };

Trello.post('/cards/', newCard, success, error);