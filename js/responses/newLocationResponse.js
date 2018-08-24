NewLocationResponse = function()
{
    window.socket.on('new_location_response', function(newLocation) {
        window.ll.render(newLocation['id'], newLocation['heroes'], newLocation['enemies']);
    });
};