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
let inMenu = true;
let button;
let robotofont;

let position = {x: 0,y: 0};

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

function startGame(){
    inMenu = false;
    inGame = true;
    button.remove();
}

function setup() {
    createCanvas(408, 408);
    if(inMenu){
        background(100);
        button = createButton('PLAY');
        button.font
        button.style('width','100px');
        button.style('height','50px');
        button.style('')
        button.position(width/2-button.width/2,height/2-button.height/2);
        button.mouseReleased(startGame);
        textSize(30);
        textFont(robotofont);
        fill('#fce38a');
        text('MARIO SOKOBAN', width/2-118,height/2-100);
    }
    imgarr = [mario_UP,mario_RIGHT,mario_DOWN,mario_LEFT];
    //find mario pos
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map.length; j++){
            if(map[j][i] === 5){
                position.x = i;
                position.y = j;
                map[j][i] = 0;
            }
            if(map[j][i] === 4){
                objectiveCount++;
            }
        }
    }
    
}

function permuteTwoCellsCoordinates(a,b){
    var temp;
    temp = map[a.y][a.x];
    map[a.y][a.x] = map[b.y][b.x];
    map[b.y][b.x] = temp;
}

function move(x ,y){
    
    var nextcell = {
        x: constrain(position.x + x, 0, 11),
        y: constrain(position.y + y, 0, 11)
    };
    var nextnextcell = {
        x: constrain(position.x + 2*x, 0, 11),
        y: constrain(position.y + 2*y, 0, 11)
    };
    switch (map[nextcell.y][nextcell.x]) {
        case 2:
            switch (map[nextnextcell.y][nextnextcell.x]) {
                case 0:
                    permuteTwoCellsCoordinates(nextcell,nextnextcell);
                    break;
                case 4:
                    map[nextnextcell.y][nextnextcell.x] = 3;
                    map[nextcell.y][nextcell.x] = 0;
                    score++;
                    break;
            }
            break;
    }
    if(map[nextcell.y][nextcell.x] === 0 || map[nextcell.y][nextcell.x] === 4){
        position.x = nextcell.x;
        position.y = nextcell.y;
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
        }
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
            }
        }
    }
}


function endgame() {
    
    noStroke();
    fill('#FFE099');
    rect(width/2-134/2,height/2-50/2,134,50);
    fill('#3D6078');
    noStroke();
    textSize(25);
    textFont(robotofont);
    text('VICTORY', width/2-51, height/2+ 7);

}

function draw() {
    
    if(inGame){
        background(100);
        drawMap();
        image(imgarr[orindex],position.x*blocksize,position.y*blocksize);
        if(score >= objectiveCount){
            inGame = false;
            endgame();
        }
    }
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