errorResponse = function() {
    window.socket.on('response_error', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.debugConsole(key);
                window.debugConsole(response[key]);
            }
        }
    });
};