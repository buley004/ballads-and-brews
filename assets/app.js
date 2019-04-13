var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress;
var eventUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=' + eventKey;
var selectedGenres = [];

$(document).ready(function () {
    $.ajax({
        url: eventUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(response.subcategories[0]);
        for (let i = 0; i < response.subcategories.length; i++) {
            if (response.subcategories[i].parent_category.id == 103)
                console.log(response.subcategories[i].name + " " + response.subcategories[i].id);
        }
    });
});

//function to get subgenre ids from checkboxes and pass to eventbrite api
$('#music-types').submit(function () {
    event.preventDefault();
    
    //add checked genres to an array with eventbrite subgenres
    $.each($("input[name='genre']:checked"), function () {
        selectedGenres.push($(this).attr('data-sub'));
    });
    console.log(selectedGenres);

    //combine array into a string and add to API query URL
    var subIds = selectedGenres.join();
    console.log(subIds);

    console.log(eventUrl + '&subcategories=' + subIds);

    var location = $('#location').val();

    var testUrl = eventUrl + '&subcategories=' + subIds + '&location.address=' + location;

    console.log(testUrl);

    $.ajax({
        url: testUrl,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        
    })
    
    
    

});

function restaurantDisplay() {

    // grabbing city user types in
    var city = $("#location").val().trim();
    console.log(city);

    var APIKey = eb5059d5e18e77588ecf8134ad1603c4;

    var queryURL = "https://www.zomato.com/?=city_name" + city + "&apikey=" + APIKey;

    // Creates AJAX call for the specific city
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results);

    });

}
