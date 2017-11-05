const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=APP.NAME=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        this.push(file.replace(new RegExp(KEY, "g"), params.app_name));

        cb();
    }

    return stream;
}