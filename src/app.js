function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `
                
                  <div class="col-3">
                    <div class="weather-forecast-date">${days}</div>
                    <img
                      src="https://openweathermap.org/img/wn/03d@2x.png"
                      alt=""
                      width="36"
                    />
                    <div class="weather-forecast-temperatures">
                      <span class="weather-forecast-temperature-max">18°</span>
                      <span class="weather-forecast-temperature-min">12°</span>
                    </div>
                </div>`;
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/hr`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `response.data.weather[0].description`);
}

function search(city) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}
function performSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", performSubmit);

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitValue = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", showCelsiusTemp);

displayForecast();
/*

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentWind = response.data.wind.speed;
  let currentHumidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempVal = document.querySelector("#temperature");
  let windVal = document.querySelector("#wind");
  let humidityVal = document.querySelector("#humidity");
  let currentPlaceHolder = document.querySelector("#weather-description");
  let currentCityName = document.querySelector(".city");

  windVal.innerHTML = `Wind: ${currentWind} km/h`;
  humidityVal.innerHTML = `Humidity: ${currentHumidity}%`;
  tempVal.innerHTML = currentTemp;
  currentPlaceHolder.innerHTML = description;
  currentCityName = response.data.name;
}

let currentForm = document.querySelector("#current");
currentForm.addEventListener("submit", currentPosition);

navigator.geolocation.getCurrentPosition(currentPosition);
*/
