Hero = function()
{
    this._location = null;
    this._name = null;
    this._level = null;
    this._exp = null;
    this._hp = null;
    this._attack = null;
    this._defence = null;
    this._speed = null;
    this._attackSpeed = null;
    this._weight = null;
};

Hero.prototype.initHero = function()
{

};

Hero.prototype.setField = function(field, val)
{
    this[field] = val;
    if (this['render' + field] !== undefined) {

    }
};

Hero.prototype.render = function(field)
{
    if (field === '_location') {

    }
};