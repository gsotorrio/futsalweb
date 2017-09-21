"use strict";

(function () {
    // Variables
    const httpAjax = new HttpAjax();
    const router = new Router();

    let wherePlayed = ko.observable(false);
    let teamId = "";

    let gameData = {
        myTeam: ko.observable(),
        rivalTeam: ko.observable(),
        id: ko.observable(),
        dateGame: ko.observable(),
        timeGame: ko.observable(),
        locationGame: ko.observable(),
        typeGame: ko.observable()
    };

    // Useful object.
    function Useful() {
        this.convertDate = function (date) {
            var arrayDate = date.split("/");

            var a = arrayDate[0];
            var b = arrayDate[1];
            var c = ""

            c = a;
            a = b;
            b = c;

            arrayDate[0] = a;
            arrayDate[1] = b;

            arrayDate.reverse();

            return arrayDate.join("-");
        };

        this.convertTime = function (time) {
            if (time.length == 8) {
                var arrayTime = time.slice(0, 5).split(":");
                var string = time.slice(6)

                if (string == "PM") {
                    arrayTime[0] = +arrayTime[0] + 12;
                    return arrayTime.join(":");
                }
                else {
                    return arrayTime.join(":");
                }
            }
            else {
                var arrayTime = time.slice(0, 4).split(":");
                var string = time.slice(5)

                if (string == "PM") {
                    arrayTime[0] = +arrayTime[0] + 12;
                    return arrayTime.join(":");
                }
                else {
                    return 0 + arrayTime.join(":");
                }
            }
        };

        this.getIdTeam = function () {
            let myTeam = gameData.myTeam().join();
            let teamId = "";

            for (var i = 0; i < teams().length; i++) {
                if (teams()[i].name == myTeam) {
                    teamId = teams()[i].id;
                }
            }
            return teamId;
        };

        this.getTrueOrFalse = function () {
            let playedAtHome;
            if (wherePlayed()) {
                playedAtHome = true;
            }
            else { playedAtHome = false };

            return playedAtHome
        };
    }

    var useful = new Useful();

    // Public Functions
    const createUpdateGame = () => {    
        let newGame = {
            teamId: teamId,
            id: gameData.id(),
            rivalTeam: gameData.rivalTeam(),
            playedAtHome: useful.getTrueOrFalse(),
            date: gameData.dateGame(),
            time: gameData.timeGame(), 
            location: gameData.locationGame(),
            type: gameData.typeGame()
        };

        if (newGame.id){
            let path = "api/games";

            const goSelectPlayersWizard = () => {
                router.goTo("games/" + newGame.id + "/players");
            };

            httpAjax.put(router.makeUrl(path), newGame, goSelectPlayersWizard);
        }
        else {
            let path = "api/games"

            const goSelectPlayersWizard = (data) => {
                router.goTo("games/" + data.id  + "/players");
            };

            httpAjax.post(router.makeUrl(path), newGame, goSelectPlayersWizard);
        }
    };

    // View Model
    const viewModel = {
        wherePlayed: wherePlayed,
        gameData: gameData,
        createUpdateGame: createUpdateGame
    };
 
    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        let pathUrl = location.pathname;
        let regularExpreesion = /[a-z\d-]{36}/g;
        let gameId = pathUrl.match(regularExpreesion);

        if (gameId) {
            let path = "api/games";

            const putDatasForm = (data) => {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == gameId) {
                        console.log(data[i])
                        gameData.id(data[i].id);
                        gameData.locationGame(data[i].location);
                        gameData.typeGame(data[i].type);
                        gameData.rivalTeam(data[i].rivalTeam);
                        gameData.dateGame(useful.convertDate(data[i].date));
                        gameData.timeGame(useful.convertTime(data[i].time));
                        wherePlayed(data[i].playedAtHome);
                    }
                }
            };

            httpAjax.get(router.makeUrl(path), putDatasForm);
        }

        // Teams drop down list.
        const path = "/api/coaches/eb9fb3ef-e8a0-4c8f-8f13-746cc30f023c/team";
        
        function showData(data) {
            gameData.myTeam(data.name);
            teamId = data.id;
        }

        httpAjax.get(path, showData);
    });
})();
