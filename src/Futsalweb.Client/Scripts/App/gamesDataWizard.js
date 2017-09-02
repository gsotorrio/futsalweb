"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let hiddeTextBox = ko.observableArray([])
    let displayMassage = ko.observable(true);

    let teams = ko.observableArray();
    let selectTeam = ko.observable();

    selectTeam.subscribe(function (item) {
        if (item == "Write yourself") {
            console.log("molo mazo");
            displayMassage(false);
            hiddeTextBox.push("Some value")
        }
    });

    let gameData = {
        idGame: ko.observable(),
        homeTeam: selectTeam(),
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
        hiddeTextBox: hiddeTextBox,
        displayMassage: displayMassage,
        teams: teams,
        selectTeam: selectTeam,
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
            arrayTeams.push("Write yourself");
            teams(arrayTeams);
        }

        const path = "/api/teams";

        httpAjax.get(path, showData);
    });
})();
