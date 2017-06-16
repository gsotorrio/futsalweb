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
            teamId: window.location.search.substr(8),
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
        //List
        teams: teams,
        team: team,
        remove: remove,
        //Manager
        teamManager: teamManager,
        createTeam: createTeam,
        //Player 
        players: players,
        player: player,
        cleanFormPlayer: cleanFormPlayer,
        removePlayer: removePlayer,
        createPlayer: createPlayer,
        legOption: legOption,
        whatLeg: whatLeg,
        putDataInForm: putDataInForm,
        goCoacheswizard: goCoacheswizard,
        //Coach
        coach: coach,
        createCoach: createCoach
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });

})();