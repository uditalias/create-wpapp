const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const name = require("./tasks/name");
const resources = require("./tasks/resources");

module.exports = function (appPath, params) {

    const templatePath = path.resolve(__dirname, "html.tpl");
    const baseDestPath = path.resolve(appPath, "views");
    const destPath = path.resolve(baseDestPath, "index.html");

    fse.ensureDirSync(baseDestPath);

    return new Promise((resolve, reject) => {
        let stream = fs.createReadStream(templatePath)
            .pipe(name(params))
            .pipe(resources(params))
            .pipe(fs.createWriteStream(destPath));

        stream.on("finish", resolve);
        stream.on("error", reject);
    });
}