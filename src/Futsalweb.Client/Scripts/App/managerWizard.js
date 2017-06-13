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

            window.location.href = "http://localhost:5159/teams/Players?"+ data.id;
        });
    };


    // ViewModel
    //let viewModel = {
    //    teams: teams,
    //    team: team,
    //    remove: remove,
    //    teamManager: teamManager,
    //    createTeam: createTeam
    //};

    // On initialize
    $(function () {
        console.log("Ready!!!");
        //ko.applyBindings(viewModel);
    });
