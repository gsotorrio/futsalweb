"use strict";


   
    // Variables
    let legOption = ko.observable(true);
    let whatLeg = ko.observableArray();

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
    const createPlayer = function () {
        var newPlayer = {
            teamId: window.location.search.substr(1),
            name: player.name(),
            surname: player.surname(),
            birthdate: player.birthdate(),
            height: player.height(),
            weight: player.weight(),
            strongLeg: player.strongLeg[0],
            status: player.status()
        };

        console.log(newPlayer);

        $.post("http://localhost:5159/api/players", newPlayer).done(function (data) {
            console.log(data);

            window.location.href = "http://localhost:5159/teams/Coaches?" + data.teamId;

        });
    };


    //// ViewModel
    //let viewModel = {
    //    teams: teams,
    //    team: team,
    //    remove: remove,
    //    teamManager: teamManager,
    //    createTeam: createTeam,
    //    player: player,
    //    next: next,
    //    strongLeg: strongLeg,
    //    whatLeg: whatLeg
    //};
    

    //// On initialize
    //$(function () {
    //    console.log("Ready!!!");
    //    ko.applyBindings(viewModel);
    //});
