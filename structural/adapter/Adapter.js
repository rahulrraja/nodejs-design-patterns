const fs = require('fs');

// Delegator class
class FsDelegator {
    read() {
        return new Error('Please implement read method')
    }
}

/**
 * Adapter class implements the delegate
 * Converts fs callbacks to fs promisified
 */
class FsAdapter extends FsDelegator {
    read(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + "/" + path, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                resolve(buf.toString())
            })
        })
    }
}

class Client {
    constructor() {
        this.setDelegate();
    }

    async reader() {
        return this._fsDelegate.read('Adapter.js')
    }

    setDelegate() {
        this._fsDelegate = new FsAdapter();
    }
}

const client = new Client();
client.reader().then(res => console.log("Reading " + res));