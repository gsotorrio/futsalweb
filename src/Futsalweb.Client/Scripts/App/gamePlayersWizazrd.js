"use strict";

(function () {
    // Variables
    const gameId = location.pathname.split('/')[2];

    const httpAjax = new HttpAjax();
    const router = new Router();

    let hiddeForm = ko.observableArray([]);
    let displayMassage = ko.observable(true);

    let players = ko.observableArray();
    let playersChosed = ko.observableArray()

    let player = {
        playerId: ko.observable(),
        playerName: ko.observable(),
        playerSurname: ko.observable(),
        playerPosition: ko.observable(),
        playerNumber: ko.observable(),
    };

    // Public Functions
    const showForm = () => {
        hiddeForm.push("some value");
        displayMassage(false);
    };

    const cleanForm = () => {
        player.playerId("");
        player.playerName("");
        player.playerSurname("");
        player.playerPosition("");
        player.playerNumber("");
    };

    const createNewPlayer = () => {
        let newPlayer = {
            playerId: player.playerId(),
            playerName: player.playerName(),
            playerSurname: player.playerSurname(),
            playerPosition: player.playerPosition(),
            playerNumber: player.playerNumber()
        };

        players.push(newPlayer);
        cleanForm();
    };

    const showPlayers = (data) => {
        let playersMatch = playersChosed();
        console.log(playersMatch);
        //router.goTo("Games/ListGames");
    };

    const goManagerWizard = () => {
        router.goTo("games/" + gameId + "/manager");
    };

    // ViewModel
    let viewModel = {
        selectPlayers: playersChosed,
        hiddeForm: hiddeForm,
        displayMassage: displayMassage,
        players: players,
        player: player,
        showForm: showForm,
        cleanForm: cleanForm,
        createNewPlayer: createNewPlayer,
        goManagerWizard: goManagerWizard,
        showPlayers: showPlayers
    };
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let gameId = pathUrl.match(regularExpreesion);

    });
})();