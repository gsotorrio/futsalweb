"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
    const httpAjax = new HttpAjax();
    const router = new Router();

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
    const cleanFormPlayer = () => {
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

    const createUpdatePlayer = () => {
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

        if (player.id()) {
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

            const path = "api/players";

            const updateDataPlayer = (data) => {
                let indexPlayer;

                for (var i = 0; i < players().length; i++) {
                    if (players()[i].id == playerData.id) {
                        indexPlayer = i;
                    }
                }
                players.replace(players()[indexPlayer], playerData);
                cleanFormPlayer();
            };

            httpAjax.put(router.makeUrl(path), playerData, updateDataPlayer);

            displayButtonAdd(true);
            displayButtonSave(false);
        }

        else {
            const path = "api/players";

            const createNewPlayer = (data) => {
                players.push(data);
                cleanFormPlayer();
                hiddeTableButtonPlayer.push("some value");
            };

            httpAjax.post(router.makeUrl(path), newPlayer, createNewPlayer);
        }
    };

    const removePlayer = (player) => {
        const path = "api/players/" + player.id;

        const deletePlayer = function () {
            players.remove(player);
            if (players().length == 0){
                hiddeTableButtonPlayer([]);
            }
        };

        httpAjax.delete(router.makeUrl(path), deletePlayer);
    };

    const putDataInForm = (selectedPlayer) => {
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

    const goManagerWizard = () => {
        router.goTo("Teams/" + teamId + "/manager");
    };

    const goCoacheswizard = () => {
        router.goTo("Teams/" + teamId + "/coaches");
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

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        const path = "api/teams/" + teamId + "/players";

        const putDatasForm = (data) => {
            if (data.length > 0) {
                players(data);
                hiddeTableButtonPlayer.push("some value");
            };
        }

        httpAjax.get(router.makeUrl(path), putDatasForm);
    });
})();