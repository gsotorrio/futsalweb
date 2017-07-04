﻿"use strict";

(function () {
    // Variables
    const teamId = location.pathname.split('/')[2];
    let ajaxObject = new CallsServer();

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

        ajaxObject.get(teamId, function (data) { teamData(data) });
      
        ajaxObject.get(teamId + "/players", function (data) { players(data) });
        
        ajaxObject.get(teamId + "/coaches", function (data) { coaches(data) });
       
    });
})();