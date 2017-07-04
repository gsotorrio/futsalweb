"use strict";

(function () {
    // Variables
    let ajaxObject = new CallsServer();

    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    let hiddeTable = ko.observableArray([])

    let displayMassage = ko.observable(false);

    // Public Functions
    const remove = function (team) {
        let path = "teams/";

        const deleteTeam = function () {
                teams.remove(team);
                if (teams().length == 0) {
                    hiddeTable([]);
                    displayMassage(true);
                }
        };

        ajaxObject.delete(path, team.id, deleteTeam)

    }; // messege: Are you sure???

    const goDetailView = function (teamData) {
        moveBetwenViews(teamData.id, "/details");
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

        let showEmtyMassege = function (data) {
            if (data.length == 0) {
                displayMassage(true);
            }
            else {
                teams(data);
                hiddeTable.push("some value");
            }
        };
        ajaxObject.get("", showEmtyMassege);
    });
})();