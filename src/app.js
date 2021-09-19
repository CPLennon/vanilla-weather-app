function displayWeather(response) {
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

let apiKey = "b5a777ab71fc602967504eb64daf1657";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
