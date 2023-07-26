//need to parse lat/lon from an API
var lat;
var lon;
var searchCriteria;

var APIKey = "e789d2f5236e7a2b191c2767482cc90e";
var searchButton = document.getElementById('searchButton');



searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    searchCriteria = document.getElementById("searchInput").value;
    //showing that the search is being encoded correctly

    getCity(encodeURI(searchCriteria));

});

//API search city to get lat/lon
function getCity(city) {

    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                console.log('Sorry, request has failed');
            }
            return response.json();

        })
        .then(function (data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            currentWeather(lat, lon);

        });

}
//API to use lat/lon from previous API to get weather information
function currentWeather(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + '&units=imperial';

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                console.log('Sorry, request has failed');
            }
            return response.json();

        })
        .then(function (data) {
            displayCurrentWeather(data);
        });

   

}

function displayCurrentWeather(info) {
    console.log(info);
    var city = info.name
    var temp = info.main.temp;
    var humidity = info.main.humidity;
    var wind = info.wind.speed;
    var icon = info.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    var unix = info.dt;
    var date = new Date(unix * 1000).toLocaleDateString();


    // create
    var cityNameEl = document.createElement('h2');
    var tempEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var windEl = document.createElement('p');
    var iconEl = document.createElement('img');
   iconEl.setAttribute('src', iconurl)

    // add
    cityNameEl.textContent = city + ' ' + date
    tempEl.textContent = 'Temp: ' +  temp;
    humidityEl.textContent = humidity;
    windEl.textContent = wind;



    // append
    document.getElementById('currentWeather').append(cityNameEl, iconEl, tempEl, humidityEl, windEl)




}

// function forecastFuture(){}



// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



