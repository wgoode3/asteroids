console.log("game start!");

const gameField = {
    width: 800,
    height: 600
};
const upKey = 38,
    downKey = 40,
    leftKey = 37, 
   rightKey = 39, 
    jumpKey = 32;
const keyMap = {    
    'up':    false,
    'left':  false,
    'down':  false,
    'right': false
};
const axis = {x: 0, y: 0};
let updateInterval = (1/60)*1000;
let delta_time = 1/60;
var rocks = [];
let rockCount = 12;

class Rock {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    speed = 300;

    constructor() {
        let r = Math.random();
        if(r >= 0.75) {
            this.x = Math.random() * gameField.width;
            if(Math.random() > 0.5) {
                this.vx = Math.random() * this.speed;
            } else {
                this.vx = Math.random() * -this.speed;
            }
            this.vy =  Math.random() * -this.speed;
            // start from top!
        } else if(r >= 0.5) {
            this.y = Math.random() * gameField.height;
            this.x = gameField.width;
            if(Math.random() > 0.5) {
                this.vy = Math.random() * this.speed;
            } else {
                this.vy = Math.random() * -this.speed;
            }
            this.vx =  Math.random() * -this.speed;
            // start from right!
        } else if(r >= 0.25) {
            this.x = Math.random() * gameField.width;
            this.y = gameField.height;
            if(Math.random() > 0.5) {
                this.vx = Math.random() * this.speed;
            } else {
                this.vx = Math.random() * -this.speed;
            }
            this.vy =  Math.random() * this.speed;
            // start from bottom!
        } else {
            // start from left!
            this.y = Math.random() * gameField.height;
            if(Math.random() > 0.5) {
                this.vy = Math.random() * this.speed;
            } else {
                this.vy = Math.random() * -this.speed;
            }
            this.vx =  Math.random() * this.speed;
        }
    }

    update() {
        this.x += delta_time * this.vx;
        this.y += delta_time * this.vy;
    }
}

class Player {
    x = gameField.width/2;
    y = gameField.height/2;
    vx = 0;
    vy = 0;
    speed = 10;

    move() {
        if(axis.x > 0) {
            this.vx += this.speed;
        } else if(axis.x < 0) {
            this.vx += -this.speed;
        }
        if(axis.y > 0) {
            this.vy += this.speed;
        } else if(axis.y < 0) {
            this.vy += -this.speed;
        }
    }

    update() {
        this.x += delta_time * this.vx;
        this.y += delta_time * this.vy;
        if(this.x < 0) {
            this.x = gameField.width;
        }
        if(this.x > gameField.width) {
            this.x = 0;
        }
        if(this.y < 0) {
            this.y = gameField.height;
        }
        if(this.y > gameField.height) {
            this.y = 0;
        } 
    }

}

const player = new Player()

function render() {
    var out = "";
    out += `<div id="player" style="top:${player.y}px; left:${player.x}px"></div>`;
    while(rocks.length < rockCount) {
        rocks.push(new Rock());
        console.log(rocks);
    }
    for(var i=0; i<rocks.length; i++) {
        rocks[i].update();
        if(rocks[i].x < 0 || rocks[i].x > gameField.width || rocks[i].y < 0 || rocks[i].y > gameField.height) {
            rocks.splice(i, 1);
            i--;
        } 
        out += `<div id="rock" style="top:${rocks[i].y}px; left:${rocks[i].x}px"></div>`;
    }
    document.getElementById("game").innerHTML = out;
}


// listens for pressing down on a key
document.onkeydown = function(a){
    if (a.keyCode == leftKey) {
        keyMap.left = true;
    }
    if (a.keyCode == rightKey) {
        keyMap.right = true;
    } 
    if (a.keyCode == upKey) {
        keyMap.up = true;
    }
    if (a.keyCode == downKey) {
        keyMap.down = true;
    }
}

// listens for lifting up a key
document.onkeyup = function(a){
    if (a.keyCode == leftKey) {
        keyMap.left = false;
    }
    if (a.keyCode == rightKey) {
        keyMap.right = false;
    } 
    if (a.keyCode == upKey) {
        keyMap.up = false;
    }
    if (a.keyCode == downKey) {
        keyMap.down = false;
    }
}

function setAxis() {
    axis.x = 0;
    axis.y = 0;
    if(keyMap.up){
        axis.y--;
    }
    if(keyMap.down){
        axis.y++;
    }
    if(keyMap.left){
        axis.x--;
    }
    if(keyMap.right){
        axis.x++;
    }
}

setInterval(function() {
    setAxis();
    player.move();
    player.update();
    render();
}, updateInterval);