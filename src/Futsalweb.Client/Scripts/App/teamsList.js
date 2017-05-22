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

