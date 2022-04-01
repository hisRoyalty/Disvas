const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');

module.exports = async(image) => {
    const img = await Canvas.loadImage(image)
    const rain = await Canvas.loadImage('../assets/rain.png')
    const encoder = new GIFEncoder(256, 310);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(0);
    encoder.setQuality(4);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");
    
    function greyscale(ctx) {
        const imgData = ctx.getImageData(0, 0, 256, 310);
        
        for (let i = 0; i < imgData.data.length; i += 4) {
            let lightness = parseInt((imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2]) / 3);
            imgData.data[i] = lightness / 2;
            imgData.data[i + 1] = lightness / 2;
            imgData.data[i + 2] = lightness / 2;
        }
    
        return ctx.putImageData(imgData, 0, 0);
    }

    function animate () {
        let x = -20;
        let y = -200;
        for (let i = 0; i < 10; i++) {
        if (y > -50) { y = -200 }
        ctx.globalAlpha = 0.7
        ctx.drawImage(img, 0, 0, 256, 310)
        greyscale(ctx)
        ctx.drawImage(rain, x, y, 356, 620)
        y = y + 50;
        encoder.addFrame(ctx);        
        }
    
    }
    animate();

    encoder.finish()
    return encoder.out.getData()
}
