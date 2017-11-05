const {
    GIT_USER_NAME,
    GIT_USER_EMAIL
} = require("./params");
const { isValidHTTPPort } = require("./utils");

module.exports = [
    {
        type: "input",
        name: "app_name",
        message: "What is your app name?",
        default: "webpack-starter",
        validate: function (input) {
            const done = this.async();

            if (~input.indexOf(' ')) {
                done("No spaces please");
                return;
            }

            done(null, true);
        }
    },
    {
        type: "input",
        name: "app_port",
        message: "Select dev server port:",
        default: "3001",
        validate: function (input) {
            const done = this.async();

            if (!isValidHTTPPort(input)) {
                done("Port is not valid");
                return;
            }

            done(null, true);
        }
    },
    {
        type: "list",
        name: "type",
        message: "Choose app type:",
        choices: [
            { name: "TypeScript", value: "typescript" },
            { name: "ES2015", value: "javascript" }
        ]
    },
    {
        type: "confirm",
        name: "use_react",
        message: "Are you going to use React in your app?",
        default: false
    },
    {
        type: "confirm",
        name: "use_css",
        message: "Are you going to use css in your app?",
        default: true
    },
    {
        type: "confirm",
        name: "use_scss",
        message: "Do you want to use SCSS preprocessor?",
        default: true,
        when: function (answers) {
            return answers.use_css;
        }
    },
    {
        type: "input",
        name: "user_name",
        message: "What is your name?",
        default: GIT_USER_NAME
    },
    {
        type: "input",
        name: "user_email",
        message: "What is your email?",
        default: GIT_USER_EMAIL
    }
];