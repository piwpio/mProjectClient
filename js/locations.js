Locations = function()
{
    this.$container1 = $('#game-location-1');
    this.$container2 = $('#game-location-2');
    this.$container3 = $('#game-location-3');
    this.$container1Elements = {
        $background: $('.location-background',this.$container1),
        $floor: $('.location-floor',this.$container1),
        $enemiesContainer: $('.location-floor .location-floor-enemies',this.$container1),
        $heroesContainer: $('.location-floor .location-floor-heroes',this.$container1),
    };
    this.$container2Elements = {
        $background: $('.location-background',this.$container2),
        $floor: $('.location-floor',this.$container2),
        $enemiesContainer: $('.location-floor .location-floor-enemies',this.$container2),
        $heroesContainer: $('.location-floor .location-floor-heroes',this.$container2),
    };
    this.$container3Elements = {
        $background: $('.location-background',this.$container3),
        $floor: $('.location-floor',this.$container3),
        $enemiesContainer: $('.location-floor .location-floor-enemies',this.$container3),
        $heroesContainer: $('.location-floor .location-floor-heroes',this.$container3),
    };

    this.currentLocationId = null;
    this.westLocationId = null;
    this.eastLocationId = null;
    this.westLocationContainerNo = 1;
    this.eastLocationContainerNo = 3;
    this.currentLocationContainerNo = 2;
};

Locations.prototype.render = function(locationId, heroes, enemies)
{
    window.gg.statsBar.renderLocation(locationId);
    let location = window.ss.staticData().getStaticData()['locations'][locationId] || {};
    if (location) {
        //NOTE set heroes on location
        if (heroes) {
            window.debugConsole(heroes);
        }

        //NOTE set enemies on location
        if (enemies) {
            window.debugConsole(enemies);
        }

        if (this.currentLocationId === null) {
            this.initLocation(2, locationId);
        }
        this.currentLocationId = locationId;
        this.currentLocationId = locationId;

        //NOTE animation
        let moveDirection = null;
        if (locationId === this.westLocationId) {
            this.getContainer(this.westLocationContainerNo).velocity({left: '0'}, {easing: 'linear', duration: 300});
            this.getContainer(this.currentLocationContainerNo).velocity({left: '100%'}, {easing: 'linear', duration: 300});
            this.getContainer(this.eastLocationContainerNo).css('left', '-100%');

            let tmp = this.currentLocationContainerNo;
            this.currentLocationContainerNo = this.westLocationContainerNo;
            this.westLocationContainerNo = this.eastLocationContainerNo;
            this.eastLocationContainerNo = tmp;
            moveDirection = 'west';
        } else if (locationId === this.eastLocationId) {
            this.getContainer(this.eastLocationContainerNo).velocity({left: '0'}, {easing: 'linear', duration: 300});
            this.getContainer(this.currentLocationContainerNo).velocity({left: '-100%'}, {easing: 'linear', duration: 300});
            this.getContainer(this.westLocationContainerNo).css('left', '100%');

            let tmp = this.currentLocationContainerNo;
            this.currentLocationContainerNo = this.eastLocationContainerNo;
            this.eastLocationContainerNo = this.westLocationContainerNo;
            this.westLocationContainerNo = tmp;
            moveDirection = 'east';
        }

        //NOTE init of neighbour locations if can go there
        if (location.moves !== undefined) {
            if (location.moves.west !== undefined) {
                this.westLocationId = location.moves.west;
                if (moveDirection === 'west') {
                    this.initLocation(this.westLocationContainerNo, this.westLocationId);
                }
                window.gg.buttonWest.setActive(true);

            } else {
                this.westLocationId = null;
                window.gg.buttonWest.setActive(false);
            }

            if (location.moves.east !== undefined) {
                this.eastLocationId = location.moves.east;
                if (moveDirection === 'east') {
                    this.initLocation(this.eastLocationContainerNo, this.eastLocationId);
                }
                window.gg.buttonEast.setActive(true);
            } else {
                this.eastLocationId = null;
                window.gg.buttonEast.setActive(false);
            }
        }
    }
};
Locations.prototype.addEnemy = function(enemy)
{

};

Locations.prototype.addHero = function(hero)
{

};

Locations.prototype.getContainer = function(containerNo)
{
    return this['$container' + containerNo];
};

Locations.prototype.setField = function(key, data) {

};

Locations.prototype.initLocation = function(containerNo, locationId)
{

};