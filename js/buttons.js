MoveButton = function($id, emitAction)
{
    let $this = $($id);
    let isActive = $this.hasClass('move-button-active');
    $this.on('click', function() {
        if (isActive) {
            window.socket.emit(emitAction);
        }
    });

    let setActive = function(bool) {
        if (bool && !isActive) {
            isActive = true;
            $this.addClass('move-button-active');
        } else if (!bool && isActive) {
            isActive = false;
            $this.removeClass('move-button-active');
        }
    };

    return {
        setActive: setActive
    }
};