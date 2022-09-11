const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;


const gap = 200;
const dy = 2;
const dx = 5;
const ms = 20;
const gravity = 8;
let leftkey = rightkey = false;
var score = 0;

let ball = {
    x:200,
    y:50,
    radius:10
}
let platforms = [
    {x:0, y:canvasHeight, width:randomwidth(), height:20},
]

function drawball() {
    let theplatform;
    for(var i=0; i<platforms.length; i++){
        if (ball.y < platforms[i].y ) {
            break;
        }
    }
    theplatform = platforms[i];
    if ((ball.y > theplatform.y - ball.radius) && (ball.x < theplatform.width || ball.x > theplatform.width + gap)) {
        ball.y = theplatform.y - ball.radius;
    }
    else {
        
        ball.y += gravity;
    }
    if (leftkey) {ball.x -= dx;}
    if (rightkey) {ball.x += dx;}
    if (ball.x < 0) {ball.x = canvasWidth;}
    if (ball.x > canvasWidth) {ball.x = 0;}
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, false);
    ctx.fillStyle = '#e8606b';
    ctx.fill()
    ctx.closePath();
}
function drawplatformleft(pl) {
    ctx.beginPath();
    ctx.rect(pl.x, pl.y, pl.width, pl.height);
    ctx.fillStyle = '#82a078';
    ctx.fill()
    ctx.closePath();
}
function drawplatformright(pl) {
    ctx.beginPath();
    ctx.rect(pl.width + gap, pl.y, canvasWidth - pl.width - gap, pl.height);
    ctx.fillStyle = '#82a078';
    ctx.fill();
    ctx.closePath();
}
function drawscore() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = '30px Raleway';
    ctx.fillStyle = '#e8606b';
    ctx.fill();
    ctx.fillText('Score: '+ score, 20, 50);
    ctx.closePath();
}
function randomwidth() {
    let answer;
    answer = Math.round(0.9*Math.random()*canvasWidth);
    return answer;
}
function drawplatforms() {
    platforms.forEach((pl) => {
        drawplatformleft(pl);
        drawplatformright(pl);
    })
}
function navigateball() {
    document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowLeft' || e.key == 'a') {
            leftkey = true;
        }
        if (e.key == 'ArrowRight' || e.key == 'd') {
            rightkey = true;
        }
    })
    document.addEventListener('keyup', (e) => {
        if (e.key == 'ArrowLeft' || e.key == 'a') {
            leftkey = false;
        }
        if (e.key == 'ArrowRight' || e.key == 'd') {
            rightkey = false;
        }
    })
}



function movement() {
    document.getElementById("btnPlaceOrder").disabled = true; 
    const interval = setInterval(() => {
        let lastplatform = platforms[platforms.length - 1];
        let firstplatform = platforms[0];
        if (firstplatform.y < -25) {
            platforms.shift();
            score++;
            console.log(score);
        }
        if (lastplatform.y < canvasHeight) {
            platforms.push(
                {x:0, y:lastplatform.y + 100, width:randomwidth(), height:20}
            )
        }
        platforms.forEach(pl => {
            pl.y -= dy;
        });
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#ebfbe6';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        drawplatforms()
        drawball()
        navigateball()
        drawscore()
        if (ball.y < 0){
            alert('Game Over 🤕');
            clearInterval(interval);
            score = 0;
            platforms = [
                {x:0, y:canvasHeight, width:randomwidth(), height:20},
            ]
            leftkey = rightkey = false;
            document.getElementById("btnPlaceOrder").disabled = false; 
        }
    }, ms);
    
    
}

// movement()

