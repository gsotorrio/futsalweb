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

    const select = function () {
        $.get("", function (data) {
            console.log(data);

            team.teamId(data.teamId);
            team.name(data.name);
            team.category(data.category);
        });
    };

    const updateTeam = function () {
        let updateDataTeam = {
            name: team.name(),
            category: team.category()
        };

        $.ajax({
            type: "PUT",
            url: "",
            contentType: "application/json",
            data: JSON.stringify(updateDataTeam)
        }).done(function (data) {

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
        console.log("ready!");

        $.get("http://localhost:5159/api/teams", function (data) {

            teams(data);
            ko.applyBindings(viewModel);
        });
    });

})();