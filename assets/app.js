var lat;
var long;
var latCon;
var longCon;
var restCode;
var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress;
var eventUrl = 'https://www.eventbriteapi.com/v3/events/search/?categories=103&start_date.keyword=today&expand=venue&token=' + eventKey;
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

  //empty concerts and food in case previously populated
  $('#concerts-display').empty();
  $("#card-food").empty();

  //check if location is filled out
  if (validate.isEmpty($('#location').val())) {
    console.log('empty');
    $('#error-message').text("Please fill out this field.");

    //scroll to error message
    $('html, body').animate({
      scrollTop: ($('#music-types').offset().top)
  },500);

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

      var selectButton = $('<button>').attr('data-lat', latCon).attr('data-long', longCon).text("Show me food!").addClass("choose-show").attr("href", "#section-5");

      var venue = $(`<p>${response.events[i].venue.name}</p>`);
      concertDiv.append(eventName).append(venue).append(selectButton);

      //add div
      $('#concerts-display').append(concertDiv);
      // clearing display text
      $("#displayCon").text("");

    }
  });

  //scroll to events
  $('html, body').animate({
    scrollTop: ($('#section-4').offset().top)
},500);

});

$(document).on('click', '.choose-show', function () {

  event.preventDefault();

  //empty food choices before populating
  $("#card-food").empty();
  
  //assign lat and long of chosen show
  latCon = $(this).attr('data-lat');
  longCon = $(this).attr('data-long');

  
  var queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + latCon + "&lon=" + longCon + "&radius=1000&sort=real_distance&order=asc&apikey=eb5059d5e18e77588ecf8134ad1603c4&count=8&start=1";

  // ajax call for finding restaurant code based off of lat and long
  $.ajax({
    url: queryURL,
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

    //scroll to restaurants
    $('html, body').animate({
      scrollTop: ($('#section-5').offset().top)
  },500);

    // });
  });
})

//prevent page reload on form submit
$('#music-types').submit(function () {
  event.preventDefault();
});