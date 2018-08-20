HeroResponse = function() {
    window.socket.on('hero_response', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.debugConsole(key);
                window.debugConsole(response[key]);
            }
        }
    });
};