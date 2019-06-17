export class HttpService {
    /**
     * 
     * @param {String} uri URI Resource
     */
    constructor(uri) {
        this._uri = uri.endsWith('/') ? uri.slice(0, -1) : uri;
    }

    /**
     * 
     * @param {Object} query 
     * @returns {String}
     */
    handlerQuery(query) {
        return query ? '?' + Object.keys(query)
            .map(k => `${k}=${query[k]}`)
            .join('&') : '';
    }

    /**
     * 
     * @param {String} param 
     * @param {Object} query
     * @returns {Promise}
     */
    get(param, query) {
        param = param ? `/${param}` : '';
        query = this.handlerQuery(query);
        let uri = `${this._uri}${param}${query}`;

        return fetch(uri);
    }

    /**
     * 
     * @param {Object} body 
     * @param {Object} headers 
     * @returns {Promise}
     */
    post(body, headers) {
        let request = {
            method: 'post',
            body: body,
            headers: headers || { "Content-Type": "application/json" },
        }
        if (!request.headers) {
            delete request['headers'];
        }
        return fetch(this._uri, request);
    }
}