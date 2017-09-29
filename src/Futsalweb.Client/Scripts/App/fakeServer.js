"use strict";

const FakeServer = function() {
    var arrayCoaches = [
       {
           "id": "eb9fb3ef-e8a0-4c8f-8f13-746cc30f023c",
           "teamId": "1e346bef-3fce-4fe3-99ce-198d08bdac3f",
           "name": "Guillermo",
           "surname": "Sotorrio Sanchez",
           "birthdate": "1984-10-17T00:00:00",
           "role": "Head Coach"
       },
       {
           "id": "cdefef3a-5fa5-4474-99ab-7adbfdbe72c3",
           "teamId": "1e346bef-3fce-4fe3-99ce-198d08bdac3f",
           "name": "Christian ",
           "surname": "Melo Fuentes",
           "birthdate": "1981-01-01T00:00:00",
           "role": "Assistant Coach"
       },
       {
           "id": "ec4c777f-712b-4c19-aded-e6559e6dbfb8",
           "teamId": "1e346bef-3fce-4fe3-99ce-198d08bdac3f",
           "name": "Mattias",
           "surname": "Rölling-Hallongren",
           "birthdate": "1981-01-01T00:00:00",
           "role": "Assistant Coach"
       }
    ]

    function createguid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    this.get = (callback) => {
        callback(arrayCoaches);
    };

    this.post = (object, callback) => {
        let id = createguid();
        object.id = id;

        callback(object);
        console.log(arrayCoaches);
    };

    this.put = (object, callback) => {
        for (var i = 0; i < arrayCoaches.length; i++) {
            if (arrayCoaches[i].id == object.id) {
                arrayCoaches[i] = object;
            }
        }

        callback(object);
    };

    this.delete = (callback) => {
        callback();
    };
};