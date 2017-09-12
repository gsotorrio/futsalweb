"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let teams = ko.observableArray();
    let myTeams = ko.observableArray();
    let selectMyTeam = ko.observable();

    let wherePlayed = ko.observable(true);

    let gameData = {
        rivalTeam: ko.observable(),
        id: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        locationGame: ko.observable(),
        typeGame: ko.observable()
    };

    // Private Function
    const getIdTeams = () => {
        let myTeam = selectMyTeam().join();
        let teamId = "";

        for (var i = 0; i < teams().length; i++) {
            if (teams()[i].name == myTeam) {
                teamId = teams()[i].id;
            }
        }
        return teamId;
    };

    const getTrueOrFalse = () => {
        let playedAtHome;
        if (wherePlayed()) {
            playedAtHome = true;
        }
        else { playedAtHome = false };

        return playedAtHome
    };

    // Public Functions
    const createUpdateGame = () => {    
        let newGame = {
            teamId: getIdTeams(),
            id: gameData.id(),
            rivalTeam: gameData.rivalTeam(),
            playedAtHome: getTrueOrFalse(),
            date: gameData.dateGame(),
            time: gameData.timeGame(), 
            location: gameData.locationGame(),
            type: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
            router.goTo("games/" + data.id + "/players");
        }
        else {
            let path = "api/games"

            const goSelectPlayersWizard = (data) => {
                router.goTo("games/" + data.id  + "/players");
            };

            httpAjax.post(router.makeUrl(path), newGame, goSelectPlayersWizard);
        }
    };

    // View Model
    const viewModel = {
        teams: teams,
        myTeams: myTeams,
        selectMyTeam: selectMyTeam,
        wherePlayed: wherePlayed,
        gameData: gameData,
        createUpdateGame: createUpdateGame
    };
 
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let gameId = pathUrl.match(regularExpreesion);

        if (gameId) {
            let path = "api/games/" + gameId;

            const putDatasForm = (data) => {
                console.log(data)
            };

            httpAjax.get(router.makeUrl(path), putDatasForm);
        }

        // Teams drop down list.
        const path = "/api/teams";

        let arraymyTeamsNames = [];
        let arrayTeams = []
        
        function showData(data) {
            for (var i = 0; i < data.length; i++){
                arraymyTeamsNames.push(data[i].name);
                arrayTeams.push(data[i]);
            }
            myTeams(arraymyTeamsNames);
            teams(arrayTeams);
        }

        httpAjax.get(path, showData);
    });
})();
