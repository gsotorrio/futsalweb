"use strict";

const SaveUrl = function (url) {
    this.url = "http://localhost:5159";
};

let protocolHost = new SaveUrl();

const getAjax = function (path, parameterFunction) {
    this.path = path;
    this.parameterFunction = parameterFunction;

    if (path) {
        $.get(protocolHost.url + "/api/teams/" + path, parameterFunction);
    }
    else {
        $.get(protocolHost.url + "/api/teams/", parameterFunction);
    }
};

const postAjax = function (path, jSon, parameterFunction) {
    this.path = path;
    this.jSon = jSon;
    this.parameterFunction = parameterFunction;

    $.post(protocolHost.url + "/api/" + path, jSon).done(parameterFunction);
};

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

