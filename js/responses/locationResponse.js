LocationResponse = function() {
    window.socket.on('location_response', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.debugConsole(key);
                window.debugConsole(response[key]);
            }
        }
    });
};