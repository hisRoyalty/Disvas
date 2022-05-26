const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');


module.exports = async(image) => {
    const img = await Canvas.loadImage(image);
    const encoder = new GIFEncoder(256, 310);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(0);
    encoder.setQuality(2);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 256, 310);
    gradient.addColorStop(0.2, "pink");
    gradient.addColorStop(0.3, "red");
    gradient.addColorStop(0.4, "orange");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(0.6, "green");
    gradient.addColorStop(0.7, "turquoise");
    gradient.addColorStop(0.8, "violet");
    ctx.drawImage(img, 0, 0, 256, 310);
    var pixels = ctx.getImageData(0, 0, 256, 310);
    ctx.clearRect(0, 0, 256, 310);
    var particlesArray = [];
    function generateRandom(min = 6000, max = 6200){
      let diff = max - min
      let rand = Math.random()
      rand = Math.floor(rand * diff)
      rand = rand + min
  
      return rand
  }
    var numberOfParticles = generateRandom();
    ctx.fillText();
    var mappedImage;
  
    mappedImage = [];
    for (var y = 0; y < 310; y++) {
      var row = [];
      for (var x = 0; x < 256; x++) {
        var red = pixels.data[y * 4 * pixels.width + x * 4];
        var green = pixels.data[y * 4 * pixels.width + (x * 4 + 1)];
        var blue = pixels.data[y * 4 * pixels.width + (x * 4 + 2)];
        var brightness = calculateRelativeBrightness(red, green, blue);
        var cellBrightness = void 0;
        var cellColor = void 0;
        var cell = [
          (cellBrightness = brightness),
          (cellColor = "rgb(" + red + "," + green + "," + blue + ")"),
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
        ) / 100
      );
    }


    /*
    * @INFO
    * function to calculate the brightness of a pixel
    https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    check this link if you have problems.
    */
    var Particle = (function () {
      function Particle() {
        this.x = Math.random() * 256;
        this.y = Math.random() * 310;
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
          mappedImage[this.position1] &&
          mappedImage[this.position1][this.position2]
        ) {
          this.speed = mappedImage[this.position1][this.position2][0];
        }
        var movement = 2.5 - this.speed + this.velocity;
        this.angle += this.speed / 20;
        this.size = this.speed * 2.8;
        this.y -= movement;
        this.x += movement + Math.sin(this.angle) * 2;
        if (this.y <= 0) {
          this.y = 310;
          this.x = Math.random() * 256;
        }
        if (this.x >= 256) {
          this.x = 0;
          this.y = Math.random() * 310;
        }
      };
      Particle.prototype.draw = function () {
        ctx.beginPath();
        if (
          mappedImage[this.position1] &&
          mappedImage[this.position1][this.position2]
        ) {
          ctx.fillStyle = mappedImage[this.position1][this.position2][1];
          ctx.strokeStyle = mappedImage[this.position1][this.position2][1];
        }
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      };
      return Particle;
    })();
    function init() {
      for (var i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    init();
    function animate() {
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, 256, 310);
      ctx.globalAlpha = 0.2;
      for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        if(i % 10 == 0 && i > 5000) { 
          encoder.addFrame(ctx);
        }
        ctx.globalAlpha = 1;
        particlesArray[i].draw();
      }
    }
    animate();
    encoder.finish()
    return encoder.out.getData()
  };