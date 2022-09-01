"use strict";

const { TelegramMessageContent } = require("./TelegramMessageContent");

class FeedbackTelegramMessageView {

    constructor(fields) {
        this.fields = fields;
    }

    render() {
        return new TelegramMessageContent({
            text: trimLines(`
                <b>name:</b> ${escapeHtml(this.fields.name)}
                <b>email:</b> ${escapeHtml(this.fields.email)}
                <b>question:</b> 
                ${escapeHtml(this.fields.question)}
            `),
            mode: "HTML"
        });
    }
}

module.exports = { FeedbackTelegramMessageView };

// XSS уязвимость - от пользователя может прийти строка с html тегами
// lodash/underscore/... библиотеки умеют правильно экранировать html
// см. sanitize
function escapeHtml(text) {
    return text
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// удаляет ненужные пробельные символы на каждой строке в тексте,
// но при этом последовательность пустых строк преобразуется в один перенос строки
// чтобы это устранить, нужно более точное регулярное выражение для поиска переноса строк([\n\r]+)
// см. EOL
function trimLines(text) {
    return text.trim()
        .split(/[\n\r]+/)
        .map(line => line.trim())
        .join("\n");
}