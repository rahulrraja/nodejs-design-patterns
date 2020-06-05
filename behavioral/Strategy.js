const ApiRequestFactory = require('../creational/factory/AbstractFactory-APIRequest-Example');

class UpstreamFile {
    getFileUpstream() {}
}

class Config extends UpstreamFile {
    constructor(url, apiRequest) {
        super()
        this.url = url
        this.apiRequest = apiRequest || ApiRequestFactory.createApiRequest('http');
    }

    getFileUpstream() {
        this.apiRequest.makeGetRequest(this.url)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
}

/**
 * AbstractFactory is used to generate related implementation for these 
 * classes
 */
const config = new Config('jsonplaceholder.typicode.com/posts/1');
config.getFileUpstream();

const config2 = new Config('https://jsonplaceholder.typicode.com/todos/1', ApiRequestFactory.createApiRequest("tcp"));
config2.getFileUpstream();