const { spawnSync, execSync } = require("child_process");
const fs = require("fs");

const clearNewLineFromBuffer = exports.clearNewLineFromBuffer = function (buffer) {
    return buffer.toString().replace(/\n/g, "");
}

const getGitConfigValue = exports.getGitConfigValue = function (info) {
    return clearNewLineFromBuffer(spawnSync("git", ["config", info]).stdout);
}

const getENVParamValue = exports.getENVParamValue = function (param) {
    return clearNewLineFromBuffer(execSync(`echo $${param}`));
}

const isEmptyDir = exports.isEmptyDir = function (path) {
    return fs.existsSync(path) && fs.readdirSync(path).length === 0;
}

const isValidHTTPPort = exports.isValidHTTPPort = function (port) {
    const parsed = +port;
    return parsed >= 1 && parsed <= 65535 && port === parsed.toString();
}