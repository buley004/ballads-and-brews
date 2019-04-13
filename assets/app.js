var lat;
var long;
var restCode;
var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress;
var eventUrl = 'https://www.eventbriteapi.com/v3/events/search/?start_date.keyword=today&expand=venue&token=' + eventKey;
var selectedGenres = [];

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

$('#submitBTN').on('click', function () {

  console.log('sup');

  //function to get subgenre ids from checkboxes and pass to eventbrite api
  event.preventDefault();

  //add checked genres to an array with eventbrite subgenres
  $.each($("input[name='genre']:checked"), function () {
    selectedGenres.push($(this).attr('data-sub'));
  });

  //combine array into a string and add to API query URL
  var subIds = selectedGenres.join();

  //retrieve location and pass loc and genres to eventbrite api
  var location = $('#location').val();
  var testUrl = eventUrl + '&subcategories=' + subIds + '&location.address=' + location;

  //eventbrite api call
  $.ajax({
    url: testUrl,
    method: 'GET'
  }).then(function (response) {

    for (let i = 0; i < response.events.length; i++) {

      var concertDiv = $('<div>');
      var eventName = $('<div>')
      var eventA = $(`<a href="${response.events[i].url}">${response.events[i].name.text}</a>`)
      eventName.append(eventA)

      var venue = $(`<p>${response.events[i].venue.name}</p>`)
      concertDiv.append(eventName).append(venue);

      //add div
      $('#concerts-display').append(concertDiv);
      // clearing display text
      $("#displayCon").text("");
    }
  })
});


// when clicking submit picture, run this API call
$("#submitBTN").on("click", function () {

  event.preventDefault();

  // grabbing city user types in
  var city = $("#location").val().trim();

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

    // grabbing longitude for city
    long = response.location_suggestions[0].longitude;

    var queryURL2 = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + long + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

    // ajax call for finding restaurant code based off of lat and long
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {

      console.log(response);

      for (var i = 0; i < response.restaurants.length; i++) {

        var foodDiv = $('<div>');
        var rest = $('<div>')
        var restA = $(`<a href="${response.restaurants[i].restaurant.menu_url}">${response.restaurants[i].restaurant.name}</a>`)
        rest.append(restA)

        var restaurantA = $(`<p>${response.restaurants[i].restaurant.name}</p>`)
        foodDiv.append(rest).append(restaurantA);
        $("#card-food").append(foodDiv);

        $("#displayRest").text("");
      };

    });
  });
});
