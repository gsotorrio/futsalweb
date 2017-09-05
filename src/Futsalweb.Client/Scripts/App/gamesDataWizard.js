"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let myTeams = ko.observableArray();
    let selectMyTeam = ko.observable();

    let hiddeHomeTextBox = ko.observableArray([]);
    let displayTeamHome = ko.observable(true);

    let hiddeGuestTextBox = ko.observableArray(["some value"]);
    let displayTeamGuest = ko.observable(false);

    let gameData = {
        rivalTeam: ko.observable(),
        idGame: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        locationGame: ko.observable(),
        typeGame: ko.observable()
    };

    // Public Functions
    const createUpdateGame = () => {
        let newGame = {
            idGame: gameData.idGame(),
            homeTeam:gameData.homeTeam,
            dateGame: gameData.dateGame(),
            timeGame: gameData.timeGame(),
            placeGame: gameData.placeGame(),
            typeGame: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
        }
        else {
            //router.goTo("games/playersGame");
            console.log(newGame);
        }
    };

    // View Model
    const viewModel = {
        myTeams: myTeams,
        selectMyTeam: selectMyTeam,
        hiddeHomeTextBox: hiddeHomeTextBox,
        displayTeamHome: displayTeamHome,
        hiddeGuestTextBox: hiddeGuestTextBox,
        displayTeamGuest: displayTeamGuest,
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
