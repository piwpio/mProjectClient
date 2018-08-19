$(function() {
    window.debugMessage = function(m) {console.info(m)};
    // window.debug.info = function(m) {};

    window.$body = $('#main-container');
    // window.socket = io();
    window.loading = new Loading();
    window.game = new Game();

    window.loading.hide();
});