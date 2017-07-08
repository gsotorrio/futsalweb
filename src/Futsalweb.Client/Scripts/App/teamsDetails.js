"use strict";

(function () {
    // Variables
    const teamId = location.pathname.split('/')[2];
    const httpAjax = new HttpAjax();

    let teamData = ko.observableArray();
    let players = ko.observableArray();
    let coaches = ko.observableArray();

    // Functions
    const goManagerWizard = () => {
        navigateBetewnViews("/Teams/" + teamId + "/manager");
    };

    const goPlayersWizard = () => {
        navigateBetewnViews("/Teams/" + teamId + "/Players");
    };

    const goCoachesWizard = () => {
        navigateBetewnViews("/Teams/" + teamId + "/coaches");
    };

    // ViewModel
    let viewModel = {
        teamData: teamData,
        players: players,
        coaches: coaches,
        goManagerWizard: goManagerWizard,
        goPlayersWizard: goPlayersWizard,
        goCoachesWizard: goCoachesWizard
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        httpAjax.get("/api/teams/" + teamId, function (data) { teamData(data) });
      
        httpAjax.get("/api/teams/" + teamId + "/players", function (data) { players(data) });
        
        httpAjax.get("/api/teams/" + teamId + "/coaches", function (data) { coaches(data) });
    });
})();