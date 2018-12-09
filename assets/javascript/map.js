//===================================================== Map ======================================================================

let mymap = L.map('mapid').setView([39.8283, -98.5795], 4);
let markers = [];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZ21hc2g1MTAiLCJhIjoiY2pwNXdzaWVnMThjdzNxbzF2aHJheG5kMCJ9.iWmE-7lIbVg_Gt723ulbDg'
}).addTo(mymap);

//================================================== Functions ======================================================================

//this function will get the user input based on lat and lng entered and add it to the map as a bullseye
function getLatLong() {
    event.preventDefault();
    let latitude = $('#lat').val().trim();
    let longitude = $('#long').val().trim();
    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
        alert("Input not valid");
    } else if (isNaN(latitude) || latitude < -90 || latitude > 90) {
        alert("Input not valid");
    }
    else {
        var myIcon = L.icon({
            iconUrl: 'https://cdn0.iconfinder.com/data/icons/map-3/1024/location-512.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [15, 15]
        });
        L.marker([latitude, longitude], { icon: myIcon, autoPanPadding: [0, 0] }).addTo(mymap)
        mymap.panTo([latitude, longitude]);
    }   
};

//this function will add the satellites to the map based on their current position and bind their respective popus to them
function addSatellites(satellites) {
    for (let i = 0; i < markers.length; i++) {
        mymap.removeLayer(markers[i]);
    }
    markers = [];
    for (let i = 0; i < satellites.length; i++) {

        var myIcon = L.icon({
            iconUrl: 'http://pluspng.com/img-png/png-1417x723-boeing-satellite-background-1417.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [15, 15]
        });
        let marker = L.marker([satellites[i].satlat, satellites[i].satlng], { icon: myIcon, autoPanPadding: [0, 0] }).addTo(mymap)      
        markers.push(marker);
        marker.bindPopup(`<p>Name: ${satellites[i].satname}</p><p>Launch Date: ${satellites[i].launchDate}</p><p>Altitude: ${satellites[i].satalt} m</p>`).openPopup();
    }
};

// this function will user input based on the city they entered and set a bullseye to the lat and lng of the city
 function cityGrab () {
    let input = $("#inputCity").val().trim();
    console.log(input);
    const queryURL = "http://api.geonames.org/searchJSON?style=full&maxRows=12&name_startsWith=" + input + "&username=agoldsher";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var myIcon = L.icon({
            iconUrl: 'https://cdn0.iconfinder.com/data/icons/map-3/1024/location-512.png',
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [15, 15]
        });
        L.marker([response.geonames[0].lat, response.geonames[0].lng], { icon: myIcon, autoPanPadding: [0, 0] }).addTo(mymap)
        mymap.panTo([latitude, longitude]);
    });
};

//this block of functions handles the ajax API call to n2yo to obtain the satellite current positions and popup info
let DEBUG = true;

satAPIbaseURL = "https://www.n2yo.com/rest/v1/satellite";
apiKey = "YF4AW4-297NVD-YXBUEQ-3X95";

function getAbove(observer_lat, observer_lon, observer_alt, search_radius, category_id) {
    let urlAddon = `above/${observer_lat}/${observer_lon}/${observer_alt}/${search_radius}/${category_id}&apiKey=${apiKey}`;
    let queryURL = `${satAPIbaseURL}/${urlAddon}`;
    if (DEBUG) console.log("queryURL: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (returnObj) {
        if (DEBUG) console.log(returnObj);
        let satObjArray = returnObj.above;
        addSatellites(returnObj.above)
    });

};

function getCurrentSatPos(satid, observer_lat, observer_lon, observer_alt) {
    seconds = 1;
    let urlAddon = `positions/${satid}/${observer_lat}/${observer_lon}/${observer_alt}/${seconds}&apiKey=${apiKey}`;
    let queryURL = `${satAPIbaseURL}/${urlAddon}`;
    if (DEBUG) console.log("queryURL: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (returnObj) {
        if (DEBUG) console.log(returnObj);
        let lat = returnObj.positions[0].satlatitute;
        let lon = returnObj.positions[0].satlongitude;
        console.log(lat);
        console.log(lon);
    });

};

function buttonClick() {
    loc = {
        lat: 32.253460,
        lon: -110.911789,
        alt: 743,//meters
        radius: 90, //degrees
        category_id: 26
    }
    objsAbove = getAbove(loc.lat, loc.lon, loc.alt, loc.radius, loc.category_id);
};

//========================================= Main Process ======================================================================

//on load put the satellites on the map
window.onload = buttonClick;

//when the lat lng button is clicked, execute the getLatLong function
$(document).on('click', '#lat-long-button', getLatLong);

//when the button is clicked, execute the cityGrab function
$(document).on("click", 'button', cityGrab);