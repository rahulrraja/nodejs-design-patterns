class Command {
    execute() {
        return new Error('Implement execute method!')
    }
}

/**
 * Single Stream workflow
 */
class Stream {
    constructor() {
        this._handlers = []
    }

    on(key, command) {
        this._handlers[key] = command
    }

    connect() {
        // On stream connect
        if(this._handlers['connect'])  {
            this._handlers['connect'].execute();
        }

        if(this._handlers['disconnect']) {
            this._handlers['disconnect'].execute();
        }
    }
}

class ConnectCallback extends Command {
    execute() {
        console.log('Executing connect callback');
    }    
}

class DisconnectCallback extends Command {
    execute() {
        console.log('Executing disconnect callback');
    }    
}

const exampleStream = new Stream();
exampleStream.on('connect', new ConnectCallback());
exampleStream.on('disconnect', new DisconnectCallback());

exampleStream.connect();

