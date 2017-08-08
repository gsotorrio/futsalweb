﻿"use strict";

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

    let hiddeTable = ko.observableArray([])

    let displayMassage = ko.observable(false);

    //Public Functions
    const remove = () => {

    };

    const goDetails = () => {
        navigateBetewnViews("/Teams/" + data.id + "/details");
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

        if (games.length == 0) {
            displayMassage(false);
        }
        else {
            games(data);
            hiddeTable.push("some value");
        }

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