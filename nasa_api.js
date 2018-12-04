// nasa api key: 0eE7Li1Q8aCDXiZkEiztZj86vUr0YP8u4byv98Mk
// Use the following site for testing APIs
// https://api.nasa.gov/index.html#getting-started
// https://sscweb.sci.gsfc.nasa.gov/WebServices/REST/json/
// https://api.nasa.gov/api.html#SSC

// for testing with node.js
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     var $ = require("jquery")(window);
// });

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

// https://www.n2yo.com/api/


let DEBUG = true;

satAPIbaseURL = "https://www.n2yo.com/rest/v1/satellite";
apiKey = "YF4AW4-297NVD-YXBUEQ-3X95";

function getAbove(observer_lat, observer_lon, observer_alt, search_radius, category_id) {
    let urlAddon = `above/${observer_lat}/${observer_lon}/${observer_alt}/${search_radius}/${category_id}&apiKey=${apiKey}`;
    queryURL = `${satAPIbaseURL}/${urlAddon}`;
    if (DEBUG) console.log("queryURL: " + queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (returnObj) {
        if (DEBUG) console.log(returnObj);
    });

}
loc = {
    lat: 32.253460,
    lon: -110.911789,
    alt: 743,
    radius: 90,
    category_id: 0
}

objsAbove = getAbove(loc.lat, loc.lon, loc.alt, loc.radius, loc.category_id);