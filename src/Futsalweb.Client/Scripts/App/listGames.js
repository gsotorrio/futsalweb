"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let games = ko.observableArray();

    let game = {
        idGame: ko.observable(),
        homeTeam: ko.observable(),
        visitTeam: ko.observable(),
        typeGame: ko.observable(),
        dateGame: ko.observable()
    };

    let hiddeTable = ko.observableArray([])

    let displayMassage = ko.observable(false);

    //Public Functions
    const remove = () => {

    };

    const goDetails = () => {
        router.goTo("games/gameData");
    };
    // ViewModel
    let viewModel = {
        games: games,
        game: game,
        hiddeTable: hiddeTable,
        displayMassage: displayMassage,
        remove: remove,
        goDetails: goDetails
    };
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

            let imagineGame = {
                idGame: 1513515,
                homeTeam: "Boskozaleak",
                visitTeam: "Jarrilleros",
                typeGame: "amistoso",
                dateGame: "12-12-2012"
            };

            games(imagineGame);
            hiddeTable.push("some value");
            displayMassage(false);
    });
})();