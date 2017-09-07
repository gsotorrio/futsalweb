"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let myTeams = ko.observableArray();
    let selectMyTeam = ko.observable();

    let wherePlayed = ko.observable(true);

    let gameData = {
        rivalTeam: ko.observable(),
        idGame: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        locationGame: ko.observable(),
        typeGame: ko.observable()
    };

    let teamId = "";
    let asd = "hola";
    // Pricate Function
    const getUrlTeams = () => {
        let myTeam = selectMyTeam().join();
        let arrayTeams = [];

        const path = "/api/teams";

        const getTeams = (data) => {
            for (var i = 0; i < data.length; i++) { 
                if (data[i].name == myTeam) { 
                    arrayTeams.push(data[i]);
                }
            }
        };
        httpAjax.get(path, getTeams);
        return arrayTeams;
    };

    // Public Functions
    const createUpdateGame = () => {
        let playedAtHome;
        if (wherePlayed()) {
            playedAtHome = true;
        }
        else { playedAtHome = false };
        
        let newGame = {
            teamId: "be7ad550-e901-47a1-9941-1255dcf3d35b",
            idGame: gameData.idGame(),
            rivalTeam: gameData.rivalTeam(),
            playedAtHome: playedAtHome,
            date: gameData.dateGame(),
            time: gameData.timeGame(), 
            location: gameData.locationGame(),
            type: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
        }
        else {
            //let path = "api/games"

            //const goSelectPlayersWizard = () => {
            //    console.log("Done");
            //};

            //httpAjax.post(router.makeUrl(path), newGame, goSelectPlayersWizard);
            getUrlTeams();
            console.log(newGame);
        }
    };

    // View Model
    const viewModel = {
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

        let arraymyTeams = [];
        
        function showData(data) {
            for (var i = 0; i < data.length; i++){
                arraymyTeams.push(data[i].name);
            }
            myTeams(arraymyTeams);
        }
        const path = "/api/teams";

        httpAjax.get(path, showData);
    });
})();
