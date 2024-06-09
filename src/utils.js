export function appendParamToURL(url, name, value) {
    if (url.indexOf(name + '=') !== -1) {
        return url;
    }
    var separator = url.indexOf('?') !== -1 ? '&' : '?';
    return url + separator + name + '=' + encodeURIComponent(value);
}

export function appendParamsToUrl(url, params) {
    var _url = url;
    for (var key in params) {
        if (params[key]) {
            _url = appendParamToURL(_url, key, params[key]);
        }
    }
    return _url;
}