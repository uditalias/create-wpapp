const fs = require("fs");
const path = require("path");

const GIT_IGNORE = [
    ".vscode",
    ".idea",
    ".DS_Store",
    "dist",
    "node_modules",
    "package-lock.json"
];

module.exports = function (appPath, params) {

    fs.writeFileSync(
        path.resolve(appPath, ".gitignore"),
        GIT_IGNORE.join("\n")
    );

    if (params.type === "javascript") {
        const babelRc = {
            presets: [
                "es2015",
                "stage-0"
            ],
            plugins: [
                "transform-runtime"
            ]
        };

        if (params.use_react) {
            babelRc.presets.push("react");
        }

        fs.writeFileSync(
            path.resolve(appPath, ".babelrc"),
            JSON.stringify(babelRc, null, 4)
        );
    }

    return Promise.resolve();
}