const { EventEmitter } = require("events");
const handlers = require("./handlers");

class AppProcessor extends EventEmitter {
    constructor(params, appPath) {
        super();

        this._params = params;
        this._appPath = appPath;
    }

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

    _tasksSuccess() {
        this.emit("finish", null);
    }

    _tasksError(err) {

        this._cleanup();

        this.emit("finish", err);
    }

    _cleanup() {

    }
}

module.exports = AppProcessor;