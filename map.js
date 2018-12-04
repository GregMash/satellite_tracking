var mymap = L.map('mapid').setView([32.2, -110.9], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ21hc2g1MTAiLCJhIjoiY2pwNXdzaWVnMThjdzNxbzF2aHJheG5kMCJ9.iWmE-7lIbVg_Gt723ulbDg'
}).addTo(mymap);

var marker = L.marker([32.2, -110.9]).addTo(mymap);



$(document).on('click', '#lat-long-button', getLatLong);

function getLatLong() {
    event.preventDefault();
    let latitude = $('#lat').val().trim();
    let longitude = $('#long').val().trim();
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        console.log("Input not valid");
        console.log(longitude);
    } else {
        console.log("Input OK");
    }
    if (isNaN(latitude) || latitude < -90|| latitude > 90) {
        console.log("Input not valid");
        console.log(latitude);
    } else {
        console.log("Input OK");
    }
    mymap.panTo([latitude, longitude]);
    var marker2 = L.marker([latitude, longitude]).addTo(mymap);
};



    






/*
-180 - +180 longitude
-90 - +90 latitude
*/