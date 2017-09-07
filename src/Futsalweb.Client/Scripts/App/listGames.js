"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let games = ko.observableArray();

    let game = {
        id: ko.observable(),
        teamId: ko.observable(),
        rivalTeam: ko.observable(),
        type: ko.observable(),
        date: ko.observable()
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
        const path = "api/games";

        const showEmtyMassege = (data) => {
            if (data.length == 0) {
                displayMassage(true);
            }
            else {
                console.log(data);
                games(data);
                hiddeTable.push("some value");
            }
        };
        httpAjax.get(router.makeUrl(path), showEmtyMassege);
    });
})();