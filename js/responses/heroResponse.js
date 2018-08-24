HeroResponse = function()
{
    window.socket.on('hero_response', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                window.hh.setField(key, response[key]);
            }
        }
    });
};