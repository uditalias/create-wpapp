const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const BABEL_DEV_DEPS = [
    "babel-core",
    "babel-loader",
    "babel-plugin-transform-runtime",
    "babel-preset-es2015",
    "babel-preset-stage-0",
    "babel-runtime",
];

const TYPESCRIPT_DEV_DEPS = [
    "typescript",
    "tslib",
    "ts-loader",
    "@types/webpack-env"
];

const CSS_DEV_DEPS = [
    "css-loader",
    "style-loader"
];

const SASS_DEV_DEPS = [
    "node-sass",
    "sass-loader"
];

const COMMON_DEV_DEPS = [
    "es6-promise",
    "extract-text-webpack-plugin",
    "html-webpack-plugin",
    "webpack",
    "webpack-dev-server"
];

const REACT_DEV_DEPS = [
    "react",
    "react-dom",
    "prop-types"
];

const REACT_TYPESCRIPT_DEV_DEPS = [
    "@types/react",
    "@types/react-dom"
]

module.exports = function (appPath, params) {

    const package = {
        name: params.app_name,
        version: "1.0.0",
        description: "",
        author: {
            name: params.user_name,
            email: params.user_email
        },
        scripts: {
            start: `NODE_ENV=development webpack-dev-server --hot --progress --port ${params.app_port}`,
            build: "NODE_ENV=production webpack -p"
        },
        license: "ISC",
        devDependencies: {}
    };

    fs.writeFileSync(
        path.resolve(appPath, "package.json"),
        JSON.stringify(package, null, 4)
    );

    let devDependencies = [].concat(COMMON_DEV_DEPS);

    switch (params.type) {
        case "javascript":
            devDependencies.push(...BABEL_DEV_DEPS);

            if (params.use_react) {
                devDependencies.push("babel-preset-react");
            }

            break;
        case "typescript":
            devDependencies.push(...TYPESCRIPT_DEV_DEPS);

            if (params.use_react) {
                devDependencies.push(...REACT_TYPESCRIPT_DEV_DEPS);
            }
            break;
    }

    if (params.use_react) {
        devDependencies.push(...REACT_DEV_DEPS);
    }

    if (params.use_css) {
        devDependencies.push(...CSS_DEV_DEPS);
    }

    if (params.use_scss) {
        devDependencies.push(...SASS_DEV_DEPS);
    }

    if (devDependencies.length > 0) {
        spawnSync("npm", ["install", "--save-dev"].concat(devDependencies), { stdio: "inherit" });
    }

    return Promise.resolve();
}