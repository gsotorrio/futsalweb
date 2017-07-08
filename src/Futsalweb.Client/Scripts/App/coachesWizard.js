﻿"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
    const httpAjax = new HttpAjax();

    let displayButtonAdd = ko.observable(true);
    let displayButtonSave = ko.observable(false);

    let hiddeTableButtonCoach = ko.observableArray([]);

    let coaches = ko.observableArray();

    let coach = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        birthdate: ko.observable(),
        role: ko.observable()
    };

    // Public Functions
    const cleanFormCoach = () => {
        coach.id("");
        coach.name("");
        coach.surname("");
        coach.birthdate("");
        coach.role("");
        displayButtonAdd(true);
        displayButtonSave(false);
    };

    const putDataCoachInForm = (selectedCoach) => {
        coach.id(selectedCoach.id);
        coach.name(selectedCoach.name);
        coach.surname(selectedCoach.surname);
        coach.birthdate(selectedCoach.birthdate.replace("T00:00:00", ""));
        coach.role(selectedCoach.role);
        displayButtonAdd(false);
        displayButtonSave(true);
    };

    const removeCoach = (coach) => {
        let path = "/api/coaches/" + coach.id;

        const deleteCoach = function () {
            coaches.remove(coach);
            if (coaches().length == 0) {
                hiddeTableButtonCoach([]);
            }
        };
        
        httpAjax.delete(path, deleteCoach);
    };

    const createUpdateCoach = () => {
        if (coach.id()){
            let coachData = {
                teamId: teamId,
                id: coach.id(),
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                role: coach.role()
            };

            let path = "/api/coaches";

            const updateCoachData = (data) => {
                let indexCoach;

                for (var i = 0; i < coaches().length; i++) {
                    if (coaches()[i].id == coachData.id) {
                        indexCoach = i;
                    }
                }
                coaches.replace(coaches()[indexCoach], coachData);
                cleanFormCoach();
            };

            httpAjax.put(path, coachData, updateCoachData)

            displayButtonAdd(true);
            displayButtonSave(false);
        }      
        else {
            let newCoach = {
                teamId: teamId,
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                role: coach.role()
            };

            let path = "/api/coaches";

            const createNewCoach = (data) => {
                coaches.push(data);
                cleanFormCoach();
                hiddeTableButtonCoach.push("some value");
            };

            httpAjax.post(path, newCoach, createNewCoach);
        }
    };
 
    const goPlayersWizard = () => {
        navigateBetewnViews("/Teams/" + teamId + "/players");
    }

    const goTeamList = () => {
        navigateBetewnViews("/Teams");
    };
 
    // ViewModel
    let viewModel = {
        displayButtonAdd: displayButtonAdd,
        displayButtonSave: displayButtonSave,
        hiddeTableButtonCoach: hiddeTableButtonCoach,
        coaches: coaches,
        coach: coach,
        cleanFormCoach: cleanFormCoach,
        putDataCoachInForm: putDataCoachInForm,
        removeCoach: removeCoach,
        createUpdateCoach: createUpdateCoach,
        goPlayersWizard: goPlayersWizard,
        goTeamList: goTeamList
    };

    // On initialize
    ko.applyBindings(viewModel);

    $(function () {
        console.log("Ready!!!");

        let path = "/api/teams/" + teamId + "/coaches";

        let putDatasForm = (data) => {
            if (data.length > 0) {
                coaches(data);
                hiddeTableButtonCoach.push("some value");
            }
        };

        httpAjax.get(path, putDatasForm);
    });
})();