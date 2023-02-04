const Gif = require("canvas-gif");
const utils = require('../../utility/utils')


module.exports = async (image) => {
  
  const gif = new Gif(400, 400, 18);
  const buffer = await utils.imageBufferChecker(image)
  
  
  const width = 600;
  const height = 600;
  const options = {
    width,
    height,
    includedFrames: [
      {
        from: 1,
        to: 3,
      },
    ],
  };

  

  await gif.drawImage(buffer, 0, 0, options);

  for (let i = 0; i < 400; i += 200) {
    await gif.drawImage(buffer, i, 0, {
      width: 200,
      height: 400,
      includedFrames: [
        {
          from: 4,
          to: 6,
        },
      ],
    });
  }

  const _ = [
    { x: 0, y: 0 },
    { x: 0, y: 200 },
    { x: 200, y: 0 },
    { x: 200, y: 200 },
  ];

  _.forEach(async (arr) => {
    await gif.drawImage(buffer, arr.x, arr.y, {
      width: 200,
      height: 200,
      includedFrames: [
        {
          from: 7,
          to: 9,
        },
      ],
    });
  });

  for (let i = 0; i <= 300; i += 100) {
    for (let j = 0; j <= 300; j += 100) {
      await gif.drawImage(buffer, i, j, {
        width: 100,
        height: 100,
        includedFrames: [
          {
            from: 10,
            to: 12,
          },
        ],
      });
    }
  }

  let x = 0;
  let y = 0;

  for (let i = 0; i < 16; i++) {
    await gif.drawImage(buffer, x * 100, y * 100, {
      width: 100,
      height: 100,
      includedFrames: [
        {
          from: 10,
          to: 12,
        },
      ],
    });

    x = x++;
    y = y;

    if (x == 4) {
      x = 0;
      y += 1;
    }
  }

  for (let i = 0; i <= 350; i += 50) {
    for (let j = 0; j <= 350; j += 50) {
      await gif.drawImage(buffer, i, j, {
        width: 50,
        height: 50,
        includedFrames: [
          {
            from: 13,
            to: 15,
          },
        ],
      });
    }
  }

  for (let i = 0; i <= 375; i += 25) {
    for (let j = 0; j <= 375; j += 25) {
      await gif.drawImage(buffer, i, j, {
        width: 25,
        height: 25,
        includedFrames: [
          {
            from: 16,
            to: 18,
          },
        ],
      });
    }
  }
  
  

  

  return await gif.render();
}

