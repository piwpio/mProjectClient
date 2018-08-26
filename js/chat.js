Chat = function()
{
    this.$container = $('#game-chat-container');
    this.$messagesContainer = $('#chat-messages');
    this.$button = $('#game-button-chat');
    this.$buttonSend = $('#chat-send-button');
    this.$input = $('#chat-input');

    this.isVisible = false;
    this.isButtonMarkedNewMessage = false;

    this.init();
};

Chat.prototype.init = function()
{
    let self = this;
    this.$button.on('click', function() {
        if (self.isVisible) {
            self.hide();
        } else {
            self.show()
        }
    });
    this.$buttonSend.on('click', function() {
       let message = self.$input.val();
       if (message && message.length) {
           window.socket.emit('chat_message', {m: message});
           self.addMessage('me',0,message);
           self.$input.val('');
       }
    });
};

Chat.prototype.show = function()
{
    this.markButtonNewMessage(false);
    this.isVisible = true;
    this.$container.removeClass('chat-hidden');
};

Chat.prototype.hide = function()
{
    this.isVisible = false;
    this.$container.addClass('chat-hidden');
};

Chat.prototype.markButtonNewMessage = function(bool)
{
    if (bool && !this.isButtonMarkedNewMessage) {
        this.isButtonMarkedNewMessage = true;
        this.$button.addClass('new-message');
    } else if (!bool && this.isButtonMarkedNewMessage) {
        this.isButtonMarkedNewMessage = false;
        this.$button.removeClass('new-message');
    }
};

Chat.prototype.addMessage = function(heroName, heroId, message)
{
    let tpl = '<div class="chat-message"><b>' +heroName + ":</b> " + message + '</div>';
    if (!this.isVisible) {
        this.markButtonNewMessage(true);
    }
    this.$messagesContainer.append(tpl);
};
