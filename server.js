var config = require('config'),
    GameServer = require('gamebase-gameserver'),
    server;

/**
  The SupplyChainGame server
 **/
function SupplyChainServer(config) {
    this.server = null;
    this.config = config;
}

SupplyChainServer.prototype.start = function() {    
    var me = this;    
    this.server = new GameServer(this.config.server, function(err) {
        if (err) {
            console.log('Supply Chain server could not be started [' + err + ']');
            return;
        }
    });
    this.server.on('clientConnected', function(client) {
        console.log('Client connected');
    });
}

server = new SupplyChainServer(config);
server.start();
