"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let teamsHome = ko.observableArray();
    let selectTeamHome = ko.observable();

    let teamsGuest = ko.observableArray();
    let selectTeamGuest = ko.observable();

    let hiddeHomeTextBox = ko.observableArray([]);
    let displayTeamHome = ko.observable(true);

    let hiddeGuestTextBox = ko.observableArray(["some value"]);
    let displayTeamGuest = ko.observable(false);

    let gameData = {
        //idGame: ko.observable(),
        //homeTeam: selectTeam(),
        //rivalTeam: ko.observable(),
        //dateGame: ko.observable(),
        //timeGame: ko.observable(),
        //placeGame: ko.observable(),
        //typeGame: ko.observable()
    };

    // Private functions
    selectTeamHome.subscribe(function (item) {
        if (item == "Write yourself") {
            displayTeamHome(false);
            hiddeHomeTextBox.push("Some value");
            displayTeamGuest(true);
            hiddeGuestTextBox.splice(0, 1);
        }
    });

    selectTeamGuest.subscribe(function (item) {
        if (item == "Write rival team") {
            displayTeamHome(true);
            hiddeHomeTextBox.splice(0, 1);
            displayTeamGuest(false);
            hiddeGuestTextBox.push("some value");
        }
    });

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
        teamsHome: teamsHome,
        selectTeamHome: selectTeamHome,
        teamsGuest: teamsGuest,
        selectTeamGuest: selectTeamGuest,
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

        let arrayTeamsHome = [];
        let arrayTeamsGuest = [];
        
        function showData(data) {
            for (var i = 0; i < data.length; i++){
                arrayTeamsHome.push(data[i].name);
                arrayTeamsGuest.push(data[i].name);
            }
            arrayTeamsHome.push("Write yourself");
            arrayTeamsGuest.push("Write rival team")
            teamsHome(arrayTeamsHome);
            teamsGuest(arrayTeamsGuest);
        }

        const path = "/api/teams";

        httpAjax.get(path, showData);
    });
})();
