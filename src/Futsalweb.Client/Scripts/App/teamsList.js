"use strict";

(function () { 

    // Variables
    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const remove = function (team, event) {
        $.ajax({
            url: "http://localhost:5159/api/teams/" + team.id,
            method: "DELETE"
        }).done(function () {
            teams.remove(team);
        });
    }; // messege: Are you sure???
  
    //ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        remove: remove
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        $.get("http://localhost:5159/api/teams", function (data) {
            teams(data);
        });
    });
})();