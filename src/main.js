"use strict";

const http = require("http");
const path = require("path");
const { TelegramDriver } = require("./TelegramDriver");
const { FsDriver } = require("./FsDriver");
const { MainController } = require("./MainController");
const { FormParser } = require("./FormParser");


const token = process.env["telegram-token"];
const chatId = process.env["telegram-chat-id"];

const staticRoot = path.join(__dirname, "static");

const formParser = new FormParser();

const telegramDriver = new TelegramDriver(token, chatId);
const fsDriver = new FsDriver();
const mainController = new MainController({fsDriver, telegramDriver, formParser, staticRoot});

const server = http.createServer();
server.on("request", (request, response) => {
    mainController.onAnyRequest(request, response);
});

server.listen(3000);