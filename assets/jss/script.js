
var lat;
var lon;


var APIKey = "e789d2f5236e7a2b191c2767482cc90e";
var searchButton = document.getElementById('searchButton');


function getCity() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                console.log('Sorry, request has failed');
            }
            return response.json();

        });


}

searchButton.addEventListener('click', getCity);


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city