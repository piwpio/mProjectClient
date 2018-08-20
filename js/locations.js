Locations = function()
{
    this.$location1 = $('#game-location-1');
    this.$location2 = $('#game-location-2');
    this.$location3 = $('#game-location-3');
};

Locations.prototype.render = function(locationId)
{
    window.gg.statsBar.renderLocation(locationId);
    let location = window.ss.staticData().getStaticData()['locations'][locationId] || {};
    if (location) {
        if (location.moves !== undefined) {
            window.gg.buttonEast.setActive(location.moves.east !== undefined);
            window.gg.buttonWest.setActive(location.moves.west !== undefined);
        }
    }
};