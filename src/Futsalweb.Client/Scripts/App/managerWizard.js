"use strict";



    // Variables
    let teamManager = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const createTeam = function () {
        let newTeam = {
            name: teamManager.name(),
            category: teamManager.category()
        };

        console.log(newTeam);

        $.post("http://localhost:5159/api/teams/Manager", newTeam).done(function (data) {
            //teams.push(data);
            console.log(data);

            window.location.href = "http://localhost:5159/teams/" + data.id + "/players";
        });
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
    });
