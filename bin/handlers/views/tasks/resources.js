const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=APP.RESOURCES=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        const resources = [];

        if (params.use_css) {
            resources.push(`<link rel="stylesheet" href="/bundle.css" />`);
        }

        this.push(file.replace(new RegExp(KEY, "g"), resources.join('\n')));

        cb();
    }

    return stream;
}