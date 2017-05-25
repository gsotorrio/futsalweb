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

    // ViewModel
    let viewModel = {
        clean: clean
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