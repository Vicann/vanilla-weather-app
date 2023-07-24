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

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", performSubmit);

/*
let now = new Date();
formateDate(now);

function formateDate(currentDate) {
  let time = document.querySelector("#date");
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekdays[now.getDay()];
  let currentHour = now.getHours();
  let currentMin = now.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  time.innerHTML = `${currentDay} ${currentHour}:${currentMin}`;
}

function getInfo(event) {
  event.preventDefault();
  let textInput = document.querySelector("#citySearch");
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${textInput.value}&appid=${apiKey}&units=metric`;

  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let wind = response.data.wind.speed;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].main;
  let tempVal = document.querySelector("#temperature");
  let windVal = document.querySelector("#wind");
  let humidityVal = document.querySelector("#humidity");
  let cityName = document.querySelector(".city");
  let placeHolder = document.querySelector("#weather-description");
  tempVal.innerHTML = temp;
  windVal.innerHTML = `Wind: ${wind} km/h`;
  humidityVal.innerHTML = `Humidity: ${humidity}%`;
  cityName.innerHTML = response.data.name;
  placeHolder.innerHTML = description;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", getInfo);

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
