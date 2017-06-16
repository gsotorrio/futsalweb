"use strict";
(function () { 
    // Variables
    let coaches = ko.observableArray();

    let coach = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        birthdate: ko.observable(),
        role: ko.observable()
    };

    // Public Functions
    const cleanFormCoach = function () {
        coach.id("");
        coach.name("");
        coach.surname("");
        coach.birthdate("");
        coach.role("");
    };

    const createCoach = function () {
        let newCoach = {
            teamId: window.location.search.substr(8),
            name: coach.name(),
            surname: coach.surname(),
            birthdate: coach.birthdate(),
            role: coach.role()
        };

        $.post("http://localhost:5159/api/coaches", newCoach).done(function (data) {

            coaches.push(data);
            cleanFormCoach();
            //window.location.href = "http://localhost:5159";
        });
    };

    const removeCoach = function (coach, event) {
        $.ajax({
            url: "http://localhost:5159/api/coaches/" + player.id,
            method: "DELETE"
        }).done(function () {
            coaches.remove(coaches);
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
        coaches: coaches,
        coach: coach,
        cleanFormCoach: cleanFormCoach,
        createCoach: createCoach,
        removeCoach: removeCoach
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });

})();