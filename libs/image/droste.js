const Canvas = require('canvas');

module.exports = async (image) => {
	const img = await Canvas.loadImage(image);
	const w = 800;
	const h = 600;
	const canvas = Canvas.createCanvas(w, h);
	const ctx = canvas.getContext('2d');

	//TODO: Improve code, write better code and not so ugly code 💩
	ctx.drawImage(img, 0, 0, w, h);
	ctx.drawImage(img, 30, 55, w - 60, h - 110);
	ctx.drawImage(img, 80, 100, w - 80 * 2, h - 100 * 2);
	ctx.drawImage(img, 110, 150, w - 110 * 2, h - 150 * 2);
	ctx.drawImage(img, 130, 185, w - 130 * 2, h - 185 * 2);
	ctx.drawImage(img, 150, 220, w - 150 * 2, h - 220 * 2);

	return canvas.toBuffer();
};
