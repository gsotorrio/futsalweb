"use strict";

const httpAjax = new HttpAjax();
const router = new Router();
const fakeServer = new FakeServer();


const SelectServer = function() {
    let volean = true;

    this.callServer = (method, path, object, callback) => {
        if (volean) {
            switch (method) {
                case "get":
                    httpAjax.get(router.makeUrl(path), callback);

                    break;

                case "post":
                    httpAjax.post(router.makeUrl(path), object, callback);

                    break;

                case "put":
                    httpAjax.put(router.makeUrl(path), object, callback)

                    break;

                case "delete":
                    httpAjax.delete(router.makeUrl(path), callback);

                    break;
            }
        }
        else {
            switch (method) {
                case "get":
                    fakeServer.get(callback)
                    break;

                case "post":
                    fakeServer.post(object, callback)
                    break;

                case "put":
                    fakeServer.put(object, callback)
                    break;

                case "delete":
                    fakeServer.delete(callback)
                    break;
            }
        }
    }
};