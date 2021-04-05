Game.Map.Rooms = function() {
    // Call the Map constructor
    Game.Map.call(this, this._generateTiles(80, 24));
    // Create the giant zombie
    //this.addEntityAtRandomPosition(Game.EntityRepository.create('foreman robot'), 0);
};
Game.Map.Rooms.extend(Game.Map);

/* CODE FROM ROT MANUAL 


var map = new ROT.Map.Digger();
var display = new ROT.Display({fontSize:8});
SHOW(display.getContainer());
map.create(display.DEBUG);

var drawDoor = function(x, y) {
    display.draw(x, y, "", "", "red");
}

var rooms = map.getRooms();
for (var i=0; i<rooms.length; i++) {
    var room = rooms[i];
    SHOW(ROT.Util.format("Room #%s: [%s, %s] => [%s, %s]",
        (i+1),
        room.getLeft(), room.getTop(),
        room.getRight(), room.getBottom()
    ));

    room.getDoors(drawDoor);
}
*/