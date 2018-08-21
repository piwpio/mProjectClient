StatsBar = function()
{
    this.$this = $('#game-stats-bar');
    this.$location = $('#stats-bar-location');
    this.$hp = $('#stats-bar-hp');
};

StatsBar.prototype.renderLocation = function(location)
{
    this.$location.text('LOC:' + location);
};

StatsBar.prototype.renderHp = function(hp)
{
    this.$hp.text('HP:' + hp);
};

