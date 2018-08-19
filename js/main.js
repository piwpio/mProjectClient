$(function() {
    window.debugMessage = function(m) {console.info(m)};
    // window.debug.info = function(m) {};

    window.$body = $('#main-container');
    window.loading = new Loading();
    window.game = new Game();

    window.socket = io('localhost:3600');
    socket.on('connected', function() {
        HeroResponse();
        LocationResponse();
        ChatResponse();
        errorResponse();
        socket.emit('init_hero');
        window.loading.hide(500);
    });
});