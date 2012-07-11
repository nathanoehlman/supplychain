var gamebaseEconomy = require('gamebase-economy');

/**
  Creates a new supply chain game with the passed in game server information
 **/
function SupplyChainGame(server) {
    this.server = this;
    this.started = false;
    console.log('new game created');    
}

SupplyChainGame.prototype.start = function() {

    this.createWorld();
    this.started = true;

}

SupplyChainGame.prototype.createWorld = function() {

    this.world = new gamebaseEconomy.Economy();
    
    var farmland = new Farmland(),
        industrial = new Industrial(),
        commercial = new Commercial();
        city = new City();
        
    // Connect the world such that the city connects everything else together
    this.world.insertNode(city);
    this.world.insertNode(farmland, [{node: city.id, distance: 10}]);
    this.world.insertNode(industrial, [{node: city.id, distance: 10}]);
    this.world.insertNode(commercial, [{node: city.id, distance: 10}]);    
}



module.exports = SupplyChainGame;