/**
 * TODO: Implement better quality, redo the whole thing, make it more proficient, redo the alignment.
 */

const Canvas = require('canvas');

module.exports = async (displayName, displayAvatar, roleColor, text) => {
	const textArray = [];
	const getStretch = textAlign(text, textArray);
	text = textArray.map((t) => `${t}`).join('\n');

	if (roleColor === '#000000') {
		roleColor = '#fdfdfc';
	}
	
		// Register Font
		Canvas.registerFont('./assets/fonts/whitneybook.otf', {
			family: 'whitneybook',
		});
		Canvas.registerFont('./assets/fonts/whitneylight.otf', {
			family: 'whitneylight',
		});
		Canvas.registerFont('./assets/fonts/whitneymedium.otf', {
			family: 'whitneymedium',
		});
		// Creating Background
		const stretch = 20 * getStretch;
		const width = 700;
		const height = 100 + stretch;
		const canvas = Canvas.createCanvas(width, height);
		const context = canvas.getContext('2d');
		context.fillStyle = '#36393f';
		context.fillRect(0, 0, width, height);
		// Display Name
		context.font = '20px whitneymedium';
		context.fillStyle = `${roleColor}`;
		context.fillText(`${displayName}`, 120, 45);
		// Time
		const time = new Date().toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		const x = alignTime(displayName);
		context.font = '15px whitneylight';
		context.fillStyle = '#a3a6aa';
		context.fillText(`Today at ${time}`, x, 45);
		// Text
		context.font = '18px whitneybook';
		context.fillStyle = '#ffffff';
		context.fillText(`${text}`, 120, 75);
		// User Avatar
		context.beginPath();
		context.arc(60, 60, 35, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();
		const avatar = await Canvas.loadImage(displayAvatar);
		context.drawImage(avatar, 25, 25, 70, 70);
		context.restore();

		// return data
		return canvas.toBuffer();
	
};

// aligns Text
function textAlign(text, array) {
	let align = text;
	let tries = text.length / 45;
	const split = text.split('\n');
	if (tries === 0) {
		tries = 1;
	}
	if (tries != Math.floor(tries)) {
		tries = Math.floor(tries) + 1;
	}
	for (let i = 0; i < tries; i++) {
		let toSub = 45;
		align.split('').forEach((t) => {
			toSub = t.toUpperCase() == t ? toSub : toSub + 0.1;
		});
		const subsNum = Math.floor(toSub);
		const push = align.substring(0, subsNum);
		align = align.slice(subsNum);
		array.push(push);
	}
	tries += split.length;
	return tries;
}

// align Time
function alignTime(name) {
	let x = 120;
	characters = name.split('');
	characters.forEach((c) => {
		x = c.toUpperCase() == c ? x + 14.6 : x + 10.6;
	});
	return x;
}
