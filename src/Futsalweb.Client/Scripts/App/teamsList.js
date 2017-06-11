"use strict";



    // Variables
    let teams = ko.observableArray();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const remove = function (team, event) {
        $.ajax({
            url: "http://localhost:5159/api/teams/" + team.id,
            method: "DELETE"
        }).done(function () {
            teams.remove(team);
        });
    }; // messege: Are you sure???


    // ViewModel
  
    
    // On initialize
    $(function () {
        console.log("Ready!!!");

        $.get("http://localhost:5159/api/teams", function (data) {

            teams(data);
            //ko.applyBindings(viewModelA);
        });
    });

