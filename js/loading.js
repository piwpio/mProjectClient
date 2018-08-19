Loading = function() {
    this.$top = $('#loading-top');
    this.$bottom = $('#loading-bottom');
};

Loading.prototype.show = function()
{
    // this.$top.velocity({top: 0}, {duration: 500});
    // this.$bottom.velocity({bottom: 0}, {duration: 500});
    this.$top.removeClass('loading-hide');
    this.$bottom.removeClass('loading-hide');
};

Loading.prototype.hide = function()
{
    // this.$top.velocity({top: '-50%'}, {duration: 500});
    // this.$bottom.velocity({bottom: '-50%'}, {duration: 500});
    this.$top.addClass('loading-hide');
    this.$bottom.addClass('loading-hide');
};