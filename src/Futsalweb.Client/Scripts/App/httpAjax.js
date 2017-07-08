"use strict";

const HttpAjax = function () {
    const protocolHost = new ProtocolHost();

    this.get = (url, callback) => {
        $.get(protocolHost.protocolHost + url, callback)
    };

    this.post = (url, data, callback) => {
        $.post(protocolHost.protocolHost + url, data, callback)
    };

    this.put = (url, data, callback) => {
        $.ajax({
            type: "PUT",
            url: protocolHost.protocolHost + url,
            contentType: "application/json",
            data: JSON.stringify(data)
        }).done(callback);
    };

    this.delete = (url, callback) => {
        $.ajax({
            url: protocolHost.protocolHost + url,
            method: "DELETE"
        }).done(callback)
    };
};