var scoutProtoType = require('./scout_prototype');

var alex = scoutProtoType.clone();
alex.name = 'Alex Banks'
alex.addItemToList('slingshot');

var eve = scoutProtoType.clone();
eve.name = 'Eve Porcello';
eve.addItemToList('reading light');

console.log(`${alex.name} : ${alex.shoppingList}`);
console.log(`${eve.name}: ${eve.shoppingList}`);