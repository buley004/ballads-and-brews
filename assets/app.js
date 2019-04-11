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
    }).then(function(response) {

      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {

        var food = $()

      }

    });

  }
