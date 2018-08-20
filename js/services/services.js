ServicesController = function()
{
    this._localStorageService = new LocalStorageService();
    this._staticDataService = new StaticDataService();
};

ServicesController.prototype.localStorage = function()
{
    return this._localStorageService;
};

ServicesController.prototype.staticData = function()
{
    return this._staticDataService;
};