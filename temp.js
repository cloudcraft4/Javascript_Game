var w = 80, h = 40;
/* create a connected map where the player can reach all non-wall sections */
var map = new ROT.Map.Cellular(w, h, { connected: true });

/* cells with 1/2 probability */
map.randomize(0.5);

/* make a few generations */
for (var i=0; i<4; i++) map.create();

/* display only the final map */
var display = new ROT.Display({width:w, height:h, fontSize:4});
SHOW(display.getContainer());    
map.create(display.DEBUG);

/* now connect the maze */
var display = new ROT.Display({width:w, height:h, fontSize:4});
SHOW(display.getContainer());    
map.connect(display.DEBUG);