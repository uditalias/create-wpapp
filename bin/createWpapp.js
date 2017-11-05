const inquirer = require('inquirer');
const chalk = require("chalk");
const AppGenerator = require("./appGenerator");
const setup = require("./setup");
const { APP_PATH } = require("./params");

let generator = null;

/**
 * Get all user inputs from setup and create the app generator
 * 
 * @param {any} answers 
 */
function createApp(answers) {

    console.log(`Creating a new webpack app in ${chalk.green(APP_PATH)}...`);

    generator = new AppGenerator(answers, APP_PATH);

    generator.on("finish", onFinish);

    generator.generate();
}

function onFinish(err) {
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