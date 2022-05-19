"use strict";

const TelegramBot = require("node-telegram-bot-api");

const token = process.env["telegram-token"];
const chatId = process.env["telegram-chat-id"];


class TelegramDriver {

    constructor() {
        this.api = new TelegramBot(token, {polling: true});

    }

    send({text, mode}) {
        this.api.sendMessage(chatId, text, {
            parse_mode: mode
        });
    }

}

module.exports = { TelegramDriver };

