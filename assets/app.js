var eventKey = 'ZAZTJGCB3OHOQ3RBOEAC';
var eventAddress;
var eventUrl = 'https://www.eventbriteapi.com/v3/events/search/?start_date.keyword=today&token=' + eventKey;
var selectedGenres = [];


$('#submitBTN').on('click', function () {


    console.log('sup');

    //function to get subgenre ids from checkboxes and pass to eventbrite api
    event.preventDefault();
    console.log('test');

    //add checked genres to an array with eventbrite subgenres
    $.each($("input[name='genre']:checked"), function () {
        selectedGenres.push($(this).attr('data-sub'));
    });
    console.log(selectedGenres);

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

        //create divs with events
        console.log(response.events.length);

        for (let i = 0; i < response.events.length; i++) {
            
            var concertDiv = $('<div>').text(response.events[i].name.text);
            
            //add div
            $('#concerts-display').append(concertDiv);
        }
        

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
