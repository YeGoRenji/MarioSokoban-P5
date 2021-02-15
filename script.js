let mario_UP;
let mario_RIGHT;
let mario_DOWN;
let mario_LEFT;
let wall;
const blocksize = 34;
let orientation = {
    UP:0,
    RIGHT:1,
    DOWN:2,
    LEFT:3
};
let position = {x: 0,y: 0};

function preload() {
    mario_UP = loadImage('Sprites/mario_UP.png');
    mario_RIGHT = loadImage('Sprites/mario_RIGHT.png');
    mario_DOWN = loadImage('Sprites/mario_DOWN.png');
    mario_LEFT = loadImage('Sprites/mario_LEFT.png');
    wall = loadImage('Sprites/wall.jpg');
}

function setup() {
    createCanvas(408, 408);
}

function keyPressed(){
    switch (keyCode) {
        case UP_ARROW:
            position.y--;
            break;
        case RIGHT_ARROW:
            position.x++;
            break;
        case DOWN_ARROW:
            position.y++;
            break;
        case LEFT_ARROW:
            position.x--;
            break;

    }
}

function draw() {
    background(150);
    position.x = constrain(position.x, 0, 11);
    position.y = constrain(position.y, 0, 11);
    image(mario_DOWN, position.x*blocksize,position.y*blocksize);
}