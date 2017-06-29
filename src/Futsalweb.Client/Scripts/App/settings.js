"use strict";

const SaveUrl = function (url) {
    this.url = "http://localhost:5159";
};

let protocolHost = new SaveUrl();

const GetAjax = function (path, parameterFunction) {
    this.path = path;
    this.parameterFunction = parameterFunction;

    if (path) {
        $.get(protocolHost.url + "/api/teams/" + path, parameterFunction);
    }
    else {
        $.get(protocolHost.url + "/api/teams/", parameterFunction);
    }
};

const PostAjax = function (path, jSon, parameterFunction) {
    this.path = path;
    this.jSon = jSon;
    this.parameterFunction = parameterFunction;

    $.post(protocolHost.url + "/api/" + path, newPlayer).done(parameterFunction);
};




//$.post(protocolHost.url + "/api/players", newPlayer).done(function (data) {

//    players.push(data);
//    cleanFormPlayer();
//    hiddeTableButtonPlayer.push("some value");
//});