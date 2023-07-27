//need to parse lat/lon from an API
var lat;
var lon;
var searchCriteria;

var APIKey = "e789d2f5236e7a2b191c2767482cc90e";
var searchButton = document.getElementById('searchButton');

renderLastSearched();

//create search history
function renderLastSearched() {
    var previousSearches = window.localStorage.getItem("city");
    if (!previousSearches) {
        return;
    }
    var previousSearchesEl = document.createElement('button')

    //
    previousSearchesEl.textContent = previousSearches;

    document.getElementById('searchHistory').append(previousSearchesEl);
    // previousSearchesEl.addEventListener('click', function(event){
    //     event.preventDefault();
    //     searchCriteria = document.getElementById("previousSearches");
    //     getCity(encodeURI(searchCriteria));
    // })

}



searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    var currentWeatherContent = document.getElementById('currentWeather');
    currentWeatherContent.innerHTML = ' ';
    fiveDayForecast.innerHTML = ' ';
    searchCriteria = document.getElementById("searchInput").value;
    //showing that the search is being encoded correctly
    window.localStorage.setItem("city", searchCriteria);
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
            forecastFuture(lat, lon);

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
    var city = info.name;
    var temp = info.main.temp;
    var humidity = info.main.humidity;
    var wind = info.wind.speed;
    var icon = info.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    var unix = info.dt;
    var date = new Date(unix * 1000).toLocaleDateString();


    // create
    var titleEl = document.createElement('h3')
    var cityNameEl = document.createElement('h2');
    var tempEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var windEl = document.createElement('p');
    var iconEl = document.createElement('img');
    iconEl.setAttribute('src', iconurl)

    // add
    titleEl.textContent = "Current Weather";
    cityNameEl.textContent = city + ' ' + date
    tempEl.textContent = 'Temp: ' + temp + " Fahrenheit";
    humidityEl.textContent = 'Humidity: ' + humidity + " %";
    windEl.textContent = 'Wind Speed: ' + wind + " mph";



    // append
    document.getElementById('currentWeather').append(titleEl,cityNameEl, iconEl, tempEl, humidityEl, windEl)

}

function forecastFuture(lat, lon){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + '&units=imperial';
    
    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                console.log('Sorry, request has failed');
            }
            return response.json();

        })
        .then(function (info) {
            displayForecastFuture(info);
        });
       
  
}

function displayForecastFuture(info) {
    console.log(info);
    for (let index = 0; index < 40; index += 8) {

        var temp = info.list[0].main.temp;
        var humidity = info.list[0].main.humidity;
        var wind = info.list[0].wind.speed;
        var icon = info.list[0].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
        var unix = info.list[0].dt;
        var date = new Date(unix * 1000).toLocaleDateString();

        var cityNameEl = document.createElement('h2');
        var tempEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var windEl = document.createElement('p');
        var iconEl = document.createElement('img');
        iconEl.setAttribute('src', iconurl)
        var dateEl = document.createElement('p');

        dateEl.textContent = date;
        tempEl.textContent = 'Temp: ' + temp + " Fahrenheit";
        humidityEl.textContent = 'Humidity: ' + humidity + " %";
        windEl.textContent = 'Wind Speed: ' + wind + " mph";

        document.getElementById('fiveDayForecast').append(dateEl, iconEl, tempEl, humidityEl, windEl);


    }


}


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


