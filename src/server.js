"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");
const { TelegramDriver } = require("./telegramDriver");


const staticRoot = path.join(__dirname, "static");
const server = http.createServer();
const telegramDriver = new TelegramDriver();


server.on("request", (request, response) => {

    const {method, url} = request;
    console.log(url);

    if (method === "GET") {

        const pathToFile = path.normalize(staticRoot + url);

        fs.stat(pathToFile, (err) => {

            if (err) {
                response.statusCode = 404;
                response.end("Resource missing 404\n");
            }

            else if (url === "/") {
                const pathToWelcomePage = path.normalize(staticRoot + "/" + "index.html");
                const welcomePageHtml = fs.createReadStream(pathToWelcomePage);
                welcomePageHtml.on("open", () => {
                    response.statusCode = 200;
                    welcomePageHtml.pipe(response);
                });
            }

            else if (url !== "/") {
                const file = fs.createReadStream(pathToFile);
                file.on("open", () => {
                    response.statusCode = 200;
                    file.pipe(response);
                });
            }

        });
    }

    if (method === "POST") {

        const form = formidable({ multiples: true });

        form.parse(request, function(err, fields) {
            console.log(fields);

            const message = trimLines(`
                <b>name:</b> ${escapeHtml(fields.name)}
                <b>email:</b> ${escapeHtml(fields.email)}
                <b>question:</b> 
                ${escapeHtml(fields.question)}
            `);

            telegramDriver.send({
                text: message,
                mode: "HTML"
            });

            response.statusCode = 200;
            response.setHeader("Content-type", "text/plain");
            response.end("the message is received");
        });


    }

});


server.listen(3000);


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