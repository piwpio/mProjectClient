Game = function()
{
    this.init();
};

Game.prototype.init = function()
{
    let self = this;
    this.createView()
        .done(function() {
            window.ll = new Locations();
            window.hh = new Hero();
            self.statsBar = new StatsBar();
            self.buttonEast = new MoveButton('#game-button-east', 'move_east');
            self.buttonWest = new MoveButton('#game-button-west', 'move_west');
            self.chat = new Chat();
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