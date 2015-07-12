var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game-js', { preload: preload, create: create, update:update });

function preload() {
    // Preload game assets
    game.load.image('grass', 'static/assets/grass.png');
    game.load.image('tree', 'static/assets/tree.png');
}

function create() {
    // Create the game tiles
    tiles = game.add.group();
    var spritePx = 16; // Sprite pixel size
    var spriteZoom = 2;
    var treeProb = .2;

    var rows = game.height/(spritePx * spriteZoom);
    var columns = game.width/(spritePx * spriteZoom);

    var grassTiles = game.add.group();
    var treeTiles = game.add.group();

    for (var r=0;r<rows;r++){
        for (var c=0;c<columns;c++){
            var tileType = 'grass';
            if (Math.random() <= treeProb){
                var tileType = 'tree';
            }
            var tile = tiles.create(c*spritePx*spriteZoom, r*spritePx*spriteZoom, tileType);
            tile.age = 0;
            tile.scale.setTo(spriteZoom, spriteZoom);
        }
    }
}

function update() {
    for (var i=0;i<tiles.children.length;i++){
        tiles.children[i].age ++;
        if (tiles.children[i].age == 10){
            var text = game.add.text(16, 16, "junk");
        }
    }
}
