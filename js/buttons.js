MoveButton = function($id, emitAction)
{
    let $this = $($id);
    let isActive = $this.hasClass('move-button-active');
    $this.on('click', function() {
        if (isActive) {
            window.debugConsole(emitAction);
            window.socket.emit(emitAction);
        }
    });

    let setActive = function() {
        if (!isActive) {
            isActive = true;
            $this.addClass('move-button-active');
        }
    };

    let setInactive = function() {
        if (isActive) {
            isActive = false;
            $this.removeClass('move-button-active');
        }
    };

    return {
        setActive: setActive,
        setInactive: setInactive
    }
};