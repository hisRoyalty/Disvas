declare module 'Disvas' {


export class Disvas {
    static fakeMessage(options?: {
        displayName: any;
        displayAvatar: any;
        roleColor: any;
        text: any;
    }): Promise<Buffer>;
    static atomize(image: any): Promise<any>;
    static textOnAvatar(image: any, args: any): Promise<any>;
    static rain(image: any): Promise<any>;
    static freeze(image: any): Promise<any>;
}
}
// improved in future with JSDOC !