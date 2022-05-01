const Canvas = require('canvas');

module.exports = async(displayName, displayAvatar, roleColor, text) => {
    let textArray = [];
    let getStretch = textAllign(text, textArray);
    text = textArray.map(t => `${t}`).join("\n");
    
    if(roleColor === '#000000') { 
        roleColor = '#fdfdfc'
    };
   try {
    // Register Font
    Canvas.registerFont("./assets/fonts/whitneybook.otf", { family: "whitneybook" } );
    Canvas.registerFont("./assets/fonts/whitneylight.otf", { family: "whitneylight" } );
    Canvas.registerFont("./assets/fonts/whitneymedium.otf", { family: "whitneymedium" } );
    // Creating Background
    let stretch = 20 * getStretch;
    const width = 700;
    const height = 100 + stretch;
    const canvas = Canvas.createCanvas(width, height);
	const context = canvas.getContext('2d');
    context.fillStyle = '#36393f'
    context.fillRect(0, 0, width, height)
    // Display Name
    context.font = '20px whitneymedium';
    context.fillStyle = `${roleColor}`;
    context.fillText(`${displayName}`, 120, 45);
    // Time
    let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: "numeric", hour12: true });
    let x = allignTime(displayName)
    context.font = '15px whitneylight';
    context.fillStyle = '#a3a6aa';
    context.fillText(`Today at ${time}`, x, 45);
    // Text
    context.font = '18px whitneybook';
    context.fillStyle = `#ffffff`;
    context.fillText(`${text}`, 120, 75);
    // User Avatar
    context.beginPath();
	context.arc(60, 60, 35, 0, Math.PI * 2, true);
	context.closePath();
	context.clip();
    let avatar = await Canvas.loadImage(displayAvatar);
	context.drawImage(avatar, 25, 25, 70, 70);
    context.restore();

    // return data
    return canvas.toBuffer();

 } catch (e) {
        console.log(e);
    }
};

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
let tosub = 45;
allign.split("").forEach(t => {
if(t.toUpperCase() == t) {
    tosub = tosub
} else {
    tosub = tosub + 0.1
}
})
let subsNum = Math.floor(tosub);
console.log(subsNum)
let push = allign.substring(0, subsNum);
allign = allign.slice(subsNum);
array.push(push);
  }
  tries = tries + split.length
  return tries;
}

// Allign Time
function allignTime(name) {
let x = 120;
characters = name.split("")
characters.forEach(c => {
    if(c.toUpperCase() == c) {
    x = x + 14.6
    } else {
    x = x + 10.6
    }
  })
    return x;
}