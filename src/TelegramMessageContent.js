"use strict";

class TelegramMessageContent {

    constructor({text, mode}) {
        this.text = text;
        this.mode = mode;
    }

}

module.exports = { TelegramMessageContent };