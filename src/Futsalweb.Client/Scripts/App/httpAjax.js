"use strict";

const HttpAjax = function () {

    this.get = (url, callback) => {
        $.get(url, callback)
    };

    this.post = (url, data, callback) => {
        $.post(url, data, callback)
    };

    this.put = (url, data, callback) => {
        $.ajax({
            type: "PUT",
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data)
        }).done(callback);
    };

    this.delete = (url, callback) => {
        $.ajax({
            url: url,
            method: "DELETE"
        }).done(callback)
    };
};