"use strict";

(function () {
    // Variables
    let httpAjax = new HttpAjax();

    let teamManager = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const createUpdateTeam = function () {
        let managerId = teamManager.id();

        let newTeam = {
            id: teamManager.id(),
            name: teamManager.name(),
            category: teamManager.category()
        };

        if (!managerId) {
            let path = "teams/Manager";
            let jSon = newTeam;

            const createNewTeam = function (data) {
                moveBetwenViews(data.id, "/players")
            };

            ajaxObject.post(path, jSon, createNewTeam); 
        }
        else {
            let path = ;

            const goPlayersWizard = function () {
                moveBetwenViews(managerId, "/players")
            };

            ajaxObject.put(path, newTeam, goPlayersWizard);
        }
    };

    //ViewModel
    let viewModel = {
        teamManager: teamManager,
        createUpdateTeam: createUpdateTeam
    };

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let teamId = pathUrl.match(regularExpreesion);

        const putDatasForm = function (data) {
            teamManager.id(data.id);
            teamManager.name(data.name);
            teamManager.category(data.category);
        };

        ajaxObject.get(teamId, putDatasForm);
    });
})();