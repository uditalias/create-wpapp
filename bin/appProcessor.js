const { EventEmitter } = require("events");
const handlers = require("./handlers");

/**
 * Creates a webpack app at given `appPath` with user `params`
 * 
 * @class AppProcessor
 * @extends {EventEmitter}
 */
class AppProcessor extends EventEmitter {

    /**
     * Creates an instance of AppProcessor.
     * @param {any} params - user params from setup process
     * @param {any} appPath - destination app path
     * @memberof AppProcessor
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
     * @memberof AppProcessor
     */
    process() {
        let err = null;

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
     * handles finished successfully
     * 
     * @memberof AppProcessor
     */
    _tasksSuccess() {
        this.emit("finish", null);
    }

    /**
     * Fires the `finish` event with error when one
     * of the handlers throws an error
     * 
     * @param {any} err 
     * @memberof AppProcessor
     */
    _tasksError(err) {

        this._cleanup();

        this.emit("finish", err);
    }

    /**
     * Clears the `appPath` from files and folders
     * when the process has failed
     * 
     * @memberof AppProcessor
     */
    _cleanup() {
        // Need to implement
    }
}

module.exports = AppProcessor;