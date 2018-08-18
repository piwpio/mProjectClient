Game = function() {
    this.init();
};

Game.prototype.init = function()
{
    this.createView();
};

Game.prototype.createView = function()
{
    window.$body.load( "/html/templates/game.html", function() {

    });
};