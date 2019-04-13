var lat;
var long;
var restCode;
var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress = $('#exampleFormControlInput1').val();
var eventUrl = 'https://www.eventbriteapi.com/v3/subcategories/?token=' + eventKey + '&id=103&location.address=' + eventAddress;
var selectedGenres = [];

//function to get subgenre ids from checkboxes and pass to eventbrite api
$('#music-types').submit(function () {
  event.preventDefault();

  //add checked genres to an array with eventbrite subgenres
  $.each($("input[name='genre']:checked"), function () {
    selectedGenres.push($(this).attr('data-sub'));
  });
  console.log(selectedGenres);
});



// when clicking submit picture, run this API call
$("#submitBTN").on("click", function () {

  console.log("hi");

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

    // ajax call for finding restaurant code based off of lat and long
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {

      for (var i = 0; i < response.restaurants.length; i++) {

        restCode = response.restaurants[i].restaurant.R.res_id;

      };

      var queryURL3 = "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restCode + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

      // ajax call for getting restaurant name
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function (response) {

        console.log(response.name);

        //for (var j = 0; j < response.restaurants.length; j++) {

          // printing name to HTML
          $("#card-food").append(response.name);

       // };
      });
    });
  });
});
