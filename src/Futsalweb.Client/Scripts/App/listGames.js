"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let games = ko.observableArray();

    let game = {
        id: ko.observable(),
        teamName: ko.observable(),
        rivalTeam: ko.observable(),
        location: ko.observable(),
        playedAtHome: ko.observable,
        date: ko.observable(),
        time: ko.observable()
    };

    let hiddeTable = ko.observableArray([])
    let displayMassage = ko.observable(false);

    //Public Functions
    const remove = (game) => {
        let path = "api/games/" + game.id;

        const deleteGame= function () {
            games.remove(game);
            if (games().length == 0) {
                hiddeTable([]);
                displayMassage(true);
            }
        };

        httpAjax.delete(router.makeUrl(path), deleteGame)
    };

    const goDetails = (data) => {
        router.goTo("games/" + data.id + "/details");
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