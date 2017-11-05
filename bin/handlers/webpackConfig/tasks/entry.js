const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=ENTRY.FILE=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        let entry;

        if (params.type === "typescript") {
            entry = "app.ts";

            if (params.use_react) {
                entry = "app.tsx";
            }

        } else if (params.type === "javascript") {
            entry = "app.js";
        } else {
            entry = "";
        }

        this.push(file.replace(new RegExp(KEY, "g"), JSON.stringify(entry)));

        cb();
    }

    return stream;
}