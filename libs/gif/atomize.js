const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');

module.exports = async (image) => {
	const img = await Canvas.loadImage(image);
	const encoder = new GIFEncoder(280, 280);
	encoder.start();
	encoder.setRepeat(0);
	encoder.setDelay(0);
	encoder.setQuality(2);
	const canvas = Canvas.createCanvas(280, 280);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, 280, 280);
	const pixels = ctx.getImageData(0, 0, 280, 280);
	ctx.clearRect(0, 0, 280, 280);
	const particlesArray = [];
	function generateRandom(min = 6000, max = 6280) {
		const diff = max - min;
		let rand = Math.random();
		rand = Math.floor(rand * diff);
		return rand + min;
	}
	const numberOfParticles = generateRandom();
	ctx.fillText();
	const mappedImage = [];

	for (let y = 0; y < 280; y++) {
		const row = [];
		for (let x = 0; x < 280; x++) {
			const red = pixels.data[y * 4 * pixels.width + x * 4];
			const green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
			const blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
			const brightness = calculateRelativeBrightness(red, green, blue);
			let cellBrightness = undefined;
			let cellColor = undefined;
			const cell = [
				(cellBrightness = brightness),
				(cellColor = `rgb(${red},${green},${blue})`),
			];
			row.push(cell);
		}
		mappedImage.push(row);
	}
		

	// formula for calculating the brightness of a pixel
	function calculateRelativeBrightness(red, green, blue) {
		return (
			Math.sqrt(
				red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
			) / 280
		);
	}

	/*
				* @INFO
				* function to calculate the brightness of a pixel
				https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
				check this link if you have problems.
				*/
	const Particle = (() => {
		function Particle() {
			this.x = Math.random() * 280;
			this.y = Math.random() * 280;
			this.speed = 0;
			this.velocity = Math.random() * 0.5;
			this.size = Math.random() * 2.5 + 0.2;
			this.position1 = Math.floor(this.y);
			this.position2 = Math.floor(this.x);
			this.angle = 0;
			this.random = Math.random();
		}
				Particle.prototype.update = function () {
						this.position1 = Math.floor(this.y);
						this.position2 = Math.floor(this.x);
						if (
								mappedImage[this.position1]?.[this.position2]
						) {
								this.speed = mappedImage[this.position1][this.position2][0];
						}
					const movement = 2.5 - this.speed + this.velocity;
						this.angle += this.speed / 20;
						this.size = this.speed * 2.8;
						this.y -= movement;
						this.x += movement + Math.sin(this.angle) * 2;
						if (this.y <= 0) {
								this.y = 280;
								this.x = Math.random() * 280;
						}
						if (this.x >= 280) {
								this.x = 0;
								this.y = Math.random() * 280;
						}
				};
		Particle.prototype.draw = function () {
			ctx.beginPath();
			if (mappedImage[this.position1]?.[this.position2]) {
				ctx.fillStyle = mappedImage[this.position1][this.position2][1];
				ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
			}
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		};
		return Particle;
	})();
	function init() {
		for (let i = 0; i < numberOfParticles; i++) {
			particlesArray.push(new Particle());
		}
	}
	init();
	function animate() {
		ctx.globalAlpha = 0.05;
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(0, 0, 280, 280);
		ctx.globalAlpha = 0.2;
		particlesArray.forEach((particlesArrayItem, i) => {
				particlesArrayItem.update();
				if(i % 10 == 0 && i > 5100) { 
						encoder.addFrame(ctx);
				}
				ctx.globalAlpha = 1;
				particlesArrayItem.draw();
		});
	}
  animate();
	encoder.finish();
	return encoder.out.getData();
}