var Game =  {
	_display: null,
    _currentScreen: null,
    _screenWidth: 100,
    _screenHeight: 48,
	init: function() {
        

        // Any necessary initialization will go here.
        this._display = new ROT.Display({width: this._screenWidth,
                                        height: this._screenHeight + 1
                                    });

        // Create an array to store all of the starting choices
        // There may be a smarter way to do things but this works for now
        this.startingChoices = [];

        // Create a helper function for binding to an event
        // and making it send it to the screen
        var game = this; // So that we don't lose this
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When an event is received, send it to the
                // screen if there is one
                if (game._currentScreen !== null) {
                    // Send the event type and data to the screen
                    game._currentScreen.handleInput(event, e);
                }
            });
        };
        // Bind keyboard input events
        bindEventToScreen('keydown');
        //bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    },
	getDisplay: function() {
		return this._display;
	},
	getScreenWidth: function() {
        return this._screenWidth;
	},
	getScreenHeight: function() {
	    return this._screenHeight;
	},
    refresh: function() {
        // Clear the screen
        this._display.clear();
        // Render the screen
        this._currentScreen.render(this._display);
    },
	switchScreen: function(screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this.refresh();
        }
    }
};

window.onload = function() {
    // Initialize the game
    Game.init();
    // Add the container to our HTML page
    document.body.appendChild(Game.getDisplay().getContainer());
    // Load the start screen
    Game.switchScreen(Game.Screen.startScreen);
};
