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
        moveBetwenViews(teamId, "/manager");
    };

    const goPlayersWizard = function () {
        moveBetwenViews(teamId, "/players");
    };

    const goCoachesWizard = function () {
        moveBetwenViews(teamId, "/coaches");
    };

    // ViewModel
    let viewModel = {
        teamData: teamData,
        players: players,
        coaches: coaches,
        goManagerWizard: goManagerWizard,
        goPlayersWizard: goPlayersWizard,
        goCoachesWizard: goCoachesWizard
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