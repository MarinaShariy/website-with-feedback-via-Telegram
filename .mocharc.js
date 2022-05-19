"use strict";

const config = {
    recursive: true,
    exit: true,
    timeout: 2*60*60*1000,
    spec: [
        "**/*.spec.js"
    ],
    ignore: [
        "node_modules/**/*"
    ]
};

module.exports = config;