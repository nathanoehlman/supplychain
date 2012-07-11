//= main/main

function GameInterface(client) {    
    this.client = client;    
    this.container = $('#game');
    
    this.screens = {
        main: new MainScreen(this.container)
    }
    
    this.init();
}

GameInterface.prototype.init = function() {    
    this.screens.main.show();    
}