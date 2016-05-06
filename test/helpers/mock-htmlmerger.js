(function () {
    var server = sinon.fakeServer.create();
    server.xhr.useFilters = true;
    server.xhr.addFilter(function (method, url) {
        //whenever the this returns true the request will not faked
        return !url.match(/sc\//);
    });
    server.respondWith('GET', /htmlmerger/, [200, {"Content-Type": "text/html"}, 'fake response']);
}());
