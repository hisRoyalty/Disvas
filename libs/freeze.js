const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');

module.exports = async(image) => {
    const img = await Canvas.loadImage(image)
    const frost = await Canvas.loadImage('../assets/snowflake.png')
    const encoder = new GIFEncoder(256, 310);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(0);
    encoder.setQuality(5);
    const canvas = Canvas.createCanvas(256, 310);
    const ctx = canvas.getContext("2d");

    function animate () {
        ctx.drawImage(img, 0, 0, 256, 310);
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 256, 310);
        for (let i = 0; i < 60; i++) {
        let x = Math.random() * 246 + 5
        let y = Math.random() * 300 + 5
        let size = Math.random() * 200 + 20
            ctx.globalAlpha = 0.07;
            ctx.drawImage(frost, x, y, size, size)
            encoder.addFrame(ctx);        
        }
    
    }
    animate();

    encoder.finish()
    return encoder.out.getData()
}