"use strict";

(function () {
    const teamId = location.pathname.split('/')[2];

    // Variables
    let teamData = ko.observableArray();
    let players = ko.observableArray();
    let coaches = ko.observableArray();

    // Functions
    const editTeamData = function () {
        window.location.href = "http://localhost:5159/teams/" + teamId + "/manager";
    };

    const editPlayersData = function () {
        window.location.href = "http://localhost:5159/teams/" + teamId + "/players";
    };

    const editCoachesData = function () {
        window.location.href = "http://localhost:5159/teams/" + teamId + "/coaches";
    };

    const goListView = function () {
        window.location.href = "http://localhost:5159";
    };

    // ViewModel
    let viewModel = {
        teamData: teamData,
        players: players,
        coaches: coaches,
        editTeamData: editTeamData,
        editPlayersData: editPlayersData,
        editCoachesData: editCoachesData,
        goListView: goListView
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        $.get("http://localhost:5159/api/teams/" + teamId, function (data) {
            teamData(data);
        });
       
        $.get("http://localhost:5159/api/teams/" + teamId + "/players", function (data) {
            players(data);
        });

        $.get("http://localhost:5159/api/teams/" + teamId + "/coaches", function (data) {
            coaches(data);
        });
    });
})();