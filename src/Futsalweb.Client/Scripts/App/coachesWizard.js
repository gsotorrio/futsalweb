"use strict";
(function () { 
    // Variables
    let coach = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        birthdate: ko.observable(),
        role: ko.observable()
    };

    // Public Functions
    const createCoach = function () {
        let newCoach = {
            teamId: window.location.search.substr(1),
            name: coach.name(),
            surname: coach.surname(),
            birthdate: coach.birthdate(),
            role: coach.role()
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
        createPlayer: createPlayer,
        strongLeg: strongLeg,
        whatLeg: whatLeg,
        coach: coach
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });

})();