"use strict";

(function () { 
    // Variables
    const teamId = location.pathname.split('/')[2];
    let coaches = ko.observableArray();
    let hiddeTableButtonCoach = ko.observableArray([]);

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

        coach.id(selectedCoach.id);
        coach.name(selectedCoach.name);
        coach.surname(selectedCoach.surname);
        coach.birthdate(selectedCoach.birthdate.replace("T00:00:00", ""));
        coach.role(selectedCoach.role);
    };

    const removeCoach = function (coach, event) {
        $.ajax({
            url: "http://localhost:5159/api/coaches/" + coach.id,
            method: "DELETE"
        }).done(function () {
            coaches.remove(coach);
            if (coaches().length == 0) {
                hiddeTableButtonCoach([]);
            }
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
                url: "http://localhost:5159/api/coaches",
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
        goTeamList: goTeamList,
        hiddeTableButtonCoach: hiddeTableButtonCoach
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();