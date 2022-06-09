export = Disvas;
declare class Disvas {
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
    static fakeMessage(options?: {
        displayName?: string;
        displayAvatar?: Buffer | string;
        roleColor?: string;
        text?: string;
    }): Promise<Buffer>;
    /**
     * Apply the Atomization effect to the image. Returns a GIF.
     * @param {Buffer|string} image Image to atomize.
     * @returns {Promise<Buffer>}
     */
    static atomize(image: Buffer | string): Promise<Buffer>;
    /**
     * Applies a grayscale effect on the image.
     * @see https://en.wikipedia.org/wiki/Grayscale
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Grayscale#/media/File:Grayscale_8bits_palette_sample_image.png Reference}
     */
    static grayscale(image: Buffer | string): Promise<Buffer>;
    /**
     * Applies a greyscale effect on the image.
     * @see https://en.wikipedia.org/wiki/Greyscale
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Greyscale#/media/File:Grayscale_8bits_palette_sample_image.png Reference}
     */
    static greyscale(image: Buffer | string): Promise<Buffer>;
    /**
     * Applies a sepia effect on the image.
     * @see https://en.wikipedia.org/wiki/Sepia_(color)
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://cms-assets.tutsplus.com/cdn-cgi/image/width=1250/uploads/users/108/posts/34119/final_image/sepia-effect-photoshop-final.jpg Reference}
     */
    static sepia(image: Buffer | string): Promise<Buffer>;
    /**
     * Puts text on a GIF, likewise a 'meme'.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @param {string} args Text which is displayed on the returned GIF. It is separated by spaces.
     * @returns {Promise<Buffer>}
     */
    static textOnAvatar(image: Buffer | string, args: string): Promise<Buffer>;
    /**
     * Applies a droste effect on the image.
     * [!] This method is not finished yet and is being worked on.
     * @see https://en.wikipedia.org/wiki/Droste_effect
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     * {@link https://en.wikipedia.org/wiki/Droste_effect#/media/File:Droste_1260359-nevit.jpg Reference}
     */
    static droste(image: Buffer | string): Promise<Buffer>;
    /**
     * Applies a rain effect to the image. Returns a GIF.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     */
    static rain(image: Buffer | string): Promise<Buffer>;
    /**
     * 'Freezes' the image. Returns a GIF.
     * @param {Buffer|string} image Image to use for the manipulation.
     * @returns {Promise<Buffer>}
     */
    static freeze(image: Buffer | string): Promise<Buffer>;
}
