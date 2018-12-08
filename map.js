let mymap = L.map('mapid').setView([39.8283, -98.5795], 4);
let markers = [];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ21hc2g1MTAiLCJhIjoiY2pwNXdzaWVnMThjdzNxbzF2aHJheG5kMCJ9.iWmE-7lIbVg_Gt723ulbDg'
}).addTo(mymap);




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
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        console.log("Input not valid");
        console.log(latitude);
    } else {
        console.log("Input OK");
    }

    var myIcon = L.icon({
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/map-3/1024/location-512.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [15,15]
    });
    L.marker([latitude, longitude], {icon: myIcon, autoPanPadding: [0, 0]}).addTo(mymap)
    mymap.panTo([latitude, longitude]);
    //L.tooltip().bindTooltipAnchor("Selected Location").openTooltip();

};

function addSatellites(satellites) {
    for (let i = 0; i < markers.length; i++) {
        mymap.removeLayer(markers[i]);
    }
    markers = [];
    for (let i = 0; i < satellites.length; i++) {
        // if (i<markers.length){
        //     mymap.removeLayer(markers[i]);
        // }
        // console.log(satellites[i]);
        let marker = L.marker([satellites[i].satlat, satellites[i].satlng]).addTo(mymap);
        markers.push(marker);

        marker.bindPopup(`<p>Name: ${satellites[i].satname}</p><p>Launch Date: ${satellites[i].launchDate}</p><p>Altitude: ${satellites[i].satalt} m</p>`).openPopup();
        console.log(marker);
    }
    // for (i;i<markers.length;i++){
    //     mymap.removeLayer(markers[i]);

    // }


};


$(document).on('click', '#testbutton', addSatellites);




/*
grab data for lat and long within certain values
set and get from storage

get the popups to work




console.log('hello');
            console.log(satellites[i].satlat)
           
*/


