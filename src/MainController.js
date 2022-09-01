"use strict";

const { FeedbackTelegramMessageView } = require("./FeedbackTelegramMessageView");
const path = require("path");

class MainController {

    constructor({fsDriver, telegramDriver, formParser, staticRoot}) {
        this.telegramDriver = telegramDriver;
        this.fsDriver = fsDriver;
        this.formParser = formParser;
        this.staticRoot = staticRoot;
    }

    async onAnyRequest(request, response) {
        const {method, url} = request;

        if (method === "GET") {

            const pathToFile = path.normalize(this.staticRoot + url);
            const isExistFile = await this.fsDriver.exists(pathToFile);

            if (!isExistFile) {
                response.statusCode = 404;
                response.end("Resource missing 404\n");
            }
            else if (url === "/") {
                await this.onIndexRequest(request, response);
            }
            else if (url !== "/") {
                await this.onStaticRequest(request, response);
            }

        }

        if (method === "POST") {
            await this.onFeedbackRequest(request, response);
        }
    }

    async onIndexRequest(request, response) {
        const pathToIndex = path.normalize(this.staticRoot + "/" + "index.html");
        const index = await this.fsDriver.open(pathToIndex);

        response.statusCode = 200;
        index.pipe(response);

    }

    async onStaticRequest(request, response) {
        const pathToFile = path.normalize(this.staticRoot + request.url);
        const file = await this.fsDriver.open(pathToFile);

        response.statusCode = 200;
        file.pipe(response);


    }

    async onFeedbackRequest(request, response) {
        const requestFormDataFields = await this.formParser.parse(request);
        const telegramMessageContent = new FeedbackTelegramMessageView(requestFormDataFields, "HTML").render();
        this.telegramDriver.send(telegramMessageContent);

        response.statusCode = 200;
        response.setHeader("Content-type", "text/plain");
        response.end("the message is received");
    }

}

module.exports = { MainController };

