Loading = function() {
    this.$top = $('#loading-top');
    this.$bottom = $('#loading-bottom');
};

Loading.prototype.show = function()
{
    this.$top.velocity({top: 0}, {duration: 500});
    this.$bottom.velocity({bottom: 0}, {duration: 500});
};

Loading.prototype.hide = function()
{
    this.$top.velocity({top: '-50%'}, {duration: 500});
    this.$bottom.velocity({bottom: '-50%'}, {duration: 500});
};