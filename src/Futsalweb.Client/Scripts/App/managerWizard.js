"use strict";

(function () {
    // Variables
    let protocolHost = new SaveUrl();

    let teamManager = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const createUpdateTeam = function () {
        let managerId = teamManager.id();

        let newTeam = {
            name: teamManager.name(),
            category: teamManager.category()
        };

        if (!managerId) {
            const callPostAjax = function () {
                let path = "teams/Manager";
                let jSon = newTeam;

                const createNewTeam = function (data) {
                    window.location.href = protocolHost.url + "/teams/" + data.id + "/players";
                };

                new PostAjax(path, jSon, createNewTeam);
            }();
           
        }
        else {
            newTeam.id = managerId;

            const callPutAjax = function () {
                let path = "teams";
                let jSonTeam = newTeam;

                const goPlayersWizard = function () {
                    window.location.href = protocolHost.url + "/teams/" + managerId + "/players";
                };

                new putAjax(path, jSonTeam, goPlayersWizard);
            }();
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

        const callGetAjax = function (teamId) {

            let putDatasForm = function (data) {
                teamManager.id(data.id);
                teamManager.name(data.name);
                teamManager.category(data.category);
            };
            new getAjax(teamId, putDatasForm);
        };
        if (teamId) {
            callGetAjax(teamId);
        }
    });
})();