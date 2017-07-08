"use strict";

const ProtocolHost = function () {
    this.protocolHost = "http://localhost:5159";
};

const navigateBetewnViews = (path) => {
    const protocolHost = new ProtocolHost();

    window.location.href = protocolHost.protocolHost + path;
};