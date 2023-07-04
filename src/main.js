var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")

var game = {
	keys : [
		{key: 'Spacebar', pressed: false},
		{key: 'ArrowLeft', pressed: false},
		{key: 'ArrowRight', pressed: false},
		{key: 'ArrowDown', pressed: false},
		{key: 'ArrowUp', pressed: false},
		{key: 'X', pressed: false},
		{key: 'x', pressed: false},
		{key: 'Z', pressed: false},
		{key: 'z', pressed: false}
	],
	keyDown : '',
	keyUp : '',
	'draw' : function() { window.Function.call(draw()) },
	'move' : function() { window.Function.call(move()) },
	'setKeyListeners' : function() { 
		document.addEventListener('keydown', function(event) { 
			game.keyDown = event.key 
			console.log("down " + event.key)
			game.setKeyDown()
		})
		document.addEventListener('keyup', function(event) { 
			game.keyUp = event.key
			console.log("up " + event.key)
			game.setKeyUp()
		})
	},
	setKeyUp() 
	{
		for (let i = 0; i < game.keys.length; i++) {
			if (game.keyUp === game.keys[i].key) {
				game.keys[i].pressed = false
			}	
		}
	},
	setKeyDown() 
	{
		for (let i = 0; i < game.keys.length; i++) { 
			if (game.keyDown === game.keys[i].key) {
				game.keys[i].pressed = true
			}
		}	
	},
	isKeyPressed(key)
	{
		for (let i = 0; i < game.keys.length; i++) { 
			if (key === game.keys[i].key) {
				return game.keys[i].pressed
			}
		}	
	}
}

var player = {
	
	deltaAngle : 0.025,
	
	increaseBaseAngle : false,
	decreaseBaseAngle : false,
	increaseUpAngle : false,
	decreaseUpAngle : false,
	
	moveForward : false,
	moveBackward : false,
	velocity : 1,
	
	vectorBase : new Vector(100, 100),
	vectorUp : new Vector(100, 50),
	
	'draw' : function() {  
		console.log(
		"angleBase > " + 180 / Math.PI * player.vectorBase.angle + 
		", angleUp   > " + 180 / Math.PI * player.vectorUp.angle)
   
   		ctx.strokeStyle = "white"
   		ctx.beginPath();
    	ctx.moveTo(this.vectorBase.x, this.vectorBase.y);
    	ctx.lineTo(
			this.vectorBase.x + 50 * Math.cos(this.vectorBase.angle), 
    		this.vectorBase.y - 50 * Math.sin(this.vectorBase.angle)
    	); 		
    	ctx.lineTo(
			this.vectorBase.x - 50 * Math.cos(this.vectorBase.angle), 
    		this.vectorBase.y + 50 * Math.sin(this.vectorBase.angle)
    	); 		
 		ctx.stroke(); 
 		
   		ctx.strokeStyle = "red";
   		ctx.beginPath();
    	ctx.moveTo(this.vectorUp.x, this.vectorUp.y + 50);
    	ctx.lineTo(
			this.vectorUp.x + 100 * Math.cos(this.vectorUp.angle), 
    		this.vectorUp.y + 50 - 100 * Math.sin(this.vectorUp.angle)
    	); 		
 		ctx.stroke()

	},
	'move' : function() { 
		if (player.increaseBaseAngle == true) {
			player.vectorBase.increaseAngle(player.deltaAngle);
			player.increaseBaseAngle = false;
		}
		if (player.decreaseBaseAngle == true) {
			player.vectorBase.decreaseAngle(player.deltaAngle);
			player.decreaseBaseAngle = false;
		}
		if (player.increaseUpAngle == true) {
			player.vectorUp.increaseAngle(player.deltaAngle);
			player.increaseUpAngle = false;
		}
		if (player.decreaseUpAngle == true) {
			player.vectorUp.decreaseAngle(player.deltaAngle);
			player.decreaseUpAngle = false;
		}

		if (player.moveForward == true) {
			player.vectorBase.moveForward(player.velocity);
			player.vectorUp.x = player.vectorBase.x - Math.cos(player.vectorBase.angle);
			player.vectorUp.y = player.vectorBase.y -Math.sin(player.vectorBase.angle) - 50;
			player.moveForward = false;
		}
		if (player.moveBackward == true) {
			player.vectorBase.moveBackward(player.velocity);
			player.vectorUp.x = player.vectorBase.x - Math.cos(player.vectorBase.angle);
			player.vectorUp.y = player.vectorBase.y -Math.sin(player.vectorBase.angle) - 50;
			player.moveBackward = false;
		}	
	},
	'keys' : function() { 
		if (game.isKeyPressed('z') || game.isKeyPressed('Z')) { player.increaseBaseAngle = true }
		if (game.isKeyPressed('x') || game.isKeyPressed('X')) { player.decreaseBaseAngle = true } 
		if (game.isKeyPressed('ArrowLeft')) { player.increaseUpAngle = true }
		if (game.isKeyPressed('ArrowRight')) { player.decreaseUpAngle = true }
		if (game.isKeyPressed('ArrowDown')) { player.moveForward = true }
		if (game.isKeyPressed('ArrowUp')) { player.moveBackward = true }
	}
}

var enemy = {
	x : 0,
	y : 0,
	'draw' : function() { },
	'move' : function() { }
}



function mainLoop() 
{
	player.keys()
	game.draw()
	game.move()
	
  	requestAnimationFrame(mainLoop)
}

function draw() 
{
  	ctx.fillStyle = "black"
  	ctx.fillRect(0, 0, canvas.width, canvas.height)
  	ctx.fill()	  	
  	
	player.draw()
	enemy.draw()  			
}

function move() 
{
	player.move() 
	enemy.move()
}

window.onload 
{
	game.setKeyListeners()
	requestAnimationFrame(mainLoop)
}