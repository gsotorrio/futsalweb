"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let team = {
        id: ko.observable(),
        name: ko.observable(),
        category: ko.observable()
    };

    // Public Functions
    const createUpdateTeam = () => {
        let newTeam = {
            id: team.id(),
            name: team.name(),
            category: team.category()
        };

        if (newTeam.id) {
            const path = "api/teams";

            const goPlayersWizard = () => {
                router.goTo("Teams/" + newTeam.id + "/Players");
            };

            httpAjax.put(router.makeUrl(path), newTeam, goPlayersWizard);
        }
        else {
            const path = "api/teams";
            
            const goPlayersWizard = (data) => {
                router.goTo("Teams/" + data.id + "/Players");
            };

            httpAjax.post(router.makeUrl(path), newTeam, goPlayersWizard);
        }
    };

    //ViewModel
    let viewModel = {
        team: team,
        createUpdateTeam: createUpdateTeam
    };

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let teamId = pathUrl.match(regularExpreesion);

        if (teamId) {
            let path = "api/teams/" + teamId;

            const putDatasForm = (data) => {
                team.id(data.id);
                team.name(data.name);
                team.category(data.category);
            };

            httpAjax.get(router.makeUrl(path), putDatasForm);
        }
    });
})();