const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

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

module.exports = {
    fakeMessage
};
