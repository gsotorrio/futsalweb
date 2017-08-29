"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();

    let teams = ko.observableArray();
      
    let gameData = {
        idGame: ko.observable(),
        myTeam: teams,
        selectTeam: ko.observable(),  
        rivalTeam: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        placeGame: ko.observable(),
        typeGame: ko.observable()
    };

    // Public Functions
    const createUpdateGame = () => {
        let newGame = {
            idGame: gameData.idGame(),
            myTeam: gameData.selectTeam(),
            rivalTeam: gameData.rivalTeam(),
            dateGame: gameData.dateGame(),
            timeGame: gameData.timeGame(),
            placeGame: gameData.placeGame(),
            typeGame: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
        }
        else {
            //navigateBetewnViews("/Games/PlayersGame");
            console.log(newGame);
        }
    };

    // View Model
    const viewModel = {
        gameData: gameData,
        createUpdateGame: createUpdateGame
    };
 
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        let arrayTeams = [];
        
        function showData(data) {
            for (var i = 0; i < data.length; i++){
                arrayTeams.push(data[i].name);
            }
            teams(arrayTeams);
        }

        const path = "/api/teams";

        httpAjax.get(path, showData);
    });
})();
