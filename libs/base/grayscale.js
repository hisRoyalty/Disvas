const Canvas = require('canvas');

module.exports = async (image) => {
	const img = await Canvas.loadImage(image);

	const canvas = Canvas.createCanvas(img.width, img.height);

	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const id = ctx.getImageData(0, 0, img.width, img.height);
	ctx.clearRect(0, 0, img.width, img.height);
	const data = id.data;
	for (let i = 0; i < data.length; i += 4) {
		let r = data[i];
		let g = data[i + 1];
		let b = data[i + 2];
		let y = 0.291 * r + 0.569 * g + 0.14 * b;
		data[i] = y;
		data[i + 1] = y;
		data[i + 2] = y;
	}
	ctx.putImageData(id, 0, 0);
	return canvas.toBuffer();
};
