"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let teams = ko.observableArray();
     
    let visitGuest = ko.observable(true);
    let visitGuestChoise = ko.observable();

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
        let homeTeam = "";
        let guestTeam = "";

        if (visitGuestChoise() == "Home") {
            homeTeam = gameData.selectTeam();
            guestTeam = gameData.rivalTeam();
        }
        else {
            guestTeam = gameData.selectTeam();
            homeTeam = gameData.rivalTeam();
        }

        let newGame = {
            idGame: gameData.idGame(),
            homeTeam: homeTeam,
            guestTeam: guestTeam,
            dateGame: gameData.dateGame(),
            timeGame: gameData.timeGame(),
            placeGame: gameData.placeGame(),
            typeGame: gameData.typeGame()
        };

        if (newGame.idGame){
            console.log(newGame)
        }
        else {
            router.goTo("games/playersGame");
            console.log(newGame);
        }
    };

    // View Model
    const viewModel = {
        teams: teams,
        visitGuest: visitGuest,
        visitGuestChoise: visitGuestChoise,
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
