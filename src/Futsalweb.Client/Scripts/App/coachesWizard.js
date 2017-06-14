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

        $.post("http://localhost:5159/api/coaches", newCoach).done(function (data) {
            window.location.href = "http://localhost:5159";
        });
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
        legOption: legOption,
        whatLeg: whatLeg,
        coach: coach,
        createCoach: createCoach
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });

})();