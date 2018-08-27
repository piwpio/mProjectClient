LocationResponse = function()
{
    window.socket.on('location_response', function(response) {
        for (let key in response){
            if (response.hasOwnProperty(key)) {
                if (response.hasOwnProperty(key)) {
                    let data = response[key];
                    console.log(key);
                    console.log(data);
                    if (key === 'enemy_remove') {
                        window.ll.removeEnemyDynamic(data);
                    } else if (key === 'enemy_add') {
                        window.ll.addEnemyDynamic(data);
                    } else if (key === 'hero_remove') {
                        window.ll.removeHeroDynamic(data);
                    } else if (key === 'hero_add') {
                        window.ll.addHeroDynamic(data);
                    } else {
                        window.ll.setField(key, data);
                    }
                }
            }
        }
    });
};