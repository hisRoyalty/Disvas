const FakeMessage = require('../libs/image/fakeMessage');
const Atomize = require('../libs/gif/atomize')
const TextOnAvatar = require('../libs/gif/textOnAvatar')
const Rain = require('../libs/gif/rain')
const Freeze = require('../libs/gif/freeze');
const Droste = require('../libs/image/droste');
const Grayscale = require('../libs/base/grayscale');
const Sepia = require('../libs/base/sepia');

class Disvas {
    constructor() {
        throw Error(`[Disvas]: Instantiating of ${this.constructor.name} class failed! Please use static methods of the class '${this.constructor.name}' instead!`)
    }


    /**
     * Fake message of a discord user.
     * @param {object} options Options for the fake message.
     * @param {string} [options.displayName] Username/Display name of the fake message.
     * @param {Buffer|string} [options.displayAvatar] Avatar of the fake message.
     * @param {string} [options.roleColor] roleColor of the fake message.
     * @param {string} [options.text] Text displayed in the fake message.
     * @returns {Promise<Buffer>}
     * @todo Improve positions.
     */
    static async fakeMessage(options = { displayName, displayAvatar, roleColor, text }) {
        if(!options.displayName) {
            throw Error('[Disvas]: Parameter displayName was not provided!')
        }
        if(!options.displayAvatar) {
            throw Error('[Disvas]: Parameter displayAvatar was not provided!')
        }
        if(!options.roleColor) {
            throw Error('[Disvas]: Parameter roleColor was not provided!')
        
        }
        if(!options.text) {
            throw Error('[Disvas]: Parameter text was not provided!')
        }
        return await FakeMessage(options.displayName, options.displayAvatar, options.roleColor, options.text);   


    
    }
    /**
     * Apply the Atomization effect to the image. Returns a GIF.
     * @param {Buffer|string} image Image to atomize.
     * @returns {Promise<Buffer>}
     */
    static async atomize(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Atomize(image)
    
    }
    /**
     * Applies a grayscale effect on the image.
     * @see https://en.wikipedia.org/wiki/Grayscale
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Grayscale#/media/File:Grayscale_8bits_palette_sample_image.png Reference}
     */
    static async grayscale(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Grayscale(image)
    }
    /**
     * Applies a greyscale effect on the image.
     * @see https://en.wikipedia.org/wiki/Greyscale
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Greyscale#/media/File:Grayscale_8bits_palette_sample_image.png Reference}
     */
     static async greyscale(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Grayscale(image)
    }
    /**
     * Applies a sepia effect on the image.
     * @see https://en.wikipedia.org/wiki/Sepia_(color)
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://cms-assets.tutsplus.com/cdn-cgi/image/width=1250/uploads/users/108/posts/34119/final_image/sepia-effect-photoshop-final.jpg Reference}
     */
    static async sepia(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Sepia(image)
    }

    /**
     * Puts text on a GIF, likewise a 'meme'.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @param {string} args Text which is displayed on the returned GIF. It is separated by spaces.
     * @returns {Promise<Buffer>}
     */
    static async textOnAvatar(image, args) {
        return await TextOnAvatar(image, args)
        
        
    }
    /**
     * Applies a droste effect on the image. 
     * [!] This method is not finished yet and is being worked on.
     * @see https://en.wikipedia.org/wiki/Droste_effect
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Droste_effect#/media/File:Droste_1260359-nevit.jpg Reference}
     */
    static async droste(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Droste(image)
    }

    /**
     * Applies a rain effect to the image. Returns a GIF.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     */

    static async rain(image) {
        if(!image) {
            throw Error(
                '[Disvas]: Image parameter is missing!'
            )

        }
        return await Rain(image)
    }
    /**
     * 'Freezes' the image. Returns a GIF.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     */
    static async freeze(image) {
        if(!image) {
            throw Error(
                '[Disvas]: Image parameter is missing!'
            )

        }

        return await Freeze(image)
    }
}

module.exports = Disvas;
