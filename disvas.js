const { MessageAttachment, MessageEmbed } = require('discord.js');
const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');
const fs = require('fs');

async function fakeMessage(message, user, text) {
    let member = message.guild.members.cache.get(user.id);
    if(!message) {
        throw Error ("[Disvas]: Message does not exist!")
    }
    if(!member) {
        throw Error ("[Disvas]: User is not defined!")
    }
    let displayName = member.displayName;
    let roleColor = member.displayHexColor;
    let textArray = [];
    let getStretch = textAllign(text, textArray);
    text = textArray.map(t => `${t}`).join("\n");
    if(!text) {
        throw Error ("[Disvas]: Text is not provided!")
    }
    if(roleColor === '#000000') {
        roleColor = '#fdfdfc'
    };
   try {
    // Register Font
    Canvas.registerFont("./fonts/Uni Sans Thin.otf", { family: "discord-font-thin" } );
    Canvas.registerFont("./fonts/Uni Sans Regular.ttf", { family: "discord-font-regular" } );
    Canvas.registerFont("./fonts/Uni Sans Book.ttf", { family: "discord-font-book" } );
    // Creating Background
    let stretch = 20 * getStretch;
    const width = 700;
    const height = 100 + stretch;
    const canvas = Canvas.createCanvas(width, height);
	const context = canvas.getContext('2d');
    context.fillStyle = '#36393f'
    context.fillRect(0, 0, width, height)
    // Display Name
    context.font = '20px discord-font-regular';
    context.fillStyle = `${roleColor}`;
    context.fillText(`${displayName}`, 120, 45);
    // Time
    let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: "numeric", hour12: true });
    let nameLength = displayName.length * 2.4;
    let formatTime = " ".repeat(nameLength) + `Today at ${time}`;
    context.font = '15px discord-font-thin';
    context.fillStyle = '#696d73';
    context.fillText(`${formatTime}`, 125, 45);
    // Text
    context.font = '18px discord-font-book';
    context.fillStyle = `#ffffff`;
    context.fillText(`${text}`, 120, 75);
    // User Avatar
    context.beginPath();
	context.arc(60, 60, 35, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
    let avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png' }));
	context.drawImage(avatar, 25, 25, 70, 70);
    context.restore();

    //test
    const attachment = new MessageAttachment(canvas.toBuffer(), 'fakeMessage.png');
    const fakeEmbed = new MessageEmbed()
		.setTitle(`Disvas | Fake Message`)
        .setImage('attachment://fakeMessage.png')
		message.channel.send({ embeds: [fakeEmbed], files: [attachment] });

 } catch (e) {
        console.log(e);
    }
};

// Text on Avatar
async function textOnAvatar(user, message) {
const encoder = new GIFEncoder(150, 150);
encoder.createReadStream().pipe(fs.createWriteStream('./gif/encoded.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(500);
encoder.setQuality(10);

const canvas = Canvas.createCanvas(150, 150);
const context = canvas.getContext('2d');
let check = message.content.split(" ").splice(2);
if (check.length < '2') throw Error ('[Disvas]: Provided text should be more than one word!')
let avatar = await Canvas.loadImage(user.avatarURL({ format: 'jpeg' }));
setTimeout(async () => {
await check.forEach(async (content) => {
        context.drawImage(avatar, 0, 0, 150, 150);
        context.textAlign = 'center';
        context.font = '30px Impact';
        context.fillStyle = `#ffffff`;
        context.fillText(content, 75, 140, 150);
        encoder.addFrame(context)
})
}, 100)
setTimeout(() => {
    encoder.finish()

// test
const fakeEmbed = new MessageEmbed()
.setTitle(`Disvas | Text On Image`)
.setImage('attachment://encoded.gif')
message.channel.send({ embeds: [fakeEmbed], files: ['./gif/encoded.gif'] });
}, 150 * check.length)
}

// Alligns Text
function textAllign(text, array) {
let allign = text;
let tries = text.length / 45;
let split = text.split("\n");
if(tries === 0) {
    tries = 1;
}
if(tries != Math.floor(tries)) {
    tries = Math.floor(tries) + 1;
}
for (let i = 0; i < tries; i++) {
let push = allign.substring(0,45);
allign = allign.slice(45);
array.push(push);
  }
  tries = tries + split.length
  return tries;
}

// Ball Effect 

async function ballEffect(image, message) {
    const img = await Canvas.loadImage(image);
    const encoder = new GIFEncoder(256, 310);
    encoder.createReadStream().pipe(fs.createWriteStream('./gif/encoded.gif'));
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(0);
    encoder.setQuality(2);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 256, 310); //256=w, 310=h (test)
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
    function generateRandom(min = 6000, max= 6200){
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
  
    function calculateRelativeBrightness(red, green, blue) {
      return (
        Math.sqrt(
          red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114
        ) / 100
      );
    }
    var Particle = /** @class */ (function () {
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
          console.log('<=')
          encoder.addFrame(ctx);
        }
        ctx.globalAlpha = 1;
        particlesArray[i].draw();
      }
    }
    animate();
    encoder.finish()
    message.channel.send({ files: ['./gif/encoded.gif'] });
  };

module.exports = {
    fakeMessage, textOnAvatar, ballEffect
};

