"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();

    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    let hiddeTable = ko.observableArray([])

    let displayMassage = ko.observable(false);

    // Public Functions
    const remove = (team) => {
        let path = "/api/teams/" + team.id;

        const deleteTeam = function () {
                teams.remove(team);
                if (teams().length == 0) {
                    hiddeTable([]);
                    displayMassage(true);
                }
        };

        httpAjax.delete(path, deleteTeam)

    }; // messege: Are you sure???

    const goDetailView = (data) => {
        window.location.href = "http://localhost:5159/Teams/" + data.id + "/details";
    };
  
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
        const path = "/api/teams";

        const showEmtyMassege = (data) => {
            if (data.length == 0) {
                displayMassage(true);
            }
            else {
                teams(data);
                hiddeTable.push("some value");
            }
        };
        httpAjax.get(path, showEmtyMassege);
    });
})();