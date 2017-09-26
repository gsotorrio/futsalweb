"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    let hiddeTable = ko.observableArray([]);
    let hiddeButton = ko.observableArray([]);

    let displayMassage = ko.observable(false);

    // Public Functions
    const remove = (team) => {
        let path = "api/teams/" + team.id;

        const deleteTeam = function () {
                teams.remove(team);
                if (teams().length == 0) {
                    hiddeTable([]);
                    displayMassage(true);
                }
        };

        httpAjax.delete(router.makeUrl(path), deleteTeam)

    }; // messege: Are you sure???

    const goDetailView = (data) => {
        router.goTo("Teams/" + data.id + "/details");
    };
  
    //ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        hiddeTable: hiddeTable,
        hiddeButton: hiddeButton,
        displayMassage: displayMassage,
        remove: remove,
        goDetailView: goDetailView
    };

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        const path = "api/teams";

        const showEmtyMassege = (data) => {
            if (data.length == 0) {
                displayMassage(true);
            }
            else {
                console.log(data);
                teams(data);
                hiddeTable.push("some value");
            }
        };
        httpAjax.get(router.makeUrl(path), showEmtyMassege);

        if (teams.length == 1) {
            hiddeButton.push("some value");
        }
    });
})();