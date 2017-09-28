"use strict";

const httpAjax = new HttpAjax();
const router = new Router();

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

        }
    }
};

var selectServer = new SelectServer();


