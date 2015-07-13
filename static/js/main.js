var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game-js', { preload: preload, create: create, update:update });

var spritePx = 16; // Sprite pixel size
var spriteZoom = 2;
var treeProb = .2;

var woodCount = 0;

var treeDropTime = 1000;
var pickupRotateSpeed = 1;

var grassTiles = [];
var treeTiles = [];

var text;

function preload() {
    // Preload game assets
    game.load.image('grass', 'static/assets/grass.png');
    game.load.image('tree', 'static/assets/tree.png');
    game.load.image('wood', 'static/assets/wood.png');
}

function create() {
    // Create the game tiles
    tiles = game.add.group();
    pickups = game.add.group();

    var rows = game.height/(spritePx * spriteZoom);
    var columns = game.width/(spritePx * spriteZoom);

    for (var r=0;r<rows;r++){
        for (var c=0;c<columns;c++){
            var tileType = 'grass';
            if (Math.random() <= treeProb){
                var tileType = 'tree';
            }
            var tile = tiles.create(c*spritePx*spriteZoom, r*spritePx*spriteZoom, tileType);
            tile.age = 0;
            tile.produced = false;
            tile.scale.setTo(spriteZoom, spriteZoom);
            if (tileType === "grass"){
                grassTiles.push(tile);
            } else if (tileType === "tree"){
                treeTiles.push(tile);
            }
        }
    }
    text = game.add.text(10, 10, "wood: 0", { font: "10px Arial", fill: "#000000", align: "center" });
}

function update() {
    for (var i=0;i<treeTiles.length;i++){
        treeTiles[i].age ++;
        treeTile = treeTiles[i];
        if (treeTile.age >= treeDropTime && !treeTile.produced){
            treeTile.produced = true;
            wood = pickups.create(treeTile.position.x + spritePx*spriteZoom/2, treeTile.position.y + spritePx*spriteZoom/2, 'wood');
            wood.anchor.setTo(0.5, 0.5);
            wood.scale.setTo(spriteZoom, spriteZoom);
            // Listen to events on this sprite
            wood.inputEnabled = true;
            // Send the wood in the event context
            wood.events.onInputOver.add(pickupWood, {pickup: wood, tile: treeTile});
        }
    }
    for (var i=0;i<pickups.children.length;i++){
        pickups.children[i].angle += pickupRotateSpeed;
    }
    text.text = "Wood " + woodCount;
}

function pickupWood() {
    woodCount += 1;
    // Grab the pickup tile from the context
    var wood = this.pickup;
    // Delete the object and stop rendering it.
    wood.destroy();
    // Reset the age of the tile
    var tile = this.tile;
    tile.produced = false;
    tile.age = 0;
}
