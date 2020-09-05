   var canvas = document.getElementById("myCanvas");
   var ctx = canvas.getContext("2d");
   var ballRadius = 10;
   var x = canvas.width/2;
   var y = canvas.height-30;
   var dx = 6;
   var dy = -6;
   var paddleHeight = 10;
   var paddleWidth = 100;
   var paddleX = (canvas.width-paddleWidth)/2;
   var rightPressed = false;
   var leftPressed = false;
   var brickRowCount = 14;
   var brickColumnCount = 14;
   var brickWidth = 75;
   var brickHeight = 20;
   var brickPadding = 10;
   var brickOffsetTop = 30;
   var brickOffsetLeft = 30;
   var score = 0;
   var lives = 3;

	var bricks = [];
	for(c = 0; c < brickColumnCount; c++) {
		bricks [c] = [];
		for(r = 0; r < brickRowCount; r++) {
			bricks [c][r] = {x: 0, y: 0, status: 1};
	}
}
    
    var atomic = new Audio("atomic-bomb.wav");
    var wrongSound = new Audio("Wrong-answer-sound-effect.mp3");
     var youLose = new Audio("sadtrombone.wav");
    var music = new Audio("music1.mp3");
    music.play();
    
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth /2;
	}
}

function collisionDetection() {
	for(c=0; c < brickColumnCount; c++) {
		for(r = 0; r < brickRowCount; r++) {
			var b = bricks[c][r];
			if (b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
				dy = -dy;
				b.status = 0;
                var shotgun = new Audio("shotgun.wav");
                shotgun.play();
				score++;
				if(score == brickRowCount*brickColumnCount) {
                    atomic.play();
					alert("YOU WIN!");
					document.location.reload();
					}
				}
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#FFA500";
	ctx.fill();
	ctx.closePath();
}
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#FFA500";
	ctx.fill();
	ctx.closePath();
}
function drawBricks() {
	for(c = 0; c < brickColumnCount; c++) {
		for(r = 0; r < brickRowCount; r++) { 
			if(bricks[c][r].status == 1) {
				var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#FFA500";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#FFA500";
	ctx.fillText("Score: "+ score, 8, 20);	
}
function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#FFA500";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);	
}
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
	
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) { 
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	}
	else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;          
        }
    else {
        wrongSound.play();
        lives--;
        if(!lives) {
            youLose.play();
            alert("GAME OVER");
           document.location.reload();
        }
        else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 6;
            dy = -6;
            
            
            
        }
    }
}
if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 10;
}
else if(leftPressed && paddleX > 0) {
    paddleX -= 10;   
}

x += dx;    
y += dy;
requestAnimationFrame(draw);
}
draw();
