const { rejects } = require("assert");
const axios = require("axios");
const fs = require("fs");
const { request } = require("http");
const fetch = require("node-fetch");
const path = require("path");

async function isGif(buffer) {
  if (!buffer || buffer.length < 3) {
    return false;
  }

  return buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46;
}





const checkUrl = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
};



async function checkImageUrl(url) {
  if ((await checkUrl(url)) === true) {
    const res = await fetch(url);
    const buff = await res.blob();

    return buff.type.startsWith("image/");
  }
  return false;
}



// * IMPORTANT: Buffer parameter of imageBufferChecker can either be a URL or a buffer
async function imageBufferChecker(buffer) {
  if ((await checkImageUrl(buffer)) === true && typeof buffer === "string") {
    const buffImg = await fetch(buffer);
    return Buffer.from(await buffImg.arrayBuffer());
  }
  const imageExt = new Set([
	'png',
	'jpg',
	'jpeg',
	'gif',
	'avif',
	'webp',
	'gif',
	'tiff',
	'svg'
  ])
  function checkImagePath(pathk) {
	if (typeof path !== 'string') {
		return false;
	}
	if (imageExt.has(path.extname(pathk))) {
		return true
	}

  }


  if ((await checkImageUrl()))
  if ((await checkImageUrl(buffer)) === false) {
    return buffer;
  }
}
const imageExt = new Set([
	'png',
	'jpg',
	'jpeg',
	'gif',
	'avif',
	'webp',
	'gif',
	'tiff',
	'svg'
  ])
function checkImagePath(pathk) {
	if (typeof pathk !== 'string') {
		return false;
	}
	if (fs.existsSync(pathk) === true && imageExt.has(path.extname(pathk))) {
		return true
	}
	return false

  }
  
console.log(checkImagePath('tets.png'))

module.exports = {
  isGif,
  imageBufferChecker,
};
