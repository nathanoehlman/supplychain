// dep: eve, async, underscore, registry, handlebars, jquery

//= plugin://collate templates

var templates = {};
for (resource in _templates) {
    templates[resource] = Handlebars.compile(_templates[resource]);
}

SupplyChain = {
    templates: templates
}

//= client/client.js
//= interface/interface.js

$(document).ready(function() {
    
    var client = new SupplyChainClient('ws://localhost:3554'),
        gameInterface = new GameInterface(client);
    
});