const fs = require("fs");
const path = require("path");

const entry = require("./tasks/entry");
const extensions = require("./tasks/extensions");
const rules = require("./tasks/rules");
const plugins = require("./tasks/plugins");

module.exports = function (appPath, params) {

    const templatePath = path.resolve(__dirname, "webpack.config.tpl");
    const destPath = path.resolve(appPath, "webpack.config.js");

    return new Promise((resolve, reject) => {
        let stream = fs.createReadStream(templatePath)
            .pipe(entry(params))
            .pipe(extensions(params))
            .pipe(rules(params))
            .pipe(plugins(params))
            .pipe(fs.createWriteStream(destPath));

        stream.on("finish", resolve);
        stream.on("error", reject);
    });
}