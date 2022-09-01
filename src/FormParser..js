"use strict";

const formidable = require("formidable");

class FormParser {

    parse(request) {
        return new Promise((resolve, reject) => {

            const form = formidable({ multiples: true });
            form.parse(request, (err, fields) => {

                if (err) {
                    reject(err);
                }
                else {
                    resolve(fields);
                }
            });
        });
    }
}

module.exports = { FormParser };