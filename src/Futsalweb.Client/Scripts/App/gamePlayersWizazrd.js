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

        // Get my team name.
        let teamName = "";

        const pathGame = "/api/games/" + gameId;

        const getmyTeamName = (data) => {
            teamName = data.name;
        };
        httpAjax.get(pathGame, getmyTeamName);

        // Get My team id.
        let teamId = ""

        const pathTeams = "/api/teams";

        const getTeamId = (data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == teamName) {
                    teamId = data[i].id;
                }
            }

            //Get players in my team
            const path = "/api/teams/" + teamId + "/players";

            const putDataForm = (data) => {
                let arrayPlayers = [];

                for (var i = 0; i < data.length; i++) {
                    let playerData = {
                        playerId: data[i].id,
                        playerName: data[i].name,
                        playerSurname: data[i].surname,
                        playerPosition: data[i].position,
                        playerNumber: data[i].number
                    };
                    arrayPlayers.push(playerData);
                }
                players(arrayPlayers);
            };
            httpAjax.get(path, putDataForm);
        };
        httpAjax.get(pathTeams, getTeamId);
    });
})();