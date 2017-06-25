"use strict";

(function () { 
    // Variables
    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    let hiddeTable = ko.observableArray([])

    let displayMassage = ko.observable(false);

    // Public Functions
    const remove = function (team, event) {
        $.ajax({
            url: "http://localhost:5159/api/teams/" + team.id,
            method: "DELETE"
        }).done(function () {
            teams.remove(team);
            if (teams().length == 0) {
                hiddeTable([]);
                displayMassage(true);
            }
        });
    }; // messege: Are you sure???

    const goDetailView = function (teamDatas) {
        window.location.href = "http://localhost:5159/teams/" + teamDatas.id + "/details";
    }
  
    //ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        hiddeTable: hiddeTable,
        displayMassage: displayMassage,
        remove: remove,
        goDetailView: goDetailView
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        $.get("http://localhost:5159/api/teams", function (data) {
            if (data.length == 0) {
                displayMassage(true);
            }
            else {
                teams(data);
                hiddeTable.push("some value");
            }
        });
    });
})();