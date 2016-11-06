window.onload = function() {
	var canvas = document.createElement("canvas");
	var c = canvas.getContext("2d");
	var particles = {};
	var particleIndex = 0;
	var particleNum = 2;

	canvas.width = 400;
	canvas.height = 400;

	document.body.appendChild(canvas);

	c.fillStyle = "white";
	c.fillRect(0, 0, canvas.width, canvas.height);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}


	function ParticleSystem(startX, startY) {
		this.particles = {};
		
	}

	function Particle() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.vx = getRandom(-3, -1);
		this.vy = getRandom(-1, 0);

		this.angle = getRandomInt(0, 360);
		this.width = 32;
		this.height = 32;
		this.gravity = 0.3;
		particleIndex++;
		particles[particleIndex] = this;
		this.id = particleIndex;
		this.life = 0;
		this.maxLife = Math.random() * 30 + 50;

		//this.color = "rgba(" + parseInt(Math.random() * 255, 10) + ", " + parseInt(Math.random() * 255, 10) + ", " + parseInt(Math.random() * 255, 10) + ", 1.0)";
		this.image = new Image();
		this.image.src = "image.png";

		

		this.opacity = 1;

		this.scalePercent = 0.1;
	}

	Particle.prototype.draw = function() {
		//this.vy += this.gravity;

		this.life++;

		this.x += this.vx;
		this.y += this.vy;

	/*	if(Math.random() < 0.1) {
			this.vx = Math.random() * 10 - 5;
			this.vy = Math.random() * 10 - 5;
		}*/

		this.angle += 4;
		this.scalePercent += 0.05;

		// Fade out the particle. This would be done in
		// update
		if(this.opacity > 0)
			this.opacity -= 0.02;

		// Ensure we don't get into the minuses because that would
		// mean the particle is visible again
		if(this.opacity < 0)
			this.opacity = 0;


		if(this.life >= this.maxLife) {
			delete particles[this.id];
		}

		// Store the current setup whilst we fiddle around with the
		// origin to perform rotation and scaling on the sprite
		c.save();

		// Move the origin to the center of the current image
		c.translate(this.x, this.y);
		c.translate(this.width / 2, this.height / 2);

		// Scale by a given factor
		c.scale(this.scalePercent, this.scalePercent);
		
		// Do the rotation
		c.rotate(this.angle * Math.PI / 180);

		// Give the appropriate opacity
		c.globalAlpha = this.opacity;

		// Render the image
		c.drawImage(this.image, -this.width / 2, -this.height / 2);
		c.restore();
	};

	/*for(var i = 0; i < 10; i++) {
		new Particle();
	}*/

	setInterval(function() {


		c.fillStyle = "rgba(255, 255, 0, 1)";
		c.fillRect(0, 0, canvas.width, canvas.height);

		for(var i = 0; i < particleNum; i++) {
			new Particle();
		}


		for(var i in particles) {
			particles[i].draw();
		}

		
	}, 30);
};