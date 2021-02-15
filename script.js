let mario_UP;
let mario_RIGHT;
let mario_DOWN;
let mario_LEFT;
let wall;
let imgarrl;
const blocksize = 34;
let orindex = 2;

let position = {x: 0,y: 0};

function preload() {
    mario_UP = loadImage('Sprites/mario_UP.png');
    mario_RIGHT = loadImage('Sprites/mario_RIGHT.png');
    mario_DOWN = loadImage('Sprites/mario_DOWN.png');
    mario_LEFT = loadImage('Sprites/mario_LEFT.png');
    wall = loadImage('Sprites/wall.jpg');
    crate = loadImage('Sprites/box.jpg');
    crate_done = loadImage('Sprites/box.jpg');
    objective = loadImage('Sprites/objective.png');
}

function setup() {
    createCanvas(408, 408);
    imgarr = [mario_UP,mario_RIGHT,mario_DOWN,mario_LEFT]
}

function move(x ,y){
    var temp;
    var nextcell = {
        x: constrain(position.x + x, 0, 11),
        y: constrain(position.y + y, 0, 11)
    };
    //flip!
    temp = map[position.y][position.x];
    map[position.y][position.x] = map[nextcell.y][nextcell.x];
    map[nextcell.y][nextcell.x] = temp;
}

function keyPressed(){
    switch (keyCode) {
        case UP_ARROW:
            move(0,-1);
            orindex = 0;
            break;
        case RIGHT_ARROW:
            move(1,0);
            orindex = 1;
            break;
        case DOWN_ARROW:
            move(0,1);
            orindex = 2;
            break;
        case LEFT_ARROW:
            move(-1,0);
            orindex = 3;
            break;

    }
}

function drawMap(){
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            switch (map[j][i]) {
                case 1:
                    image(wall,i*blocksize,j*blocksize);
                    break;
                case 2:
                    image(crate,i*blocksize,j*blocksize);
                    break;
                case 3:
                    image(crate_done,i*blocksize,j*blocksize);
                    break;
                case 4:
                    image(objective,i*blocksize,j*blocksize);
                    break;
                case 5:
                    image(imgarr[orindex],i*blocksize,j*blocksize);
                    position.x = i;
                    position.y = j;
                    break;
            }
        }
    }
}

function draw() {
    background(100);
    drawMap();
    /*
    //GRID
    for (let i = 0; i < map.length; i++){
        strokeWeight(1);
        stroke(255);
        line((i+1)*blocksize, 0, (i+1)*blocksize, height);
    }
    for (let j = 0; j < map.length; j++){
        strokeWeight(1);
        stroke(255);
        line(0, (j+1)*blocksize , width, (j+1)*blocksize);
    }
    */
    //console.log(position);
}