$(function() {
    window.$body = $('#main-container');
    window.loading = new Loading();
    window.game = new Game();

    window.loading.hide();
});