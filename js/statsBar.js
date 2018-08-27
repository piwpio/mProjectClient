StatsBar = function()
{
    this.$this = $('#game-stats-bar');
    this.$location = $('#stats-bar-location');
    this.$hp = $('#stats-bar-hp');
    this.$exp = $('#stats-bar-exp');

    this.init();
};

StatsBar.prototype.init = function()
{
    // this.$hp.on('click', function() {
    //     document.body.webkitRequestFullScreen();
    // });
};

StatsBar.prototype.renderLocation = function(location)
{
    this.$location.text('LOC:' + location);
};

StatsBar.prototype.renderHp = function(hp)
{
    this.$hp.text('HP:' + hp);
};

StatsBar.prototype.renderExp = function(exp)
{
    console.log(exp);
    this.$exp.text('EXP:' + exp);
};

