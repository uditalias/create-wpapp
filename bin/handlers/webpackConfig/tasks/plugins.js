
const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=PLUGINS=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        const plugins = [];

        if (params.use_css) {
            plugins.push(`new ExtractTextPlugin("bundle.css", { allChunks: true })`);
        }

        this.push(file.replace(new RegExp(KEY, "g"), plugins.join(", ")));

        cb();
    }

    return stream;
}