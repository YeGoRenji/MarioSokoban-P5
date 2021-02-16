function startGame(){

    inMenu = false;
    inGame = true;
    playbutton.remove();
    editorbutton.remove();

}

function starteditor (){
    inMenu = false;
    inEditor = true;
    playbutton.remove();
    editorbutton.remove();
}

function initMenu(){
        background(100);
        playbutton = createButton('PLAY');
        playbutton.style('width','100px');
        playbutton.style('height','50px'); 
        playbutton.position(width/2-playbutton.width/2,height/2-playbutton.height/2);
        playbutton.mouseReleased(startGame);
        editorbutton = createButton('EDITOR');
        editorbutton.style('width','100px');
        editorbutton.style('height','50px');
        editorbutton.position(width/2-editorbutton.width/2,height/2-editorbutton.height/2 + 60);
        editorbutton.mouseReleased(starteditor);
        textSize(30);
        textFont(robotofont);
        fill('#fce38a');
        text('MARIO SOKOBAN', width/2-118,height/2-100);
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

function toMenu(){
    if(inMenu === false){
        inMenu = true;
        inEditor = false;
        inGame = false;
        score = 0;
        objectiveCount = 0;
        if(menubutton)
            menubutton.remove();

        if(localStorage.getItem('map'))
            map = JSON.parse(localStorage.getItem('map'));
        
        initMenu();
    }
    
}

function checkEditedMap(){
    var crateCount = 0;
    var objCount = 0;
    var marioCount = 0;
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map.length; j++){
            switch (editormap[j][i]) {
                case 2:
                    crateCount++;
                    break;
                case 4:
                    objCount++;
                    break;
                case 5:
                    marioCount++;
                    break;
            }
        }
    }
    // TESTS !
    if(crateCount != objCount || marioCount != 1 || objCount <= 0 || crateCount <= 0){
        alert('Sorry, can\'t save this map (Map impossible)');
        return;
    }
    localStorage.setItem('map',JSON.stringify(editormap));
    alert('Map saved!');
    toMenu();
}

let block = 1;
function editor(){
    var mouseHoverCell = {
        x: constrain(floor(mouseX/blocksize),0,11),
        y: constrain(floor(mouseY/blocksize),0,11)
    };

    switch(block){
        case 1:
            image(wall,mouseHoverCell.x*blocksize,mouseHoverCell.y*blocksize);
            break;
        case 2:
            image(crate,mouseHoverCell.x*blocksize,mouseHoverCell.y*blocksize);
            break;
        case 4:
            image(objective,mouseHoverCell.x*blocksize,mouseHoverCell.y*blocksize);
            break;
        case 5:
            image(mario_DOWN,mouseHoverCell.x*blocksize,mouseHoverCell.y*blocksize);
            break;
    }
    if(mouseIsPressed){
        if (mouseButton === LEFT) {
            
            editormap[mouseHoverCell.y][mouseHoverCell.x] = block;
        }
        if (mouseButton === RIGHT) {
            document.oncontextmenu = function() { 
                return false; 
            };
            editormap[mouseHoverCell.y][mouseHoverCell.x] = 0;
        }
    }
}

function endgame(){
    
    noStroke();
    fill('#FFE099');
    rect(width/2-134/2,height/2-50/2,134,50);
    fill('#3D6078');
    noStroke();
    textSize(25);
    textFont(robotofont);
    text('VICTORY', width/2-51, height/2+ 7);
    menubutton = createButton('MENU');
    menubutton.style('width','75px');
    menubutton.style('height','30px'); 
    menubutton.position(width/2-menubutton.width/2,height/2-menubutton.height/2+45);
    menubutton.mouseReleased(toMenu);

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
        case 3:
            switch (map[nextnextcell.y][nextnextcell.x]) {
                case 0:
                    map[nextnextcell.y][nextnextcell.x] = 2;
                    map[nextcell.y][nextcell.x] = 4;
                    score--;
                    break;
                case 4:
                    map[nextnextcell.y][nextnextcell.x] = 3;
                    map[nextcell.y][nextcell.x] = 4;
                    break;
            }
            break;
    }
    if(map[nextcell.y][nextcell.x] === 0 || map[nextcell.y][nextcell.x] === 4){
        position.x = nextcell.x;
        position.y = nextcell.y;
    }
}

function drawMap(map){
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
                    image(mario_DOWN,i*blocksize,j*blocksize);
                    break;
            }
        }
    }
}