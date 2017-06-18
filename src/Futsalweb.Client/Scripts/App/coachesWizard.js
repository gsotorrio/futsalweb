"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
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
    };

    const putDataCoachInForm = function (selectedCoach) {
        $.get("http://localhost:5159/api/coaches/" + selectedCoach.id, function (data) {
            console.log(data);

            coach.id(data.id);
            coach.name(data.name);
            coach.surname(data.surname);
            coach.birthdate(data.birthdate);
            coach.role(data.role);
        });
    };

    const removeCoach = function (coach, event) {
        $.ajax({
            url: "http://localhost:5159/api/coaches/" + coach.id,
            method: "DELETE"
        }).done(function () {
            coaches.remove(coaches);
        });
    };

    const createCoach = function () {
        let coachId = coach.id();

        if (!coachId){
            let newCoach = {
                teamId: teamId,
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                role: coach.role()
            };

            $.post("http://localhost:5159/api/coaches", newCoach).done(function (data) {

                coaches.push(data);
                cleanFormCoach();
            });
        }
        
        else {
            let coachData = {
                teamId: teamId,
                id: coach.id(),
                name: coach.name(),
                surname: coach.surname(),
                birthdate: coach.birthdate(),
                status: coach.role()
            };

            $.ajax({
                type: "PUT",
                url: "http://localhost:5159/api/coaches",
                contentType: "application/json",
                data: JSON.stringify(coachData)
            }).done(function () {

                let indexcoach;

                for (var i = 0; i < coaches().length; i++) {
                    if (coaches()[i].id == coachData.id) {
                        indexCoach = i;
                    }
                }

                coaches.replace(coaches()[indexcoach], coachData);

                cleanFormCoach();
            });
        }
    };
 
    const goTeamList = function () {
        window.location.href = "http://localhost:5159";
    };
 
    // ViewModel
    let viewModel = {
        coaches: coaches,
        coach: coach,
        cleanFormCoach: cleanFormCoach,
        putDataCoachInForm: putDataCoachInForm,
        removeCoach: removeCoach,
        createCoach: createCoach,
        goTeamList: goTeamList
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();