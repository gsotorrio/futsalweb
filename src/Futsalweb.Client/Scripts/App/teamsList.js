"use strict";

(function () {

    // Variables
    let teams = ko.observableArray();

    let team = {
        teamId: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const clean = function () {
        team.name("");
        team.category("");
    };

    const remove = function () {
        $.ajax({
            url: "",
            method: "DELETE"
        }).done(function () {
            teams.remove(team);
        });
    };

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



    // ViewModel
    let viewModel = {
        clean: clean,
        remove: remove,
        select: select,
        updateTeam: updateTeam
    };
    
    // On initialize
    $(function () {
        console.log("Ready!!");

        $.get("", function (data) {

            teams(data);
            ko.applyBindings(viewModel);
        });
    });

}) ();