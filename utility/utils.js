const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const process = require("process");

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

async function imageBufferChecker(buffer) {
  if ((await checkImageUrl(buffer)) === true && typeof buffer === "string") {
    const buffImg = await fetch(buffer);
    return Buffer.from(await buffImg.arrayBuffer());
  }

  const imageExt = new Set([
    "png",
    "jpg",
    "jpeg",
    "gif",
    "avif",
    "webp",
    "gif",
    "tiff",
    "svg",
  ]);
  function checkImagePath(args) {
    if (typeof args !== "string") {
      return false;
    }
    if (
      fs.existsSync(args) === true &&
      imageExt.has(path.extname(args).slice(1).toLowerCase())
    ) {
      return true;
    }
    return false;
  }

  if (typeof buffer === "string" && checkImagePath(buffer) === true) {
    const cwd = process.cwd();
    return fs.readFileSync(path.resolve(cwd.toString(), buffer));
  }
  if ((await checkImageUrl(buffer)) === false) {
    return buffer;
  }
}

module.exports = {
  isGif,
  imageBufferChecker,
};
