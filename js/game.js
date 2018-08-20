Game = function()
{
    this.init();
};

Game.prototype.init = function()
{
    let self = this;
    this.createView()
        .done(function() {
            self.statsBar = new StatsBar();
            self.buttonEast = new MoveButton('#game-button-east', 'move_east');
            self.buttonWest = new MoveButton('#game-button-west', 'move_west');
        });
};

Game.prototype.createView = function()
{
    let def = $.Deferred();
    window.$body.load( "/html/templates/game.html", function() {
        def.resolve();
    });
    return def;
};