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

// Matt's solution:
//
// function formatDay(timestamp) {
// let now = new Date(timestamp * 1000);
// let day = now.getDay();
// let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//  return days[day];
//}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = ``;
  // forecast.forEach(function (forecastDay, index) {
  //  if (index < 5) {
  //   forecastHTML =
  //    forecastHTML +
  //    `
  // <li class="nav-item">
  //  <p>${formatDay(forecastDay.dt)}</p>
  //  <img
  //    src="images/${forecastDay.weather[0].icon}.svg"
  //    alt="cloud sun"
  //    class="list-images filter-white"
  //  />
  //  <p class="week-temperature">${Math.round(forecastDay.temp.day)}°</p>
  //</li>
  //`;
  // }
  //});
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

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#main-temp").innerHTML = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
}

function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#main-temp").innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

searchCity("Auckland");
