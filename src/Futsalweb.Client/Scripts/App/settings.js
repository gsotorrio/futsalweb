"use strict";

const SaveUrl = function (url) {
    this.url = "http://localhost:5159";
};

let protocolHost = new SaveUrl();

function CallsServer() {
    this.post = function (path, jSon, parameterFunction) {
        $.post(protocolHost.url + "/api/" + path, jSon).done(parameterFunction);
    };

    this.get = function (path, parameterFunction) {
        if (path) {
            $.get(protocolHost.url + "/api/teams/" + path, parameterFunction);
        }
        else {
            $.get(protocolHost.url + "/api/teams/", parameterFunction);
        }
    };

    this.put = function (path, jSon, parameterFunction) {
        $.ajax({
            type: "PUT",
            url: protocolHost.url + "/api/" + path,
            contentType: "application/json",
            data: JSON.stringify(jSon)
        }).done(parameterFunction);
    };

    this.delete = function (path, id, parameterFunction) {
        $.ajax({
            url: protocolHost.url + "/api/" + path + id,
            method: "DELETE"
        }).done(parameterFunction);
    };
}







const getAjax = function (path, parameterFunction) {
    if (path) {
        $.get(protocolHost.url + "/api/teams/" + path, parameterFunction);
    }
    else {
        $.get(protocolHost.url + "/api/teams/", parameterFunction);
    }
};

function PostAjax() {
    this.post = function (path, jSon, parameterFunction) {
        $.post(protocolHost.url + "/api/" + path, jSon).done(parameterFunction);
    };
}

const putAjax = function (path, jSon, parameterFunction) {
    this.path = path;
    this.jSon = jSon;
    this.parameterFunction = parameterFunction;

    $.ajax({
        type: "PUT",
        url: protocolHost.url + "/api/" + path,
        contentType: "application/json",
        data: JSON.stringify(jSon)
    }).done(parameterFunction);
};

const deleteAjax = function (path, id, parameterFunction) {
    this.path = path;
    this.id = id;
    this.parameterFunction = parameterFunction;

    $.ajax({
        url: protocolHost.url + "/api/" + path + id,
        method: "DELETE"
    }).done(parameterFunction);
};

const moveBetwenViews = function (id, path) {
    window.location.href = protocolHost.url + "/teams/" + id + path;
};

