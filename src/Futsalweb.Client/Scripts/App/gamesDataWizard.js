﻿"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();

    let gameData = {
        idGame: ko.observable(),
        homeTeam: ko.observable(),
        visitTeam: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        placeGame: ko.observable(),
        typeGame: ko.observable()
    };

    // Public Functions
    const createUpdateGame = () => {
        let newGame = {
            idGame: gameData.idGame(),
            homeTeam: gameData.homeTeam(),
            visitTeam: gameData.visitTeam(),
            dateGame: gameData.dateGame(),
            timeGame: gameData.timeGame(),
            placeGame: gameData.placeGame(),
            typeGame: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
        }
        else {
            navigateBetewnViews("/Games/PlayersGame");
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

})();
