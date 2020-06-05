class BaseDatabase {
    query() {

    }
}

class Database extends BaseDatabase {
    query(query) {
        return "response " + query;
    }
}

class CachedDatabase extends BaseDatabase {
    constructor() {
        super()
        this.cachedQuery = {};
    }

    query(query) {
        if (this.cachedQuery[query]) {
            return this.cachedQuery[query];
        }

        this.cachedQuery[query] = this.getDatabase().query('query1');
        return this.cachedQuery[query];
    }

    // Lazy initializing heavy object
    getDatabase() {
        if (typeof this.__database === 'object') {
            return this.__database;
        }

        this.__database = new Database();
        return this.__database;
    }
}
/**
 * CachedDatabase is proxy object for original db
 * Lazy initialization 
 * Access control
 */
const db = new CachedDatabase();
console.log(db.query('query1'))
