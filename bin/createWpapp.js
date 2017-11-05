const inquirer = require('inquirer');
const chalk = require("chalk");
const AppProcessor = require("./appProcessor");
const setup = require("./setup");
const { APP_PATH } = require("./params");

let processor = null;

function createApp(answers) {

    console.log(`Creating a new webpack app in ${chalk.green(APP_PATH)}...`);

    processor = new AppProcessor(answers, APP_PATH);

    processor.on("finish", onProcessorFinish);

    processor.process();
}

function onProcessorFinish(err) {
    if (err) {
        console.log(chalk.red("Failed to create webpack app!"));
        console.log(chalk.red(err.stack));

        process.exit(1);
    }

    console.log(chalk.green("All Done."));
    console.log(`Run ${chalk.green(`npm start`)} to start the dev server`);

    process.exit(0);
}

inquirer.prompt(setup).then(createApp);