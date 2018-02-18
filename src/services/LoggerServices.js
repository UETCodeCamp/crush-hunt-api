require('colors');

class LoggerServices {
    constructor(on = false) {
        LoggerServices._on = on;
        this._force = false;
    }

    _getForce() {
        this._force = true;

        return this;
    }

    _getTimeNow() {
        return (new Date()).toLocaleString();
    }

    force() {
        const logger = new LoggerServices();

        return logger._getForce();
    }

    on() {
        LoggerServices._on = true;

        return this;
    }

    off() {
        LoggerServices._on = false;

        return this;
    }

    log(tag, content) {
        if (!LoggerServices._on && !this._force) {
            return;
        }

        const time = this._getTimeNow();
        console.log(`[${time}]`.gray + `[${tag}]:`.magenta, content);
    }

    error(tag, content) {
        if (!LoggerServices._on && !this._force) {
            return;
        }

        const time = this._getTimeNow();
        console.error(`[${time}]`.gray + `[${tag}]:`.red, content);
    }
}

const on = process.env.NODE_ENV !== 'production';

module.exports = new LoggerServices(on);