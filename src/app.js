function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = ``;
  for (let i = 0; i < forecast.length; i++) {
    let day = days[now.getDay() + i + 1];
    forecastHTML =
      forecastHTML +
      `
    <li class="nav-item">
    <p>${day}</p>
     <img
     src="images/${forecast[i + 1].weather[0].icon}.svg"
    alt="${forecast[i + 1].weather[0].description}"
     class="list-images filter-white"
     />
     <p class="week-temperature">${Math.round(forecast[i + 1].temp.day)}°</p>
     </li>
     `;
    if (i === 4) break;
  }

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b5a777ab71fc602967504eb64daf1657";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#weather-desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#main-image")
    .setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  document
    .querySelector("#main-image")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b5a777ab71fc602967504eb64daf1657";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  document.querySelector("#city").innerHTML = citySearch.value;
  searchCity(citySearch.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Auckland");
