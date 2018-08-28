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

Hero.prototype.setField = function(field, v)
{
    if (this[field] !== undefined) {
        this[field] = v;
        this.render(field, v)
    } else {
        window.debugError('Hero have not field like ' + field);
    }
};

Hero.prototype.render = function(field, v)
{
    if (field === '_hp') {
        window.gg.statsBar.renderHp(v)
    } else if (field === '_exp') {
        window.gg.statsBar.renderExp(v)
    }
};

Hero.prototype.getId = function()
{
    return this._id;
};