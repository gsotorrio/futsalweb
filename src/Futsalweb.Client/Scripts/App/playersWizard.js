"use strict";

(function () {

    // Variables
    let player = {
        id: ko.observable(),
        name: ko.observable(),
        surname: ko.observable(),
        height: ko.observable(),
        weight: ko.observable(),
        strongLeg1: ko.observable(),
        strongLeg2: ko.observable(),
        status: ko.observable()
    };

    ko.bindingHandlers.datePicker = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {                    
            // Register change callbacks to update the model
            // if the control changes.       
            ko.utils.registerEventHandler(element, "change", function () {            
                var value = valueAccessor();
                value(new Date(element.value));            
            });
        },
        // Update the control whenever the view model changes
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value =  valueAccessor();        
            element.value = value().toISOString();
        }
    };

  

    // Public Functions
    const next = function () {
        var newPlayer = {
            birthdate: MyDate(),
            name: player.name(),
            surname: player.surname(),
            height: player.height(),
            weight: player.weight(),
            strongLeg1: player.strongLeg1(),
            strongLeg2: player.strongLeg2(),
            status: player.status()
        };
        console.log(newPlayer);
    };


    // ViewModel
    let viewModel = {
        teams: teams,
        team: team,
        remove: remove,
        teamManager: teamManager,
        createTeam: createTeam,
        player: player,
        next: next,
        MyDate: ko.observable(new Date())
    };

    // On initialize
    $(function () {
        console.log("Ready!!!");
        ko.applyBindings(viewModel);
    });
})();