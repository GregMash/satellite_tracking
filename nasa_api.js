// nasa api key: 0eE7Li1Q8aCDXiZkEiztZj86vUr0YP8u4byv98Mk

// Use the following site for testing APIs
// https://api.nasa.gov/index.html#getting-started


// https://sscweb.sci.gsfc.nasa.gov/WebServices/REST/json/

// https://api.nasa.gov/api.html#SSC

// https://www.n2yo.com/api/

satAPIbaseURL="https://www.n2yo.com/rest/v1/satellite";

function getAbove(observer_lat,observer_lon,observer_alt,search_radius,category_id){
    let urlAddon=`above/${observer_lat}/${observer_lon}/${observer_alt}/${search_radius}/${category_id}`;
    fullURL=`${satAPIbaseURL}/${urlAddon}`;
    return fullURL;
}

getCurrentPos