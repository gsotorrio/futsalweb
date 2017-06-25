"use strict";

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
            newTeam.id = managerId;

            $.ajax({
                type: "PUT",
                url: "http://localhost:5159/api/teams",
                contentType: "application/json",
                data: JSON.stringify(newTeam)
            }).done(function () {
                window.location.href = "http://localhost:5159/teams/" + managerId + "/players";
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
        
        if (teamId != "manager") {
            $.get("http://localhost:5159/api/teams/" + teamId, function (data) {
                teamManager.id(data.id);
                teamManager.name(data.name);
                teamManager.category(data.category);
            });
        }
    });
})();