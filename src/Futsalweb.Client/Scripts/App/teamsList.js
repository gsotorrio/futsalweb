"use strict";

const addNewTeam = (team) => {
    $("#tableTeams tr:last").after("<tr> <td>"
        + team.teamId + 
        "</td><td>" 
        + team.teamName + 
        "</td><td>" 
        + team.teamCategory + 
        "</td><td>"
        + "<a href='#' class='edit'>Edit</a>" +
        "</td><td>"
        + "<a href='#' c;lass='update'>Update</a>" +
        "</td><td>"
        + "<a href='#' class='delete'>Delete</a>" +
        "</td></tr>")
}

const linkEventClickDelete = () => {
    $(".delete").click(function (event) {
        let trTeam = event.target.parentElement.parentElement;

        $.ajax({
            url: "http://localhost:5159/",
            methiod: "DELETE"
        }).done(function (){
            $().remove();
        });
    });
}
// add something for ask you if you are sure.


const linkEventClickUpdate = () => {
    $(".update").click(function (event) {
        let trPlayer = event.target.parentElement.parentElement;
        
        $.get("http://localhost:5159/", function (team) {

            $("#teamName").val(team.teamName);
            $("teamCategory").val(team.teamCategory);
        });
    });
}





