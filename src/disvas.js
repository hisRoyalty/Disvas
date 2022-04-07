const FakeMessage = require('../libs/fakeMessage');
const Atomize = require('../libs/atomize')
const TextOnAvatar = require('../libs/textOnAvatar')
const Rain = require('../libs/rain')
const Freeze = require('../libs/freeze');
class Disvas {
    constructor() {
        throw Error(`[Disvas]: Instantiating of Disvas class failed! Please use static methods of Disvas instead!`)
    }
    static async fakeMessage(options = { displayName, displayAvatar, roleColor, text }) {
        if(!options.displayName) {
            throw Error('[Disvas]: Display Name is not provided!')
        }
        if(!options.roleColor) {
            throw Error('[Disvas]: Role Color is not provided!')
        }
        if(!options.text) {
            throw Error('[Disvas]: Message Text is not provided!')
        
        }
        if(!options.displayAvatar) {
            throw Error('[Disvas]: Display Avatar is not provided!')
        }
        return await FakeMessage(options.displayName, options.displayAvatar, options.roleColor, options.text);   


    
    }

    static async atomize(image) {
        if(!image) {
            throw Error('[Disvas]: Image parameter is missing!')
        }
        return await Atomize(image)
    
    }

    static async textOnAvatar(image, args) {
        return await TextOnAvatar(image, args)
        
        
    }
    static async rain(image) {
        if(!image) {
            throw Error(
                '[Disvas]: Image parameter is missing!'
            )

        }
        return await Rain(image)
    }

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
