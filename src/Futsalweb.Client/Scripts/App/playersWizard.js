"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];

    let legOption = ko.observable(true);
    let whatLeg = ko.observableArray();

    let players = ko.observableArray();

    let player = {
        teamId: teamId,
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
    const cleanFormPlayer = function () {
        player.id("");
        player.name("");
        player.surname("");
        player.birthdate("");
        player.height("");
        player.weight("");
        player.status("");
        whatLeg([]);
    };

    const createPlayer = function () {
        let playerId = player.id();

        let newPlayer = {
            teamId: teamId,
            id: player.id(),
            name: player.name(),
            surname: player.surname(),
            birthdate: player.birthdate(),
            height: player.height(),
            weight: player.weight(),
            strongLeg: player.strongLeg.toString(),
            status: player.status()
        };

        if (!playerId) {
            $.post("http://localhost:5159/api/players", newPlayer).done(function (data) {
            
                players.push(data);
                cleanFormPlayer();
            });
        }

        else {
            var leg = whatLeg();
            let playerData = {
                teamId: teamId,
                id: player.id(),
                name: player.name(),
                surname: player.surname(),
                birthdate: player.birthdate(),
                height: player.height(),
                weight: player.weight(),
                strongLeg: leg.toString(),
                status: player.status()
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:5159/api/players",
                contentType: "application/json",
                data: JSON.stringify(playerData)
            }).done(function () {
                let indexPlayer;

                for (var i = 0; i < players().length; i++) {
                    if (players()[i].id == playerData.id) {
                        indexPlayer = i;
                    }
                }

                players.replace(players()[indexPlayer], playerData);

                cleanFormPlayer();
            });
        }
    };

    const removePlayer = function (player, event) {
        $.ajax({
            url: "http://localhost:5159/api/players/" + player.id,
            method: "DELETE"
        }).done(function () {
            players.remove(player);
        });
    };

    const putDataInForm = function (selectedPlayer) {
        player.id(selectedPlayer.id);
        player.name(selectedPlayer.name);
        player.surname(selectedPlayer.surname);
        player.birthdate(selectedPlayer.birthdate.replace("T00:00:00", ""));
        player.height(selectedPlayer.height);
        player.weight(selectedPlayer.weight);
        player.status(selectedPlayer.status);
        if (selectedPlayer.strongLeg === "Left,Right" || selectedPlayer.strongLeg === "Right,Left") {
            whatLeg(["Left", "Right"]);
        }
        else{
            whatLeg([selectedPlayer.strongLeg]);
        }
    };

    const goCoacheswizard = function () {
        window.location.href = "http://localhost:5159/teams/" + teamId + "/coaches";
    };

    //ViewModel
    let viewModel = {
        players: players,
        player: player,
        cleanFormPlayer: cleanFormPlayer,
        removePlayer: removePlayer,
        createPlayer: createPlayer,
        legOption: legOption,
        whatLeg: whatLeg,
        putDataInForm: putDataInForm,
        goCoacheswizard: goCoacheswizard
    };

    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();