ChatResponse = function()
{
    window.socket.on('chat_response', function(chat) {
        window.gg.chat.addMessage(chat[0], chat[1], chat[2])
    });
};