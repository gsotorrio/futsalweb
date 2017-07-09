"use strict";

(function () {
    // Variables
    const teamId = location.pathname.split('/')[2];
    const httpAjax = new HttpAjax();
    const router = new Router();

    let teamData = ko.observableArray();
    let players = ko.observableArray();
    let coaches = ko.observableArray();

    // Functions
    const goManagerWizard = () => {
        router.goTo("Teams/" + teamId + "/manager");
    };

    const goPlayersWizard = () => {
        router.goTo("Teams/" + teamId + "/Players");
    };

    const goCoachesWizard = () => {
        router.goTo("Teams/" + teamId + "/coaches");
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
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        httpAjax.get(router.makeUrl("api/teams/" + teamId), function (data) { teamData(data) });
      
        httpAjax.get(router.makeUrl("api/teams/" + teamId + "/players"), function (data) { players(data) });
        
        httpAjax.get(router.makeUrl("api/teams/" + teamId + "/coaches"), function (data) { coaches(data) });
    });
})();