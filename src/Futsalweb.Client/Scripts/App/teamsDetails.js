"use strict";

(function () {
    const teamId = location.pathname.split('/')[2];

    // Variables
    let players = ko.observableArray();
    let coaches = ko.observableArray();

    // Functions

    // ViewModel
    let viewModel = {
        players: players,
        coaches: coaches
    };


    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        $.get("http://localhost:5159/api/teams/" + teamId, function (data) {
            console.log(data)
        });
       
        $.get("http://localhost:5159/api/teams/" + teamId + "/players", function (data) {
            console.log(data);
            players(data);

        });

        $.get("http://localhost:5159/api/teams/" + teamId + "/coaches", function (data) {
            console.log(data);
            coaches(data);

        });
    });
})();