"use strict";

const Router = function () {

    this.host = "http://localhost:5159/";

    this.goTo = (path) => {
        window.location.href = this.host + path;
    };

    this.makeUrl = (path) => {
        return this.host + path;
    };
};