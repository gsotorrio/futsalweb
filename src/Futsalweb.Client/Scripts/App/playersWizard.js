﻿"use strict";

(function () {
    var strongLeg = ko.observable(true);

    var whatLeg = ko.observableArray(["Left", "Right"]);
    // Variables
    let player = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        birthdate: ko.observable(),
        height: ko.observable(),
        weight: ko.observable(),
        strongLeg: whatLeg(),
        status: ko.observable()
    };

    // Public Functions
    const next = function () {
        var urlTeam = window.location.search.substr(1);

        var newPlayer = {
            birthdate: player.birthdate(),
            name: player.name(),
            surname: player.surname(),
            height: player.height(),
            weight: player.weight(),
            strongLeg: player.strongLeg[0],
            status: player.status()
        };


    };


    // ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        remove: remove,
        teamManager: teamManager,
        createTeam: createTeam,
        player: player,
        next: next,
        strongLeg: strongLeg,
        whatLeg: whatLeg
    };
    

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();