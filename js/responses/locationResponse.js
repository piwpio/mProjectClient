LocationResponse = function() {
    window.socket.on('location_response', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.debugMessage(key);
                window.debugMessage(response[key]);
            }
        }
    });
};