"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
    let protocolHost = new SaveUrl();


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
    const cleanFormCoach = function () {
        coach.id("");
        coach.name("");
        coach.surname("");
        coach.birthdate("");
        coach.role("");
        displayButtonAdd(true);
        displayButtonSave(false);
    };

    const putDataCoachInForm = function (selectedCoach) {
        coach.id(selectedCoach.id);
        coach.name(selectedCoach.name);
        coach.surname(selectedCoach.surname);
        coach.birthdate(selectedCoach.birthdate.replace("T00:00:00", ""));
        coach.role(selectedCoach.role);
        displayButtonAdd(false);
        displayButtonSave(true);
    };

    const removeCoach = function (coach, event) {
        $.ajax({
            url: protocolHost.url + "/api/coaches/" + coach.id,
            method: "DELETE"
        }).done(function () {
            coaches.remove(coach);
            if (coaches().length == 0) {
                hiddeTableButtonCoach([]);
            }
        });
    };

    const createUpdateCoach = function () {
        let coachId = coach.id();

        if (!coachId){
            let newCoach = {
                teamId: teamId,
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                role: coach.role()
            };

            $.post(protocolHost.url + "/api/coaches", newCoach).done(function (data) {
                coaches.push(data);
                cleanFormCoach();
                hiddeTableButtonCoach.push("some value");
            });
        }      
        else {
            let coachData = {
                teamId: teamId,
                id: coach.id(),
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                role: coach.role()
            };

            $.ajax({
                type: "PUT",
                url: protocolHost.url + "/api/coaches",
                contentType: "application/json",
                data: JSON.stringify(coachData)
            }).done(function () {

                let indexCoach;

                for (var i = 0; i < coaches().length; i++) {
                    if (coaches()[i].id == coachData.id) {
                        indexCoach = i;
                    }
                }

                coaches.replace(coaches()[indexCoach], coachData);
                cleanFormCoach();
            });
            displayButtonAdd(true);
            displayButtonSave(false);
        }
    };
 
    const goPlayersWizard = function () {
        window.location.href = protocolHost.url + "/teams/" + teamId + "/players";
    }

    const goTeamList = function () {
        window.location.href = protocolHost.url;
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
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);

        const callGetAjax = function () {
            let path = teamId + "/coaches";
            let putDatasForm = function (data) {
                if (data.length > 0) {
                    coaches(data);
                    hiddeTableButtonCoach.push("some value");
                };
            }
            new GetAjax(path, putDatasForm);
        }();
      
    });
})();

//$.get(protocolHost.url + "/api/teams/" + teamId + "/coaches", function (data) {
//    if (data.length > 0) {
//        coaches(data);
//        hiddeTableButtonCoach.push("some value");
//    }
//});