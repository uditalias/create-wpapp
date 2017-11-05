const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=RESOLVE.EXTENSIONS=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();
        
        let extensions = [".js"];

        if (params.type === "typescript") {
            extensions.push(".ts");

            if (params.use_react) {
                extensions.push(".tsx");
            }
        }

        this.push(file.replace(new RegExp(KEY, "g"), JSON.stringify(extensions)));

        cb();
    }

    return stream;
}