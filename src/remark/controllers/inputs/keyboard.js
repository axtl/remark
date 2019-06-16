module.exports = Keyboard;

function Keyboard(events) {
  this._events = events;

  this.activate();
}

Keyboard.prototype.activate = function () {
  this._gotoSlideNumber = '';

  this.addKeyboardEventListeners();
};

Keyboard.prototype.deactivate = function () {
  this.removeKeyboardEventListeners();
};

Keyboard.prototype.addKeyboardEventListeners = function () {
  var self = this;
  var events = this._events;

  events.on('keydown', function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      // Bail out if alt, meta or ctrl key was pressed
      return;
    }

    switch (event.keyCode) {
      case 33: // Page up
        events.emit('gotoPreviousSlide');
        break;
      case 34: // Page down
        events.emit('gotoNextSlide');
        break;
      case 36: // Home
        events.emit('gotoFirstSlide');
        break;
      case 35: // End
        events.emit('gotoLastSlide');
        break;
      case 27: // Escape
        events.emit('hideOverlay');
        break;
      case 118: //F7
        events.emit('createClone');
        break;
      case 121: //F10
        events.emit('togglePresenterMode');
        break;
      case 120: //F9
        events.emit('toggleFullscreen');
        break;
      case 119: //F8
        events.emit('resetTimer');
        break;
      case 13: // Return
        if (self._gotoSlideNumber) {
          events.emit('gotoSlideNumber', self._gotoSlideNumber);
          self._gotoSlideNumber = '';
        }
        break;
    }
  });
};

Keyboard.prototype.removeKeyboardEventListeners = function () {
  var events = this._events;

  events.removeAllListeners("keydown");
  events.removeAllListeners("keypress");
};
