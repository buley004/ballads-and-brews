var lat;
var long;
var latCon;
var longCon;
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

  //function to get subgenre ids from checkboxes and pass to eventbrite api
  event.preventDefault();

  //check if location is filled out
  if (validate.isEmpty($('#location').val())) {
    console.log('empty');
    $('#error-message').text("Please fill out this field.");
    return false;  
  }

  //remove error message text if location is filled out
  $('#error-message').text("");

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

    console.log(response);

    for (let i = 0; i < response.events.length; i++) {
      console.log('loop');
      var concertDiv = $('<div>');
      var eventName = $('<div>');
      var eventA = $(`<a href="${response.events[i].url}">${response.events[i].name.text}</a>`).addClass("conLink");
      eventName.append(eventA);
      
            latCon = response.events[i].venue.latitude;
            console.log(latCon);
            
            longCon = response.events[i].venue.longitude;
            console.log(longCon);

      var selectButton = $('<button>').attr('data-lat', latCon).attr('data-long', longCon).text("Show me food!").addClass("choose-show");

      var venue = $(`<p>${response.events[i].venue.name}</p>`).addClass("venueCon");
      concertDiv.append(eventName).append(venue).append(selectButton);

      //add div
      $('#concerts-display').append(concertDiv);
      // clearing display text
      $("#displayCon").text("");
      
    }
  })
});

$(document).on('click', '.choose-show', function(){
  console.log('sup');

  event.preventDefault();

  // grabbing city user types in
  var city = $("#location").val().trim();

  var queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

  // Creates AJAX call for the specific city
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var queryURL2 = "https://developers.zomato.com/api/v2.1/search?count=8&lat=" + latCon + "&lon=" + longCon + "&apikey=eb5059d5e18e77588ecf8134ad1603c4";

    // ajax call for finding restaurant code based off of lat and long
    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function (response) {

      console.log(response);
      

      // for loop printing link to restaurants from Zomato
      for (var i = 0; i < response.restaurants.length; i++) {

        var foodDiv = $('<div>');
        var rest = $('<div>')
        var restA = $(`<a href="${response.restaurants[i].restaurant.menu_url}">${response.restaurants[i].restaurant.name}</a>`).addClass("foodLink");
        rest.append(restA)

        // appending link to HTML
        foodDiv.append(rest);
        $("#card-food").append(foodDiv);

        // clearing HTML text
        $("#displayRest").text("");
      };

    });
  });
})

//prevent page reload on form submit
$('#music-types').submit(function(){
  event.preventDefault();
});