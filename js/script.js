// Event listener to get weather
document.getElementById("weatherInputs").addEventListener("submit", getWeather);

async function getWeather(event) {
 event.preventDefault();

 let city = document.getElementById("cityInput").value;
 let apiKey = "e21cda912e982512dd69f0e865044b70";
 let errorMsg = document.getElementById("errorMsg");

 errorMsg.innerHTML = "";
 document.getElementById("weatherData").style.display = "none";

 if (city == "") {
  errorMsg.textContent = "Enter in a U.S. city.";
  return;
 }

 // OpenWeatherMap API
 let url = "https://api.openweathermap.org/data/2.5/weather?q="
  + encodeURIComponent(city)
  + ",US"
  + "&appid=" + apiKey
  + "&units=imperial";

 // Get weather data
 try {
  let response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
   errorMsg.innerHTML = data.message;
   return;
  }

  document.getElementById("cityName").innerHTML = data.name;
  document.getElementById("temperature").innerHTML = "Temperature: " + Math.round(data.main.temp) + "F";
  document.getElementById("conditions").innerHTML = "Conditions: " + data.weather[0].description;
  document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
  document.getElementById("wind").innerHTML = "Wind: " + data.wind.speed + " mph";

  let temp = data.main.temp;

  if (temp < 50) {
   document.getElementById("weatherImg").src = "img/veryCold.jpg";
  }

  else if (temp < 70) {
   document.getElementById("weatherImg").src = "img/cold.jpg";
  }

  else if (temp < 85) {
   document.getElementById("weatherImg").src = "img/warm.jpg";
  }

  else {
   document.getElementById("weatherImg").src = "img/hot.jpg";
  }

  // Display results
  document.getElementById("weatherData").style.display = "block";
 }
 catch (error) {
  errorMsg.innerHTML = "Error getting weather data.";
  console.log(error);
 }
}