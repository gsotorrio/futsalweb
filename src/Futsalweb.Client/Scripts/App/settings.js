"use strict";

const SaveUrl = function (url) {
    this.url = "http://localhost:5159";
};

let protocolHost = new SaveUrl();

const GetAjax = function (path, parameterFunction) {
    this.path = path;
    this.parameterFunction = parameterFunction;

    if (path){
        $.get(protocolHost.url + "/api/teams/" + path, parameterFunction);
    }
    else {
        $.get(protocolHost.url + "/api/teams/", parameterFunction);
    }
}

//complementos = nada, teamId,teamId/teams o players o coaches