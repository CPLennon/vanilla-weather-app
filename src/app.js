function displayTemperature(response) {
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "b5a777ab71fc602967504eb64daf1657";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
