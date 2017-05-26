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



    // ViewModel
    let viewModel = {
        clean: clean,
        remove: remove,
        select: select
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