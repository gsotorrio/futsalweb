"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    // Functions
    const goGamesList = () => {
        router.goTo("games/listGames");
    };

    // View Model
    let viewModel = {
        goGamesList: goGamesList
    };

    // On Initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");
    });
})();
