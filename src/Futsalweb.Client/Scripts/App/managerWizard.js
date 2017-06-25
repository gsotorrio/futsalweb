﻿"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];

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
            $.post("http://localhost:5159/api/teams/Manager", newTeam).done(function (data) {

                window.location.href = "http://localhost:5159/teams/" + data.id + "/players";
            });
        }
        else {
            let newhDataTeam = {
                id: teamManager.id(),
                name: teamManager.name(),
                category: teamManager.category()
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:5159/api/teams",
                contentType: "application/json",
                data: JSON.stringify(newhDataTeam)
            }).done(function () {
                window.location.href = "http://localhost:5159/teams/" + newhDataTeam.id + "/players";
            });
        }
    };

    //ViewModel
    let viewModel = {
        teamManager: teamManager,
        createUpdateTeam: createUpdateTeam
    };

    // On initialize
     $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
        
        if (teamId != "manager") {
            $.get("http://localhost:5159/api/teams/" + teamId, function (data) {
                teamManager.id(data.id);
                teamManager.name(data.name);
                teamManager.category(data.category);
            });
        }
    });
})();