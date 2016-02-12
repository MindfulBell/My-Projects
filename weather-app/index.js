//Practice using weather API and some control flow to change the background based on what API returns for weather

var locationAPI = "http://ip-api.com/json";
var temp, tempVal, description;

$(document).ready(function() {    
    // get the users location and store it for use
  $.getJSON(locationAPI, function(json) {    
    $('#location').text(json.city + ", " + json.country);
    
    var city = json.city;
    var countryCode = json.countryCode.toLowerCase();
    
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + countryCode + "&APPID=683bb2b908253299b072b42b93c6724b&units=imperial";    // get weather for location using variables above
    
    $.getJSON(weatherAPI, function(result){
      
      // main weather called description, capitalize it
      description = (result.weather[0].description).charAt(0).toUpperCase() + (result.weather[0].description).slice(1);
      
      //change background based on description
      if (description.toLowerCase().indexOf('rain') !== -1) {
        $('body').css('background-image', "url('https://upload.wikimedia.org/wikipedia/commons/a/a3/Rain_droplets.jpg')");
      }      
      else if (description.toLowerCase().indexOf('haze') !== -1) {
        $('body').css('background-image', "url('http://imagine.pics/images/900/90061.jpg')");
      }
      else if (description.toLowerCase().indexOf('mist') !== -1) {
        $('body').css('background-image', "url('http://imagine.pics/images/900/90061.jpg')");
      }
      else if (description.toLowerCase().indexOf('cloud') !== -1) {
       $('body').css('background-image', "url('https://static.pexels.com/photos/2381/sky-clouds-cloudy-weather.jpg')");
      }
      else if (description.toLowerCase().indexOf('snow') !== -1) {
       $('body').css('background-image', "url('https://static.pexels.com/photos/5313/cold-snow-nature-forest.jpg')");
      }
      else {
        $('body').css('background-image', "url('http://7-themes.com/data_images/out/61/6979244-summer-sunshine.jpg')");
      }      
   
      // set weather to value of description, round the temperature, temp variable used for if/else later
      temp = "F";
      tempVal = Math.round(result.main["temp"]);
        $('#weather').text(tempVal + " Degrees F, " + description); 
      
      // get the weather icon picture, send it to proper div
      $('#weather-img').html("<img src=" + "'https://openweathermap.org/img/w/" + (result.weather[0].icon) + ".png'>");
      
      //get the wind speed, send to proper div
      $("#wind").text("Wind Speed: " + Math.round(result.wind["speed"]) + " MPH");       
      });    
  });
  
  // temperature change celsius to fahrenheit button
  $("#temp-button").click(function(){
    if (temp === "F"){
      tempVal = Math.round((tempVal - 32) * (5/9));
      $('#weather').text(tempVal + " Degrees C, " + description);      
      temp = "C"; 
    }
    else {
      tempVal = Math.round((tempVal*(9/5)) + 32);
      $('#weather').text(tempVal + " Degrees F, " + description);
      temp = "F";      
    }
  });
});