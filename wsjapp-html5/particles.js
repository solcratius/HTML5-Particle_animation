// particles.js
(function() {
	var cArr = ['146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','146,204,231','26,135,198','35,31,32'],
		pcArr = ['35,31,32','35,31,32','146,204,231','35,31,32','35,31,32','26,135,198','35,31,32','35,31,32'],
		fadeLineY,
		firstRun = true,
		pixelState = 0,
		killp = false,
		killpp = false;

	var Particle = function(x, y, vy, s, k, c, a, f, t) {
	    this.x = x || 0;
	    this.y = y || 0;
	    this.vy = vy || 0;
	    this.s = s || 2;
	    this.k = k || fadeLineY;
	    this.c = c || '255,255,255';
	    this.a = a || 1;
	    this.f = f || true;

	    this.update = function (vy, a) {
			vy = vy || 0;
			a = a || 0;
// console.log(vy);
			if (t == "pp")
			{
				this.y -= this.vy + vy;
				if (this.a > 0) this.a -= .02;
			}
			else
			{
				this.y += this.vy + vy;
				if (this.y > this.k && this.a > 0) this.a -= .075;
			}
	    };
	};
	 
	var ParticleSystem = function(container, center, count, type) {
	    var i = 0,
	        c = container.getContext('2d');
	 
	    count = count || 0;
	    this.particles = [];

	    // Initialization
	    for ( ; i < count; ++i) {
			var x = getRandomNum(1, container.width),
				y = getRandomNum(5, 600),
	        	vy = getRandomNum(100, 450) * .1 + 1000, //getRandomNum(1,100) * .1 - 2.5;
	        	s = getRandomNum(1, 10),
	        	k = fadeLineY,
	        	f = true,
	        	a = 1;

	        	if (x > 110 && x < 280) k = fadeLineY + getRandomNum(50,250);
	        	else k = fadeLineY - getRandomNum(100,500);

			if (type == "pp")
			{
				y = center.y - getRandomNum(1, 150);
				s = getRandomNum(1, 8);
				vy = getRandomNum(1, 15) * .1;
				this.particles.push(new Particle(x, y, vy, s, k, pcArr[getRandomNum(1,8) - 1], a, f, "pp"));
			}
			else
			{
				if (type == "pt") x = getRandomNum(161, container.width);
				if (type == "p") a = .75;
				this.particles.push(new Particle(x, y, vy, s, k, cArr[getRandomNum(1,17) - 1], a, f, "p"));
			}
	    }
	 
	    this.update = function(type) {
			for ( i = 0; i < count; ++i ) {
				if (type == "pp")
		        {
		        	if (this.particles[i].x > 0 && this.particles[i].x < container.width && this.particles[i].y > 0 && this.particles[i].y < container.height) {
						this.particles[i].update();
						c.fillStyle = "rgba(" + this.particles[i].c + "," + this.particles[i].a + ")";
						c.fillRect(this.particles[i].x, this.particles[i].y, this.particles[i].s, this.particles[i].s);
			        } else {
			        	if (!killpp)
			        	{
			        		this.particles[i].y = center.y - getRandomNum(5, 50);
			        		this.particles[i].a = 1;
							this.particles[i].vy = getRandomNum(1, 25) * .1;
			        	}
			        }
		        }
		        else
		        {
		        	if (this.particles[i].x > 0 && this.particles[i].x < container.width && this.particles[i].y > 0 && this.particles[i].y < container.height && this.particles[i].a > 0) {
						if (pixelState >= 1 && this.particles[i].y > 350 && this.particles[i].x <= 155) this.particles[i].a = this.particles[i].a - (this.particles[i].a * .01);
						if (pixelState >= 2) this.particles[i].vy = this.particles[i].vy - (this.particles[i].vy * .01);

						if (this.particles[i].f) this.particles[i].y = getRandomNum(0, 600);
						if (!firstRun && this.particles[i].f) this.particles[i].f = false;

						this.particles[i].update();
						c.fillStyle = "rgba(" + this.particles[i].c + "," + this.particles[i].a + ")";
						c.fillRect(this.particles[i].x, this.particles[i].y, this.particles[i].s, this.particles[i].s);

			        } else {
			        	if (!killp)
			        	{
			        		this.particles[i].y = 1;
							this.particles[i].k = fadeLineY - getRandomNum(1, container.width);
							if (type == "p") this.particles[i].a = .65;
							else this.particles[i].a = 1;
							this.particles[i].vy = getRandomNum(1, 40) * .1;

							if (pixelState >= 2)
							{
								if (this.particles[i].x > 160 && this.particles[i].x < 290) this.particles[i].k = fadeLineY + getRandomNum(1, 250);
								else if (this.particles[i].x > 25 && this.particles[i].x <= 155) this.particles[i].k = fadeLineY - getRandomNum(25, 150);
				        		else this.particles[i].k = fadeLineY - getRandomNum(50, 400);
							}
							else if (pixelState == 1)
							{
								if (this.particles[i].x > 160 && this.particles[i].x < 290) this.particles[i].k = fadeLineY + getRandomNum(150, 250);
								else if (this.particles[i].x > 25 && this.particles[i].x <= 155) this.particles[i].k = fadeLineY + getRandomNum(1, 50);
				        		else this.particles[i].k = fadeLineY - getRandomNum(25, 350);
							}
							else
							{
								if (this.particles[i].x > 160 && this.particles[i].x < 290) this.particles[i].k = fadeLineY + getRandomNum(200, 280);
								else if (this.particles[i].x > 25 && this.particles[i].x <= 155) this.particles[i].k = fadeLineY + getRandomNum(25, 250);
				        		else this.particles[i].k = fadeLineY + getRandomNum(1, 200);
							}
		        		}
			        }
		        }	
			}
	    };
	};

	var getRandomNum = function(min, max) {
		this.min = min || 0;
	    this.max = max || 10;
		return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    };
	
	window.requestAnimFrame = (function() {
		// return function (callback) {
		// 	window.setTimeout(callback, 10);
		// };

		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame   ||
		window.mozRequestAnimationFrame      ||
		window.oRequestAnimationFrame        ||
		window.msRequestAnimationFrame       ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();
 
	function init() {
		//Particles
		var cobj = document.getElementsByClassName('particles')[0].getElementsByTagName('canvas')[0],
		    c = cobj.getContext('2d'),
		    p = null,
		    adFin = false;

		cobj.width = 300;//document.body.clientWidth;
		cobj.height = 620;//document.body.clientHeight + 20;
		fadeLineY = cobj.height - 300;

		c.fillStyle = '#FFFFFF';
		p = new ParticleSystem(cobj, { x: cobj.width / 2, y: 1 }, 750, "p");

		ploop();

		function ploop() {
			c.clearRect(0, 0, cobj.width, cobj.height);
			p.update("p");

			if (!adFin) requestAnimFrame(ploop);
		}

		var cobjt = document.getElementsByClassName('particlesTop')[0].getElementsByTagName('canvas')[0],
		    ct = cobjt.getContext('2d'),
		    pt = null;

		cobjt.width = 300;
		cobjt.height = 620;

		ct.fillStyle = '#FFFFFF';
		pt = new ParticleSystem(cobjt, { x: cobjt.width / 2, y: 1 }, 100, "pt");

		ptloop();

		function ptloop() {
			ct.clearRect(0, 0, cobjt.width, cobjt.height);
			pt.update("pt");

			if (!adFin) requestAnimFrame(ptloop);
		}

		//Product Pixels
		var cpobj = document.getElementsByClassName('product-pixels')[0].getElementsByTagName('canvas')[0],
		    cp = cpobj.getContext('2d'),
		    pp = null;

		cpobj.width = 115;
		cpobj.height = 350;

		cp.fillStyle = "rgba(35,31,32)";
		pp = new ParticleSystem(cpobj, { x: cpobj.width / 2, y: cpobj.height }, 1000, "pp");

		pploop();

		function pploop() {
			cp.clearRect(0, 0, cpobj.width, cpobj.height);
			pp.update("pp");

			requestAnimFrame(pploop);
		}

		window.setTimeout(function(){
			firstRun = false;
		}, 100);

		window.setTimeout(function(){
			pixelState = 1;
		}, 1000);

		window.setTimeout(function(){
			pixelState = 2;
		}, 5000);

		window.setTimeout(function(){
			killpp = true;
		}, 7000);

		window.setTimeout(function(){
			killp = true;
		}, 14000);

		window.setTimeout(function(){
			adFin = true;
		}, 14500);

		//BG
		var cBGobj = document.getElementsByClassName('bg')[0].getElementsByTagName('canvas')[0],
		    cBG = cBGobj.getContext('2d'),
		    cBGColor = "255,255,255",//"49,144,194",
		    cBGAlpha = 0.1;

		cBGobj.width = 300;
		cBGobj.height = 600;

	    bgUpdate();

		function bgUpdate() {
			for (var j = 0; j < 60; j++) {
				for (var k = 0; k < 30; k++) {
					cBG.clearRect((k*10)+1, (j*10)+1, 8, 8);

					if (getRandomNum(1, 8) > 1)
					{
						cBGAlpha = getRandomNum(1, 15) * .01;
						cBG.fillStyle = "rgba(" + cBGColor + "," + cBGAlpha + ")";
						cBG.fillRect((k*10)+1, (j*10)+1, 8, 8);
					}
				}
		    }
			if (!adFin) window.setTimeout(bgUpdate, 250);
		}

		var canvasProd = document.getElementsByClassName('product')[0].getElementsByTagName('canvas')[0],
		    cProd = canvasProd.getContext('2d');
		canvasProd.width = 115;
		canvasProd.height = 230;

		var gStart = 230;
		var gEnd = gStart + 60;
		var int = .5;

		var prodImg = new Image();
		prodImg.src = 'iphone.png';

		prodImg.onload = function() {
			window.setTimeout(function(){
				requestAnimationFrame(prodImgMask);
			}, 3000);
		};
		
		function prodImgMask() {
			int = int + .1;
			gStart = gStart - (.1 * int);
			gEnd = gStart + 60;

			cProd.globalCompositeOperation = 'destination-over';
			gradient = null;
			cProd.clearRect(0, 0, 115, 230);

			cProd.drawImage(prodImg, 0, 0, 115, 230);
		
			var gradient = cProd.createLinearGradient(0, gStart, 0, gEnd);
			gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
			gradient.addColorStop(1, "rgba(255, 255, 255, 1)");

			cProd.globalCompositeOperation = 'destination-in';
			cProd.fillStyle = gradient;
			cProd.fillRect(0, 0, 115, 230);

			if (gEnd > 0) requestAnimationFrame(prodImgMask);
			// if (gEnd > 60) requestAnimationFrame(prodImgMask);
		}
	}

	document.addEventListener('DOMContentLoaded', init);
})();