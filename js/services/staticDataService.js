StaticDataService = function() {};

StaticDataService.prototype._staticData = null;

StaticDataService.prototype.getControlCode = function()
{
    return window.ss.localStorage().get('staticdata:controlcode');
};
StaticDataService.prototype.setControlCodeAndStaticData = function(code, staticData)
{
    window.ss.localStorage().set('staticdata:controlcode', code);
    window.ss.localStorage().set('staticdata:staticdata', staticData);
    this._staticData = staticData;
};

StaticDataService.prototype.getStaticData = function()
{
    if (this._staticData === null) {
        this._staticData = window.ss.localStorage().get('staticdata:staticdata');
    }
    return this._staticData;
};