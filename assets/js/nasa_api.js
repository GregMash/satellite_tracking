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
        let satObjArray=returnObj.above;
        // displaySatellite(satObjArray);
    });

}

function getCurrentSatPos(satid,observer_lat, observer_lon, observer_alt) {
    seconds=1;
    let urlAddon = `positions/${satid}/${observer_lat}/${observer_lon}/${observer_alt}/${seconds}&apiKey=${apiKey}`;
    let queryURL = `${satAPIbaseURL}/${urlAddon}`;
    if (DEBUG) console.log("queryURL: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (returnObj) {
        if (DEBUG) console.log(returnObj);
        let lat=returnObj.positions[0].satlatitute;
        let lon=returnObj.positions[0].satlongitude;

        // displaySatellite(satObjArray);
    });

}

function buttonClick(){
    loc = {
        lat: 32.253460,
        lon: -110.911789,
        alt: 743,
        radius: 90,
        category_id: 26
    }
    objsAbove = getAbove(loc.lat, loc.lon, loc.alt, loc.radius, loc.category_id);
    
}
$(document).on("click","#testbutton",buttonClick);
