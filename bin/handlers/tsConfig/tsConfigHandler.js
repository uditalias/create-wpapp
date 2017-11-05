const fs = require("fs");
const path = require("path");

module.exports = function (appPath, params) {

    if (params.type !== "typescript") {
        return Promise.resolve();
    }

    const tsConfig = {
        compilerOptions: {
            baseUrl: "src/",
            target: "es5",
            module: "commonjs",
            allowJs: true,
            allowSyntheticDefaultImports: true,
            importHelpers: true,
            sourceMap: true,
            moduleResolution: "node",
            lib: [
                "es6",
                "es7",
                "dom"
            ],
            types: [
                "webpack-env"
            ],
            noUnusedLocals: false,
            strictNullChecks: false,
            removeComments: false
        },
        include: [
            "src/**/*"
        ],
        exclude: [
            "node_modules"
        ],
        compileOnSave: false
    };

    if (params.use_react) {
        tsConfig.compilerOptions.types.push("react");
        tsConfig.compilerOptions.types.push("react-dom");
        tsConfig.compilerOptions.jsx = "react";
    }

    fs.writeFileSync(
        path.resolve(appPath, "tsconfig.json"),
        JSON.stringify(tsConfig, null, 4)
    );

    return Promise.resolve();
}