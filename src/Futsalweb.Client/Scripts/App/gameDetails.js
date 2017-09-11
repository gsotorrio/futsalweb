"use strict";

(function () {
    // Variables
    const gameId = location.pathname.split('/')[2];

    const httpAjax = new HttpAjax();
    const router = new Router();

    let game = ko.observableArray();

    // Functions
    const goGamesList = () => {
        router.goTo("games/list");
    };

    // View Model
    let viewModel = {
        goGamesList: goGamesList
    };

    // On Initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");        

        httpAjax.get("/api/games/" + gameId, function (data) { game(data); });
    });
})();
