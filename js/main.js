$(function()
{
    window.debugError = function(m) {console.error(m)};
    window.debugConsole = function(m) {console.info(m)};
    // window.debugError = function(m) {};
    // window.debugConsole = function(m) {};


    window.$body = $('#main-container');
    window.loading = new Loading();
    window.gg = new Game();
    window.ss = new ServicesController();
    window.socket = io('localhost:3600');

    //init connection
    window.socket.on('checksum', function(code) {
        if (code !== window.ss.staticData().getControlCode()) {
            window.socket.on('static_data', function(staticData) {
                window.ss.staticData().setControlCodeAndStaticData(code, staticData);
                startGame();
            });
            window.socket.emit('static_data');
        } else {
            startGame()
        }
    });
    window.socket.on('connected', function() {
        window.socket.emit('checksum');
    });

});

function startGame()
{
    HeroResponse();
    LocationResponse();
    NewLocationResponse();
    ChatResponse();
    errorResponse();
    window.socket.emit('init_hero');
    window.loading.hide(500);
}