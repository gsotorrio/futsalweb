"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();

    let games = ko.observableArray();

    let game = {
        idGame: ko.observable(),
        homeTeam: ko.observable(),
        visitTeam: ko.observable(),
        typeGame: ko.observable(),
        dateGame: ko.observable()
    };
    //Public Functions
    const remove = () => {

    };

    const goDetails = () => {

    };
    // ViewModel
    let viewModel = {
        games: games,
        game: game,
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
    });
})();