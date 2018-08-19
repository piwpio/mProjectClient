errorResponse = function() {
    window.socket.on('response_error', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.debugMessage(key);
                window.debugMessage(response[key]);
            }
        }
    });
};