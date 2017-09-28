const httpAjax = new HttpAjax();

"use strict";

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
                    httpAjax.put(router.makeUrl(path), object, updateCocallbackachData)

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


