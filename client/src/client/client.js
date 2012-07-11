//= messages!

/**
  Game client for interacting with the SupplyChain server
 **/
function SupplyChainClient(serverUrl, options) {
    this.serverUrl = serverUrl;
    this.options = options;
    this.connection = null;
    this.connected = false;
    
    eve.on('client.connect', _.bind(this.connect, this));
    eve.on('client.newGame', _.bind(this.newGame, this));
}

SupplyChainClient.prototype.connect = function() {
    
    console.log('connect');
    var client = this;
    if (this.connected == true) return;    
    
    this.connection = new WebSocket(this.serverUrl);
    
    this.connection.onopen = function() {
        client.refreshGameList();
        client.connected = true;
        eve('client.connected');
    }
    
    this.connection.onmessage = function(evt) {
        
        var message = MessageParser.parse(evt.data);
        
        if (message) {
            
            switch(message.type) {
                case 'lobby': {
                    eve('lobby.' + message.operationName, null, message.data);
                };
                case 'game': {
                    console.log('game message');
                };
            }
            
        } else {
            console.log('could not parse');
        }
    }
    
    this.connection.onclose = function() {
        client.connected = false;
    }
    
    this.connection.onerror = function() {
        console.log('Could not connect');
    }
}

/**
  Send the game refresh request
 **/
SupplyChainClient.prototype.refreshGameList = function() {
    this.connection.send(LobbyMessage.format(1));
}

/**
  Creates a new game
 **/
SupplyChainClient.prototype.newGame = function(name) {
    this.connection.send(LobbyMessage.format(10, 1, {gameName: name}));
    this.refreshGameList();
}