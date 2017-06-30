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
            //$.post(protocolHost.url + "/api/teams/Manager", newTeam).done(function (data) {

            //    window.location.href = protocolHost.url + "/teams/" + data.id + "/players";
            //});
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
            //$.ajax({
            //    type: "PUT",
            //    url: protocolHost.url + "/api/teams",
            //    contentType: "application/json",
            //    data: JSON.stringify(newTeam)
            //}).done(function () {
            //    window.location.href = protocolHost.url + "/teams/" + managerId + "/players";
            //});
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
            new GetAjax(teamId, putDatasForm);
        };
        if (teamId) {
            callGetAjax(teamId);
        }
    });
})();

 //    $.get(protocolHost.url + "/api/teams/" + teamId, function (data) {
 //        teamManager.id(data.id);
 //        teamManager.name(data.name);
 //        teamManager.category(data.category);
 //    });
 //}

