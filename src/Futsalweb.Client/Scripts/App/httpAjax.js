"use strict";

const HttpAjax = function () {
    const protocoloHost = "http://localhost:5159";

    this.get = (url, callback) => {
        $.get(protocoloHost + url, callback)
    };

    this.post = (url, data, callback) => {
        $.post(protocoloHost + url, data, callback)
    };

    this.put = (url, data, callback) => {
        $.ajax({
            type: "PUT",
            url: protocoloHost + url,
            contentType: "application/json",
            data: JSON.stringify(data)
        }).done(callback);
    };

    this.delete = (url, callback) => {
        $.ajax({
            url: protocoloHost + url,
            method: "DELETE"
        }).done(callback)
    };
};