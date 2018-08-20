$(function()
{
    window.debugConsole = function(m) {console.info(m)};
    // window.debug.info = function(m) {};

    window.$body = $('#main-container');
    window.loading = new Loading();
    window.gg = new Game();
    window.socket = io('localhost:3600');
    window.ss = new ServicesController();

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
    ChatResponse();
    errorResponse();
    window.socket.emit('init_hero');
    window.loading.hide(500);
}