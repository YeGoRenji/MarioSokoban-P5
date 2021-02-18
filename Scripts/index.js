let mario_UP;
let mario_RIGHT;
let mario_DOWN;
let mario_LEFT;
let wall;
let imgarr;
let objectiveCount = 0;
let score = 0;
const blocksize = 34;
let orindex = 2;
let inGame = false;
let inEditor = false;
let inMenu = true;
let playbutton;
let robotofont;
let editorbutton;
let menubutton;

let position = {x: 0,y: 0};
// prevent arrow keys from scrolling.
document.onkeydown = KD;
function KD(e) {
    e.returnValue = false;
}
//
let htp = document.querySelector(".htpin");
function unfoldHtp() {
    if(htp.classList.contains("unfolded"))
    {
        htp.classList.remove("unfolded");
    }else{
        htp.classList.add("unfolded");
    }
    
}

function preload() {

    loadFont('Fonts/Roboto-Light.ttf',(font)=>{robotofont = font});
    mario_UP = loadImage('Sprites/mario_UP.png');
    mario_RIGHT = loadImage('Sprites/mario_RIGHT.png');
    mario_DOWN = loadImage('Sprites/mario_DOWN.png');
    mario_LEFT = loadImage('Sprites/mario_LEFT.png');
    wall = loadImage('Sprites/wall.jpg');
    crate = loadImage('Sprites/box.jpg');
    crate_done = loadImage('Sprites/box_done.jpg');
    objective = loadImage('Sprites/objective.png');

}

function setup() {
    createCanvas(408, 408);
    if(inMenu){
        initMenu();
    }
}

function keyPressed(){
    if(inGame){
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
            case 27:
                toMenu();
                break;
        }
    }
    if(inEditor){
        switch (keyCode) {
            case 1 + 48:
                block = 1;
                break;
            case 2 + 48:
                block = 2;
                break;
            case 3 + 48:
                block = 4;
                break;
            case 4 + 48:
                block = 5;
                break;
            case 27:
                checkEditedMap();
                break;
            default:
                block = block;
                break;
        }
    }
}

function draw() {
    if(inGame){
        background(100);
        noTint();
        drawMap(map);
        image(imgarr[orindex],position.x*blocksize,position.y*blocksize);
        if(score >= objectiveCount){
            inGame = false;
            endgame();
        }
    }
    if(inEditor){
        background(100);
        noTint();
        drawMap(editormap);
        tint(255, 126);
        editor();
    }
    
}