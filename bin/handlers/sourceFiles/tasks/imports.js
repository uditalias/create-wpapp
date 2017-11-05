const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=ENTRY.IMPORTS=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        let imports = [];

        if (params.use_css) {
            imports.push(`import "style/main.${params.use_scss ? "scss" : "css"}"`);
        }

        if (params.use_react) {
            if (params.type === "typescript") {
                imports.push(`import * as React from "react"`);
            } else if (params.type === "javascript") {
                imports.push(`import React from "react"`);
            }

            imports.push(`import { render } from "react-dom"`);
        }

        this.push(file.replace(new RegExp(KEY, "g"), imports.join("\n")));

        cb();
    }

    return stream;
}