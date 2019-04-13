var lat;
var long;

// when clicking submit picture, run this API call
$("#submitBTN").on("click", function (event) {

  event.preventDefault();

  // grabbing city user types in
  var city = $("#location").val().trim();
  console.log(city);

  var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

  // Creates AJAX call for the specific city
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // all data for city
    console.log(response);

    // grabbing latitude for city
    lat = response.location_suggestions[0].latitude;
    console.log(lat);

    // grabbing longitude for city
    long = response.location_suggestions[0].longitude;
    console.log(long);

    var queryURL2 = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + long + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {

      console.log(response);

      //console.log();
      

      //$(".card-text-food").append(response.restaurants)


    })
  });
});





