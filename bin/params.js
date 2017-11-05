const { getGitConfigValue } = require("./utils");

module.exports = {
    APP_PATH: process.cwd(),
    GIT_USER_NAME: getGitConfigValue("user.name"),
    GIT_USER_EMAIL: getGitConfigValue("user.email")
}