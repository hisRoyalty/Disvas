# Disvas
Image manipulation tool to manipulate images!

# Installation
```sh
$ npm i disvas
```

[![NPM](https://nodei.co/npm/disvas.png)](https://nodei.co/npm/disvas/)

# Documentation
Coming soon!

# Examples
> ## Atomize
```js
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const disvas = require("disvas");

client.on("ready", () => {
    console.log("Bot is online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!atomize") {
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        let buffer = await disvas.atomize(avatar);
        let attachment = new MessageAttachment(buffer, "Amotize.gif");
        return message.channel.send(attachment);
    }
});
client.login(token)
```

> ## Text on Avatar
```js
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const disvas = require("disvas");

client.on("ready", () => {
    console.log("Bot is online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!textOnAvatar") {
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        let args = message.content.split(" ").slice(1);
        let buffer = await disvas.textOnAvatar(avatar, args);
        let attachment = new MessageAttachment(buffer, "TextOnAvatar.gif");
        return message.channel.send(attachment);
    }
});
client.login(token)
```

> ## Rain
```js
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const disvas = require("disvas");

client.on("ready", () => {
    console.log("Bot is online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!rain") {
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        let buffer = await disvas.rain(avatar);
        let attachment = new MessageAttachment(buffer, "Rain.gif");
        return message.channel.send(attachment);
    }
});
client.login(token)
```

> ## Freeze
```js
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const disvas = require("disvas");

client.on("ready", () => {
    console.log("Bot is online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!freeze") {
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        let buffer = await disvas.freeze(avatar);
        let attachment = new MessageAttachment(buffer, "Freeze.gif");
        return message.channel.send(attachment);
    }
});
client.login(token)
```

> ## FakeMessage [BETA]
```js
const { Client, MessageAttachment } = require("discord.js");
const client = new Client();
const disvas = require("disvas");

client.on("ready", () => {
    console.log("Bot is online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!fakeMessage") {
        let name = message.author.username;
        let avatar = message.author.displayAvatarURL({ format: 'png' });
        let hex = "#ffffff";
        let content = message.content;
        let buffer = await disvas.fakeMessage(name, avatar, hex, content);
        let attachment = new MessageAttachment(buffer, "FakeMessage.png");
        return message.channel.send(attachment);
    }
});
client.login(token)
```

## Owner

<img align="left" width="50" height="50" src="https://avatars.githubusercontent.com/u/78647871">
<br>
I'm a cool guy.

## Contributers
### hisRoyalty

<img align="left" width="50" height="50" src="https://avatars.githubusercontent.com/u/88897968">
<br>
I love baguettes

# Note
> this package might have some bugs, cause it's under dev state.
