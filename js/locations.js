Locations = function()
{
    this.$container1 = $('#game-location-1');
    this.$container2 = $('#game-location-2');
    this.$container3 = $('#game-location-3');
    this.container1Elements = {
        $background: $('.location-background',this.$container1),
        $floor: $('.location-floor',this.$container1),
        $enemiesContainer: $('.location-floor .location-floor-enemies-container',this.$container1),
        $heroesContainer: $('.location-floor .location-floor-heroes-container',this.$container1),
    };
    this.container2Elements = {
        $background: $('.location-background',this.$container2),
        $floor: $('.location-floor',this.$container2),
        $enemiesContainer: $('.location-floor .location-floor-enemies-container',this.$container2),
        $heroesContainer: $('.location-floor .location-floor-heroes-container',this.$container2),
    };
    this.container3Elements = {
        $background: $('.location-background',this.$container3),
        $floor: $('.location-floor',this.$container3),
        $enemiesContainer: $('.location-floor .location-floor-enemies-container',this.$container3),
        $heroesContainer: $('.location-floor .location-floor-heroes-container',this.$container3),
    };

    this.enemiesSlotsOnLocations = [0,[],[],[]];
    this.heroesSlotsOnLocations = [0,[],[],[]];

    this.currentLocationId = null;
    this.westLocationId = null;
    this.eastLocationId = null;
    this.westLocationContainerNo = 1;
    this.eastLocationContainerNo = 3;
    this.currentLocationContainerNo = 2;

    this.initEvents();
};

Locations.prototype.initEvents = function()
{
    //NOTE attack enemy
    $(document).on('click', '.enemy', function(){
        let $enemy = $(this);
        window.socket.emit('fight_attack', {eid: $enemy.data('enemy-id'), et: 'e'})
    });
};

Locations.prototype.render = function(locationId, heroes, enemies)
{
    window.gg.statsBar.renderLocation(locationId);
    let location = window.ss.staticData().getStaticData()['locations'][locationId] || {};
    if (location) {
        if (this.currentLocationId === null) {
            this.initSideLocation(2, locationId);
            if (enemies) {
                for (let i = 0; i < enemies.length; i++) {
                    this.cleanEnemiesAndHeroes(this.currentLocationContainerNo);
                    this.addEnemy(enemies[i], this.currentLocationContainerNo);
                }
            }
        }
        this.currentLocationId = locationId;

        //NOTE animation
        let moveDirection = null;
        if (locationId === this.westLocationId) {
            this.cleanEnemiesAndHeroes(this.westLocationContainerNo);
            if (heroes) {

            }
            if (enemies) {
                for (let i = 0; i < enemies.length; i++) {
                    this.addEnemy(enemies[i], this.westLocationContainerNo);
                }
            }

            this.getContainer(this.westLocationContainerNo).velocity({left: '0'}, {easing: 'linear', duration: 300});
            this.getContainer(this.currentLocationContainerNo).velocity({left: '100%'}, {easing: 'linear', duration: 300});
            this.getContainer(this.eastLocationContainerNo).css('left', '-100%');

            let tmp = this.currentLocationContainerNo;
            this.currentLocationContainerNo = this.westLocationContainerNo;
            this.westLocationContainerNo = this.eastLocationContainerNo;
            this.eastLocationContainerNo = tmp;
            moveDirection = 'west';

        } else if (locationId === this.eastLocationId) {
            this.cleanEnemiesAndHeroes(this.eastLocationContainerNo);
            if (heroes) {

            }
            if (enemies) {
                for (let i = 0; i < enemies.length; i++) {
                    this.addEnemy(enemies[i], this.eastLocationContainerNo);
                }
            }
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
                    this.initSideLocation(this.westLocationContainerNo, this.westLocationId);
                }
                window.gg.buttonWest.setActive(true);

            } else {
                this.westLocationId = null;
                window.gg.buttonWest.setActive(false);
            }

            if (location.moves.east !== undefined) {
                this.eastLocationId = location.moves.east;
                if (moveDirection === 'east') {
                    this.initSideLocation(this.eastLocationContainerNo, this.eastLocationId);
                }
                window.gg.buttonEast.setActive(true);
            } else {
                this.eastLocationId = null;
                window.gg.buttonEast.setActive(false);
            }
        }
    }
};

Locations.prototype.addEnemy = function(enemy, containerNo)
{
    let position = Math.floor((Math.random() * 5) + 1);
    let tpl = '<div class="enemy enemy-' + enemy.base + '" data-enemy-id="' + enemy.id + '">' + enemy.name + '</div>';
    this.enemiesSlotsOnLocations[containerNo].push(position);
    $('.enemy-slot-' + position, this.getContainerElements(containerNo)['$enemiesContainer']).append(tpl);
};

Locations.prototype.addHero = function(hero)
{

};

Locations.prototype.cleanEnemiesAndHeroes = function(containerNo)
{
    let $enemiesContainer = this.getContainerElements(containerNo)['$enemiesContainer'];
    for (let i = 0; i < this.enemiesSlotsOnLocations[containerNo].length; i++) {
        let position = this.enemiesSlotsOnLocations[containerNo][i];
        $('.enemy-slot-' + position, $enemiesContainer).empty();
    }
    this.enemiesSlotsOnLocations[containerNo] = [];


    let $heroesContainer = this.getContainerElements(containerNo)['$heroesContainer'];
    for (let i = 0; i < this.heroesSlotsOnLocations[containerNo].length; i++) {
        let position = this.heroesSlotsOnLocations[containerNo][i];
        $('.hero-slot-' + position, $heroesContainer).empty();
    }
    this.heroesSlotsOnLocations[containerNo] = [];
};

Locations.prototype.getContainer = function(containerNo)
{
    return this['$container' + containerNo];
};
Locations.prototype.getContainerElements = function(containerNo)
{
    return this['container' + containerNo + 'Elements'];
};

Locations.prototype.setField = function(key, data) {

};

Locations.prototype.initSideLocation = function(containerNo, locationId)
{

};