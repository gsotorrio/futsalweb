"use strict";

    // Variables
    let legOption = ko.observable(true);
    let whatLeg = ko.observableArray();

    let players = ko.observableArray();

    let player = {
        teamId: window.location.search.substr(8),
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
            teamId: window.location.search.substr(8),
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
            let playerData = {
                teamId: window.location.search.substr(8),
                id: player.id(),
                name: player.name(),
                surname: player.surname(),
                birthdate: player.birthdate(),
                height: player.height(),
                weight: player.weight(),
                strongLeg: player.strongLeg.toString(),
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
        $.get("http://localhost:5159/api/players/" + selectedPlayer.id, function (data) {
            console.log(data);

            player.id(data.id);
            player.name(data.name);
            player.surname(data.surname);
            player.birthdate(data.birthdate);
            player.strongLeg(data.strongLeg);
            player.height(data.height);
            player.weight(data.weight);
            player.status(data.status);
        });
    };

    const goCoacheswizard = function () {
        window.location.href = "http://localhost:5159/teams/Coaches?teamId=" + player.teamId;
    };