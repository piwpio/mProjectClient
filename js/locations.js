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

    this._fightAnimationQueue = [];
    this._deadLocation = window.ss.staticData().getStaticData()['dead_location_id'];

    this.initEvents();
};

Locations.prototype.initEvents = function()
{
    //NOTE attack enemy
    $(document).on('click', '.enemy', function(){
        let $enemy = $(this);
        if (!$enemy.hasClass('enemy-dead')) {
            window.socket.emit('fight_attack', {eid: $enemy.data('enemy-id'), et: 'e'})
        }
    });
};

Locations.prototype.setField = function(key, data) {

};

Locations.prototype.initSideLocation = function(containerNo, locationId)
{

};

Locations.prototype.render = function(locationId, heroes, enemies)
{
    window.gg.statsBar.renderLocation(locationId);
    let location = window.ss.staticData().getStaticData()['locations'][locationId] || {};
    if (location) {
        this.clearFightAnimationsQueue();

        //NOTE on hero init set location
        if (this.currentLocationId === null) {
            this.initSideLocation(2, locationId);
            this.cleanEnemiesAndHeroes(this.currentLocationContainerNo);
            if (heroes) {
                for (let i = 0; i < heroes.length; i++) {
                    this.addHero(heroes[i], this.currentLocationContainerNo);
                }
            }
            if (enemies) {
                for (let i = 0; i < enemies.length; i++) {
                    this.addEnemy(enemies[i], this.currentLocationContainerNo);
                }
            }
        }
        this.currentLocationId = locationId;

        //NOTE if not init
        let moveDirection = null;
        if (locationId === this.westLocationId) {
            this.cleanEnemiesAndHeroes(this.westLocationContainerNo);
            if (heroes) {
                for (let i = 0; i < heroes.length; i++) {
                    this.addHero(heroes[i], this.westLocationContainerNo);
                }
            }
            if (enemies) {
                for (let i = 0; i < enemies.length; i++) {
                    this.addEnemy(enemies[i], this.westLocationContainerNo);
                }
            }

            //NOTE animation
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
                for (let i = 0; i < heroes.length; i++) {
                    this.addHero(heroes[i], this.eastLocationContainerNo);
                }
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
        } else if (locationId === this._deadLocation) {
            let self = this;
            window.loading.show();
            setTimeout(function() {
                self.cleanEnemiesAndHeroes(self.currentLocationContainerNo);
                window.loading.hide();
            }, 600);
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

Locations.prototype.setEnemy = function(enemyId, data)
{
    let $enemy = $('#' + enemyId + '-enemy', this.getContainer(this.currentLocationContainerNo));
    for (let field in data) {
        if (field === '_alive') {
            let isAlive = data[field];
            if (!isAlive) {
                $enemy.addClass('enemy-dead');
            } else {
                $enemy.removeClass('enemy-dead');
            }
        } else if (field === 'attacked_by') {
            let attackingHeroId = data[field];
            let $hero;
            if (attackingHeroId !== window.hh.getId()) {
                $hero = this.get$HeroByIdOcCurrentLocation(attackingHeroId);
            }
            this.addToFightAnimationQueue(true, $hero, $enemy);
            this.fightAnimation();

        } else if (field === 'attack_hero') {
            let attackedHeroId = data[field];
            let $hero;
            if (attackedHeroId !== window.hh.getId()) {
                $hero = this.get$HeroByIdOcCurrentLocation(attackedHeroId);
            }
            this.addToFightAnimationQueue(false, $hero, $enemy);
            this.fightAnimation();
        }
    }
};

Locations.prototype.addEnemy = function(enemy, containerNo)
{
    let tpl =
        '<div id="' + enemy.id + '-enemy">' +
        '<div class="enemy enemy-' + enemy.base + '" data-enemy-id="' + enemy.id + '">' + enemy.name + ' (' + enemy.id + ')</div>' +
        '</div>';
    this.getContainerElements(containerNo)['$enemiesContainer'].append(tpl);
};

Locations.prototype.addEnemyDynamic = function(data)
{
    this.addEnemy(data.enemy, this.currentLocationContainerNo)
};

Locations.prototype.removeEnemyDynamic = function(data)
{
    $('#' + data.id + '-enemy', this.getContainer(this.currentLocationContainerNo)).remove();
};

Locations.prototype.addHero = function(hero, containerNo)
{
    let tpl =
        '<div id="' + hero.id + '-hero">' +
        '<div class="hero" data-hero-id="' + hero.id + '">' + hero.name + ' (' + hero.id + ')</div>' +
        '</div>';
    this.getContainerElements(containerNo)['$heroesContainer'].append(tpl);
};

Locations.prototype.addHeroDynamic = function(data)
{
    this.addHero(data.hero, this.currentLocationContainerNo)
};

Locations.prototype.removeHeroDynamic = function(data)
{
    $('#' + data.id + '-hero', this.getContainer(this.currentLocationContainerNo)).remove();
};

Locations.prototype.cleanEnemiesAndHeroes = function(containerNo)
{
    this.getContainerElements(containerNo)['$enemiesContainer'].empty();
    this.getContainerElements(containerNo)['$heroesContainer'].empty();
};

Locations.prototype.getContainer = function(containerNo)
{
    return this['$container' + containerNo];
};
Locations.prototype.getContainerElements = function(containerNo)
{
    return this['container' + containerNo + 'Elements'];
};

Locations.prototype.get$HeroByIdOcCurrentLocation = function(heroId)
{
    return $('#' + heroId + '-hero', this.getContainer(this.currentLocationContainerNo))
};

Locations.prototype.addToFightAnimationQueue = function(isHeroAttack, $hero, $enemy)
{
    this._fightAnimationQueue.push([isHeroAttack, $hero, $enemy]);
};
Locations.prototype.clearFightAnimationsQueue = function()
{
    this._fightAnimationQueue = [];
};
Locations.prototype._fightAnimationReady = true;
Locations.prototype.fightAnimation = function()
{
    if (this._fightAnimationReady && this._fightAnimationQueue.length) {
        let self = this;
        this._fightAnimationReady = false;
        let pair = this._fightAnimationQueue.shift();

        let isHeroAttack = pair[0];
        let $hero = pair[1];
        let $enemy = pair[2];
        let topPx = '20px';
        if (isHeroAttack) {
            topPx = '-' + topPx
        }

        if ($hero) {
            $hero
                .velocity({top: topPx}, {easing: 'linear', duration: 100})
                .velocity({top: '0'}, {easing: 'linear', duration: 100});
        }
        $enemy
            .velocity({top: topPx}, {easing: 'linear', duration: 100})
            .velocity({top: '0'}, {easing: 'linear', duration: 100, complete: function(){self._fightAnimationReady = true; self.fightAnimation();}});
    }
};