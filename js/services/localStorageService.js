LocalStorageService = function() {};

LocalStorageService.prototype.set = function(key, value)
{
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
};

LocalStorageService.prototype.get = function(key)
{
    let v = localStorage.getItem(key);
    return JSON.parse(v);
};