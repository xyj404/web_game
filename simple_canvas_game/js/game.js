var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
//Background image
var bgReady = true;
var bgImage = new Image();
// bgImage.onload = function(){
	// bgReady = true;
// };
bgImage.src = "images/background.png";
//Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "images/hero.png";
//Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
	speed:256 //movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

//Handle keyboard  controls
var keysDown = {};
addEventListener("keydown",function(e){
	keysDown[e.keyCode] = true;
},false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
},false);

//Reset the game when the player catches a monster
var reset = function(){
	// hero.x = canvas.width/2;
	// hero.y = canvas.height/2;

//Throw the monster somewhere on the screen randomely
monster.x = 32 + (Math.random()*(canvas.width-64));
monster.y = 32 + (Math.random()*(canvas.height-64));
};

var update = function(modifier){
	//Player holding up
	// console.log(modifier);
	if (38 in keysDown && hero.y >= 0){ 
		hero.y -= hero.speed*modifier;
	}
	//Player holding down
	if (40 in keysDown && hero.y <= 450){ 
		hero.y += hero.speed*modifier;
	}
	//Player holding left
	if (37 in keysDown && hero.x >= 0){ 
		hero.x -= hero.speed*modifier;
	}
	//Player holding right
	if (39 in keysDown && hero.x <= 480){ 
		hero.x += hero.speed*modifier;
	}

	//Are they touching?
	if(
		hero.x <= (monster.x + 31)
		&& monster.x <= (hero.x + 31)
		&& hero.y <= (monster.y + 32)
		&&monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

//Draw everything
var render = function(){
	if (bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady){
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady){
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	//score
	ctx.fillStyle = "rgb(250, 250, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
}

//The main game loop
var main = function(){
	var now = Date.now();
	var delta = now - then;
	// console.log(delta);
	update(delta/1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame;

var then = Date.now()
hero.x = canvas.width/2;
hero.y = canvas.height/2;
reset();
main();