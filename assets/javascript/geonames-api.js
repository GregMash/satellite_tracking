$("button").on("click", function () {
    var input = $("#inputCity").val().trim();
    console.log(input);
    var queryURL = "http://api.geonames.org/searchJSON?style=full&maxRows=12&name_startsWith=" + input + "&username=agoldsher";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.geonames[0].lat);
        console.log(response.geonames[0].lng);
    });
})


