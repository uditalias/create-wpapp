const fs = require("fs");
const path = require("path");

const imports = require("./tasks/imports");

module.exports = function (appPath, params) {

    const baseDestPath = path.resolve(appPath, "src");
    const entryTemplatePath = path.resolve(__dirname, (
        params.use_react ? "entry.x.tpl" : "entry.tpl"
    ));

    if (!fs.existsSync(baseDestPath)) {
        fs.mkdirSync(baseDestPath);
    }

    let entryExt = "js";

    if (params.type === "typescript") {
        entryExt = "ts";

        if (params.use_react) {
            entryExt = "tsx";
        }
    }

    const entryDestPath = path.resolve(baseDestPath, `app.${entryExt}`);

    const tasks = [];

    if (params.use_css) {
        const styleDestPath = path.resolve(appPath, "src/style");

        if (!fs.existsSync(styleDestPath)) {
            fs.mkdirSync(styleDestPath);
        }

        tasks.push(new Promise((resolve, reject) => {
            let ext = params.use_scss ? "scss" : "css";

            let styleStream = fs.createReadStream(path.resolve(__dirname, "style.tpl"))
                .pipe(fs.createWriteStream(path.resolve(styleDestPath, `main.${ext}`)));

            styleStream.on("error", reject);
            styleStream.on("finish", resolve);
        }));
    }

    tasks.push(new Promise((resolve, reject) => {
        const entryStream = fs.createReadStream(entryTemplatePath)
            .pipe(imports(params))
            .pipe(fs.createWriteStream(entryDestPath));

        entryStream.on("error", reject);
        entryStream.on("finish", resolve);
    }));

    return Promise.all(tasks);
}