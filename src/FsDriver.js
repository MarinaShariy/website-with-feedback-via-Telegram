"use strict";

const fs = require("fs/promises");

class FsDriver {

    async exists(pathToFile) {
        try {
            await fs.access(pathToFile);
            return true;
        }
        catch {
            return false;
        }

    }

    async open(pathToFile) {
        const file = await fs.open(pathToFile);
        let stream = file.createReadStream();
        return stream;
    }

}

module.exports = { FsDriver };
