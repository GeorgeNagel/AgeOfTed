var game = new Phaser.Game(800, 640, Phaser.AUTO, 'game-js', { preload: preload, create: create, update:update });

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
    var spritePx = 16; // Sprite pixel size
    var spriteZoom = 2;
    var treeProb = .2;

    var rows = game.height/(spritePx * spriteZoom);
    var columns = game.width/(spritePx * spriteZoom);

    grassTiles = game.add.group();
    treeTiles = game.add.group();

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
                grassTiles.add(tile);
            } else if (tileType === "tree"){
                treeTiles.add(tile);
            }
        }
    }
}

function update() {
    for (var i=0;i<treeTiles.children.length;i++){
        treeTiles.children[i].age ++;
        treeTile = treeTiles.children[i];
        if (treeTile.age >= 10 && !treeTile.produced){
            var text = game.add.text(16, 16, "junk");
            treeTile.produced = true;
            tiles.create(23, 23, 'grass');
        }
    }
}
