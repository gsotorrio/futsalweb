"use strict";

(function () {

    // Variables
    let player = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        birthdate: ko.observable(),
        height: ko.observable(),
        weight: ko.observable(),
        strongLeg1: ko.observable(),
        strongLeg2: ko.observable(),
        status: ko.observable()
    };

    // Public Functions
    const next = function () {
        var newPlayer = {
            birthdate: player.birthdate(),
            name: player.name(),
            surname: player.surname(),
            height: player.height(),
            weight: player.weight(),
            strongLeg1: player.strongLeg1(),
            strongLeg2: player.strongLeg2(),
            status: player.status()
        };
        console.log(newPlayer);
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
        MyDate: ko.observable(new Date())
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();