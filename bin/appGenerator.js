const { EventEmitter } = require("events");
const handlers = require("./handlers");
const fse = require('fs-extra')

/**
 * Creates a webpack app at given `appPath` with user `params`
 * 
 * @class AppGenerator
 * @extends {EventEmitter}
 */
class AppGenerator extends EventEmitter {

    /**
     * Creates an instance of AppGenerator.
     * @param {any} params - user params from setup process
     * @param {any} appPath - destination app path
     * @memberof AppGenerator
     */
    constructor(params, appPath) {
        super();

        this._params = params;
        this._appPath = appPath;
    }

    /**
     * Process all handlers to create app files
     * and installs app dependencies
     * 
     * @memberof AppGenerator
     */
    generate() {
        const tasks = [];

        for (let handlerName in handlers) {
            tasks.push(handlers[handlerName](this._appPath, this._params));
        }

        Promise.all(tasks)
            .then(this._tasksSuccess.bind(this))
            .catch(this._tasksError.bind(this));
    }

    /**
     * Fires the `finish` event with no error when all
     * handlers finished successfully
     * 
     * @memberof AppGenerator
     */
    _tasksSuccess() {
        this.emit("finish", null);
    }

    /**
     * Fires the `finish` event with error when one
     * of the handlers throws one
     * 
     * @param {any} err 
     * @memberof AppGenerator
     */
    _tasksError(err) {

        this._cleanup();

        this.emit("finish", err);
    }

    /**
     * Clears the `appPath` from files and folders
     * when the process has failed
     * 
     * @memberof AppGenerator
     */
    _cleanup() {
        fse.emptyDirSync(this._appPath);
    }
}

module.exports = AppGenerator;