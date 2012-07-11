function MainScreen(container) {
    this.container = container;
    eve.on('client.connect', _.bind(this.displayConnectingDialog, this));
    eve.on('client.connected', _.bind(this.displayConnected, this));
    eve.on('lobby.ListGames', _.bind(this.listGames, this));
}

MainScreen.prototype.show = function() {
    
    this.container.html(SupplyChain.templates['main']());
    this.displayConnectDialog();
}

MainScreen.prototype.displayConnectDialog = function() {
    $('.options', this.container).html(SupplyChain.templates['main/connect']());
    $('#connectForm', this.container).bind('submit', _.bind(this.connect, this));
}

MainScreen.prototype.connect = function(evt) {
    var playerName = $('#connectForm #playerName').val();
    console.log(playerName);
    eve('player.name', null, playerName);
    eve('client.connect');
    return false;
}

MainScreen.prototype.displayConnectingDialog = function() {
    $('.options', this.container).html(SupplyChain.templates['main/connecting']());
}

MainScreen.prototype.displayConnected = function() {
    $('.options', this.container).html(SupplyChain.templates['main/connected']());
    $('#newGame', this.container).bind('submit', function(evt) {
        var gameName = $('#newGame #gameName').val();
        eve('client.newGame', null, gameName);
        return false;
    });

}

MainScreen.prototype.listGames = function(data) {
    console.log(data);
    $('.gamelist', this.container).html(SupplyChain.templates['main/gameList'](data));
}