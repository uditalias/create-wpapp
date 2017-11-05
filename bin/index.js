#!/usr/bin/env node

const chalk = require("chalk");
const { isEmptyDir } = require("./utils");
const { APP_PATH } = require("./params");

if (!isEmptyDir(APP_PATH)) {
    console.log(chalk.red("Please run on an empty folder!"));
    process.exit(1);
}

require("./createWpapp");