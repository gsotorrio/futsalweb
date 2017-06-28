"use strict";

(function () {
    const teamId = location.pathname.split('/')[2];
    let protocolHost = new SaveUrl();

    // Variables
    let teamData = ko.observableArray();
    let players = ko.observableArray();
    let coaches = ko.observableArray();

    // Functions
    const goManagerWizard = function () {
        window.location.href = protocolHost.url + "/teams/" + teamId + "/manager";
    };

    const goPlayersWizard = function () {
        window.location.href = protocolHost.url + "/teams/" + teamId + "/players";
    };

    const goCoachesWizard = function () {
        window.location.href = protocolHost.url + "/teams/" + teamId + "/coaches";
    };

    const goListView = function () {
        window.location.href = protocolHost.url;
    };

    // ViewModel
    let viewModel = {
        teamData: teamData,
        players: players,
        coaches: coaches,
        goManagerWizard: goManagerWizard,
        goPlayersWizard: goPlayersWizard,
        goCoachesWizard: goCoachesWizard,
        goListView: goListView
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        $.get(protocolHost.url + "/api/teams/" + teamId, function (data) {
            teamData(data);
        });
       
        $.get(protocolHost.url + "/api/teams/" + teamId + "/players", function (data) {
            players(data);
        });

        $.get(protocolHost.url + "/api/teams/" + teamId + "/coaches", function (data) {
            coaches(data);
        });
    });
})();