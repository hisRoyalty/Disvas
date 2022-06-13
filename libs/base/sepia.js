const Canvas = require('canvas');

module.exports = async (image) => {
	const img = await Canvas.loadImage(image);

	const canvas = Canvas.createCanvas(img.width, img.height);

	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	const id = ctx.getImageData(0, 0, img.width, img.height);
	const data = id.data;
	for (let i = 0; i < data.length; i += 4) {
		data[i] = data[i] * 0.393 + data[i + 1] * 0.769 + data[i + 2] * 0.189;
		data[i + 1] =
      data[i + 1] * 0.349 + data[i + 1] * 0.686 + data[i + 2] * 0.168;
		data[i + 2] =
      data[i + 2] * 0.272 + data[i + 1] * 0.534 + data[i + 2] * 0.131;
	}
	ctx.putImageData(id, 0, 0);
	return canvas.toBuffer();
};
