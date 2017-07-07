"use strict";

(function () {
    // Variables
    let httpAjax = new HttpAjax();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const createUpdateTeam = function () {

        let newTeam = {
            id: team.id(),
            name: team.name(),
            category: team.category()
        };

        if (newTeam.id) {
            let path = "/api/teams";

            const goPlayersWizard = function () {
                window.location.href = "http://localhost:5159/Teams/" + newTeam.id + "/Players";

            };

            httpAjax.put(path, newTeam, goPlayersWizard);
        }
        else {
            let path = "/api/teams";
            

            const goPlayersWizard = function (data) {
                window.location.href = "http://localhost:5159/Teams/" + data.id + "/Players";
            };

            httpAjax.post(path, newTeam, goPlayersWizard);
        }
    };

    //ViewModel
    let viewModel = {
        team: team,
        createUpdateTeam: createUpdateTeam
    };

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let teamId = pathUrl.match(regularExpreesion);

        if (teamId) {
            let path = "/api/teams/" + teamId;

            const putDatasForm = function (data) {
                team.id(data.id);
                team.name(data.name);
                team.category(data.category);
            };

            httpAjax.get(path, putDatasForm);
        }
    });
})();