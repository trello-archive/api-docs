// Get all of the information about the boards you have access to

var success = function(successMsg) {
  asyncOutput(successMsg);
};

var error = function(errorMsg) {
  asyncOutput(errorMsg);
};

Trello.get('/member/me/boards', success, error);

//Trello.post('/webhooks', {description: "do cool stuff", callbackURL: 'http://mortalpowers.com/hook.php', idModel:'555c8e8438613a1b6f665efc'}, success, error);
//Trello.get('/tokens/6ce9e4bf456928dd731f1e2d2ce8d94ed007aaf54924720ec2fe42f2d7d19bf1/webhooks',success,error);