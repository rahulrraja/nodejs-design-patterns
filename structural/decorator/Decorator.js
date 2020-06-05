class Logger {
    log(){}
}

class BasicLogger extends Logger  {
    log(msg) {
        console.log(msg)
    }
}

class DateDecorator extends Logger  {
    constructor(logger) {
        super();
        this._logger = logger;
    }

    log(msg) {
        msg = '[' + new Date() + '] ' + msg;
        this._logger.log(msg)
    }
}

class ColorDecorator extends Logger {
    constructor(logger) {
        super();
        this._logger = logger;
    }

    log(msg) {
        msg =  "\x1b[36m"+ msg + "\x1b[0m";
        this._logger.log(msg)
    }
}

/**
 * Enhancing logger via decorator
 */

const basicLogger = new BasicLogger();
const colorDecorator = new ColorDecorator(basicLogger);
const dateDecorator = new DateDecorator(basicLogger);

dateDecorator.log("Hello World");
colorDecorator.log("Hello World");