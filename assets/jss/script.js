//need to parse lat/lon from an API
var lat;
var lon;
var searchCriteria;

var APIKey = "e789d2f5236e7a2b191c2767482cc90e";
var searchButton = document.getElementById('searchButton');



searchButton.addEventListener('click', function(event){
    event.preventDefault();
    searchCriteria = document.getElementById("searchInput").value; 
    //showing that the search is being encoded correctly
    
    getCity(encodeURI(searchCriteria));
});


//need to get city info in order to find lat/lon variables that can be used in another function to call on city info
function getCity(city) {
    
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                console.log('Sorry, request has failed');
            }
            return response.json();
       })  
       .then(function(data){
        console.log(data);
       });
       
//can't get api info to show in console 

       
     

}

// function currentWeather(){

// }

// function forecastFuture(){

// }


//







// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// lat/lon api variable "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
