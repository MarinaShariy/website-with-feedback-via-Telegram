"use strict";

const TelegramBot = require("node-telegram-bot-api");

// const token = process.env["telegram-token"];
// const chatId = process.env["telegram-chat-id"];


class TelegramDriver {

    constructor(token, chatId) {
        this.token = token;
        this.chatId = chatId;


        this.api = new TelegramBot(token);

    }

    send(messageContent) {

        this.api.sendMessage(this.chatId, messageContent.text, {
            parse_mode: messageContent.mode
        });
    }

}

module.exports = { TelegramDriver };

