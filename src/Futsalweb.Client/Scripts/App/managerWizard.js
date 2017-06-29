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
            $.post(protocolHost.url + "/api/teams/Manager", newTeam).done(function (data) {

                window.location.href = protocolHost.url + "/teams/" + data.id + "/players";
            });
        }
        else {
            newTeam.id = managerId;

            $.ajax({
                type: "PUT",
                url: protocolHost.url + "/api/teams",
                contentType: "application/json",
                data: JSON.stringify(newTeam)
            }).done(function () {
                window.location.href = protocolHost.url + "/teams/" + managerId + "/players";
            });
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
      
         let callGetAjax = function (teamId) {
             var teamId = teamId;
             var putDatasForm = function (data) {
                 teamManager.id(data.id);
                 teamManager.name(data.name);
                 teamManager.category(data.category);
             };
             new GetAjax(teamId, putDatasForm);
         }

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

