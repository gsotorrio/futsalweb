"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
    let protocolHost = new SaveUrl();


    let displayButtonAdd = ko.observable(true);
    let displayButtonSave = ko.observable(false);


    let hiddeTableButtonPlayer = ko.observableArray([])
        
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
        position: ko.observable(),
        number: ko.observable(),
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
        player.position("");
        player.number("");
        player.status("");
        whatLeg([]);
        displayButtonAdd(true);
        displayButtonSave(false);     
    };

    const createUpdatePlayer = function () {
        let playerId = player.id();

        let newPlayer = {
            teamId: teamId,
            name: player.name(),
            surname: player.surname(),
            birthdate: player.birthdate(),
            height: player.height(),
            weight: player.weight(),
            strongLeg: whatLeg().toString(),
            position: player.position(),
            number: player.number(),
            status: player.status()
        };

        if (!playerId) {
            const callPostAjax = function () {
                let path = "players";
                let jSon = newPlayer;

                let createNewPlayer = function (data) {
                    players.push(data);
                    cleanFormPlayer();
                    hiddeTableButtonPlayer.push("some value");
                };
                new postAjax(path, jSon, createNewPlayer);
            }();
        }

        else {
            let playerData = {
                teamId: teamId,
                id: player.id(),
                name: player.name(),
                surname: player.surname(),
                birthdate: player.birthdate(),
                height: player.height(),
                weight: player.weight(),
                strongLeg: whatLeg().toString(),
                position: player.position(),
                number: player.number(),
                status: player.status()
            };

            const callPutAjax = function () {
                let path = "players";
                let jSon = playerData;

                const updateDataPlayer = function (data) {
                        let indexPlayer;

                        for (var i = 0; i < players().length; i++) {
                            if (players()[i].id == playerData.id) {
                                indexPlayer = i;
                            }
                        }

                        players.replace(players()[indexPlayer], playerData);

                        cleanFormPlayer();
                };
                new putAjax(path, jSon, updateDataPlayer);
            }();

            displayButtonAdd(true);
            displayButtonSave(false);
        }
    };

    const removePlayer = function (player) {
        let path = "players/";
        let playerId = player.id;

        const deletePlayer = function () {
            players.remove(player);
            if (players().length == 0){
                hiddeTableButtonPlayer([]);
            }
        };

        new deleteAjax(path, playerId, deletePlayer);
    };

    const putDataInForm = function (selectedPlayer) {
        player.id(selectedPlayer.id);
        player.name(selectedPlayer.name);
        player.surname(selectedPlayer.surname);
        player.birthdate(selectedPlayer.birthdate.replace("T00:00:00", ""));
        player.height(selectedPlayer.height);
        player.weight(selectedPlayer.weight);
        player.position(selectedPlayer.position);
        player.number(selectedPlayer.number);
        player.status(selectedPlayer.status);
        if (selectedPlayer.strongLeg === "Left,Right" || selectedPlayer.strongLeg === "Right,Left") {
            whatLeg(["Left", "Right"]);
        }
        else{
            whatLeg([selectedPlayer.strongLeg]);
        }

        displayButtonAdd(false);
        displayButtonSave(true);
    };

    const goManagerWizard = function () {
        moveBetwenViews(teamId, "/manager");
    }

    const goCoacheswizard = function () {
        moveBetwenViews(teamId, "/coaches");
    };

    //ViewModel
    let viewModel = {
        displayButtonAdd: displayButtonAdd,
        displayButtonSave: displayButtonSave,
        hiddeTableButtonPlayer: hiddeTableButtonPlayer,
        legOption: legOption,
        whatLeg: whatLeg,
        players: players,
        player: player,
        cleanFormPlayer: cleanFormPlayer,
        createUpdatePlayer: createUpdatePlayer,
        removePlayer: removePlayer,
        putDataInForm: putDataInForm,
        goManagerWizard: goManagerWizard,
        goCoacheswizard: goCoacheswizard
    };

    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        const callGetAjax = function () {
            let path = teamId + "/players";
            let putDatasForm = function (data) {
                if (data.length > 0) {
                    players(data);
                    hiddeTableButtonPlayer.push("some value");
                };
            }
            new getAjax(path, putDatasForm);
        }();
    });
})();