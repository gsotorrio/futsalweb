"use strict";

(function () {

    // Variables
    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const clean = function () {
        team.id("");
        team.name("");
        team.category("");
    };

    const edit = function () {

    };
    
    const remove = function (team, event) {
        $.ajax({
            url: "http://localhost:5159/api/teams/" + team.id,
            method: "DELETE"
        }).done(function () {
            teams.remove(team);
        });
    }; // messege: Are you sure???

    const select = function (slectedTeam) {
        $.get("http://localhost:5159/api/teams/" + slectedTeam.id, function (data) {
            console.log(data);

            team.id(data.id);
            team.name(data.name);
            team.category(data.category);
        });
    };

    const updateTeam = function () {
        let updateDataTeam = {
            id: team.id(),
            name: team.name(),
            category: team.category()
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:5159/api/teams",
            contentType: "application/json",
            data: JSON.stringify(updateDataTeam)
        }).done(function () {

            var indexTeam;

            for (var i = 0; i < teams().length; i++) {
                if (teams()[i].id == updateDataTeam.id) {
                    indexTeam = i;
                }
            }

            teams.replace(teams()[indexTeam], updateDataTeam);

            clean();
        });
    };

    const createTeam = function () {
      
            let newTeam = {
                name: team.name(),
                category: team.category()
            };

            $.post("http://localhost:5159/api/teams", newTeam).done(function (data) {

                teams.push(data);

                clean();
            });
    };

    // ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        edit: edit,
        clean: clean,
        remove: remove,
        select: select,
        updateTeam: updateTeam,
        createTeam: createTeam
    };
    
    // On initialize
    $(function () {
        console.log("Ready!!!");

        $.get("http://localhost:5159/api/teams", function (data) {

            teams(data);
            ko.applyBindings(viewModel);
        });
    });

})();