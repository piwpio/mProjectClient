StatsBar = function()
{
    this.$this = $('#game-stats-bar');
    this.$location = $('#stats-bar-location');
};

StatsBar.prototype.renderLocation = function(location)
{
    this.$location.text(location);
};

