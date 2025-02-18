window.addEventListener("DOMContentLoaded", () => {
  var searchInputValue = window.localStorage
    .getItem("searchInputValue")
    .trim()
    .replace(",", "");
  //   console.log(searchInputValue);
  var options = JSON.parse(window.localStorage.getItem("options"));
  //   console.log(options);
  var geoDBURL =
    "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=" +
    searchInputValue +
    "&minPopulation=1000000&limit=10";
  //   console.log(geoDBURL);

  // assign location-title to a variable and append the inputted location
  var locationTitle = document.getElementById("location-title");
  locationTitle.append(searchInputValue);

  fetch(geoDBURL, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //   console.log(data.data[0]);

      var lat = data.data[0].latitude;
      var lng = data.data[0].longitude;

      // Build URL to query sunrisesunset API using the obtained latitude and longitude
      var sunriseSunsetURL = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`;

      // Create fetch call for the sunrisesunset API query
      fetch(sunriseSunsetURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var sunrise = data.results.sunrise;
          var sunset = data.results.sunset;
          var goldenHour = data.results.golden_hour;
          var timezone = data.results.timezone;

          // Update HTML elements with fetched data
          document.getElementById("sunrise").textContent = sunrise;
          document.getElementById("sunset").textContent = sunset;
          document.getElementById("golden-hour").textContent = goldenHour;
          document.getElementById("timezone").textContent = timezone;

          //   locationTitle.textContent = 'hello'
        })
        .catch(function (error) {
          console.error("Error fetching sunrise-sunset data:", error);
        });
    });
});
