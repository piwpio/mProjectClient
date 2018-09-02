Loading = function()
{
    this.$top = $('#loading-top');
    this.$bottom = $('#loading-bottom');
};

Loading.prototype.show = function()
{
    this.$top.removeClass('loading-hide');
    this.$bottom.removeClass('loading-hide');
};

Loading.prototype.hide = function(delay)
{
    let self = this;
    if (delay === undefined) {
        delay = 0;
    }
    setTimeout(function() {
        self.$top.addClass('loading-hide');
        self.$bottom.addClass('loading-hide');
    }, delay);
};