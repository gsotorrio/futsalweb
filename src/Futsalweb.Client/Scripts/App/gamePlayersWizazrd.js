"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();

    let players = ko.observableArray();

    let player = {
        idPlayer: ko.observable(),
        playername: ko.observable(),
        playerSurname: ko.observable(),
        playerPosition: ko.observable(),
        playerNumber: ko.observable()
    };
    // Public Functions

    // ViewModel
    let viewModel = {
        players: players,
        player: player
    };
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        const path = "/api/teams/" + "2dfd1476-c5a9-41d5-b989-3de4bb79b0bf" + "/players";

        const putDatasForm = (data) => {
            let arrayPlayers = [];
                
            for (var i = 0; i < data.length; i++) {
                let playerData = {
                    idPlayer: data[i].id,
                    playername: data[i].name,
                    playerSurname: data[i].surname,
                    playerPosition: data[i].position,
                    playerNumber: data[i].number
                };
                
                arrayPlayers.push(playerData);
            }
            
            players(arrayPlayers);
        };

        httpAjax.get(path, putDatasForm);
    });
})();