const fs = require('fs');

class SubjectManager {
    constructor() {
        this._observers = {}
    }

    addObserver(eventType, observer) {
        if (!this._observers[eventType]) {
            this._observers[eventType] = []
        }

        this._observers[eventType].push(observer);
    }

    removeObserver(eventType, observer) {
        const index = this._observers[eventType].indexOf(observer);
        if (index > -1) {
            this._observers[eventType].splice(index);
        }
    }

    notify(eventType, data) {
        this._observers[eventType].forEach(observer => observer.update(data))
    }
}

class FileManager {
    constructor() {
        this.subjectManager = new SubjectManager();
    }

    monitorFile(path) {
        fs.watch(path, (data) => this.subjectManager.notify('change', { path, data }))
    }

    addObserver(eventType, observer) {
        this.subjectManager.addObserver(eventType, observer);
    }

    removeObserver(eventType, observer) {
        this.subjectManager.removeObserver(eventType, observer);
    }    
}

class LoggingObserver  {
    update({data}) {
        console.log(data)
    }    
}

class SizeChangeObserver {
    constructor() {
        this.size = 0
    }

    update({path}) {
        const newSize = fs.statSync(path).size;
        if(newSize > this.size) {
            console.log("Size increase to " +  newSize);
            this.size = newSize;
        }
    }
}

// Subject Class
const fileManager = new FileManager();
// Adding observers
fileManager.addObserver('change', new LoggingObserver());
fileManager.addObserver('change', new SizeChangeObserver());
fileManager.monitorFile(process.argv[2]);