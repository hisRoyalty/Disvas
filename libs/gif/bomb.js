const Gif = require("canvas-gif");
const utils = require("../../utility/utils");
const path = require("path");


module.exports = async (image) => {
  const pfp = await utils.imageBufferChecker(image);

  const gif = new Gif(400, 400, 46);

  await gif.drawImage(pfp, 0, 0, {
	width: 400,
	height: 400,
	includedFrames: [
		{
		  from: 1,
		  to: gif.frameCount,
		},
	  ],
  });

  const img = await Gif.fromPath(path.resolve(__dirname, '../../assets/gif/bomb.gif'));
  img.resize(400, 400);

  await gif.drawGif(img, 0, 0, {
    fps: img.fps,
  });

  return await gif.render();
};