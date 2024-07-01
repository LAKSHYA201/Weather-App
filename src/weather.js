import "./style.css";
const weatherDetailsAndHeader = document.querySelector(
  "#weatherDetailsAndHeader"
);
weatherDetailsAndHeader.classList.add("initialMainHeader");
weatherDetailsAndHeader.textContent = "Weather";
const searchBtn = document.querySelector(".search");
const searchValue = document.querySelector("input");

async function getWeather(ApiAddress) {
  const weatherJSON = await fetch(ApiAddress, { mode: "cors" });
  const weatherJSobject = await weatherJSON.json();

  return {
    tempC: weatherJSobject.current.temp_c,
    tempF: weatherJSobject.current.temp_f,
    conditionText: weatherJSobject.current.condition.text,
    conditionIcon: weatherJSobject.current.condition.icon,
    precipitation: weatherJSobject.current.precip_mm,
    humidity: weatherJSobject.current.humidity,
    windSpeed: weatherJSobject.current.wind_kph,
    city: weatherJSobject.location.name,
    region: weatherJSobject.location.region,
  };
}

function emptyWeatherDetails() {
  weatherDetailsAndHeader.innerHTML = "";
  weatherDetailsAndHeader.classList.remove("initialMainHeader");
}

function addWeatherDetailsClass() {
  weatherDetailsAndHeader.classList.add("weatherDetails");
}

function getCompleteApiAddress() {
  const partialApiAddress =
    "https://api.weatherapi.com/v1/current.json?key=a09c10eb1cfd403eae942210242806&q=";
  const CompleteApiAddress = partialApiAddress + searchValue.value;
  return CompleteApiAddress;
}

function errorHandler() {
  weatherDetailsAndHeader.classList.add("initialMainHeader");
  weatherDetailsAndHeader.textContent = "Please Enter a Valid location";
}

function repopulateDiv() {
  weatherDetailsAndHeader.innerHTML =
    '<div class="condition"></div><div class="current"></div>';
}

function populateCondition(weatherData) {
  document.querySelector(".condition").innerHTML =
    '<div class="icon"></div> <div class="temp"></div> <div class="tempToggle"></div> <div class="city"></div> <div class="conditionText"></div>';
  let icon = document.querySelector(".icon");
  let temp = document.querySelector(".temp");
  let tempToggle = document.querySelector(".tempToggle");
  let city = document.querySelector(".city");
  let conditionText = document.querySelector(".conditionText");

  icon.innerHTML = '<img src="#" class="iconImg">';
  document.querySelector(".iconImg").src =
    "https://" + weatherData.conditionIcon;

  temp.textContent = weatherData.tempC + "°C";

  let counter = "C";
  tempToggle.innerHTML = '<button class="toggleBtn">Switch</button>';
  document.querySelector(".toggleBtn").addEventListener("click", () => {
    if (counter === "C") {
      temp.textContent = weatherData.tempF + "°F";
      counter = "F";
    } else {
      temp.textContent = weatherData.tempC + "°C";
      counter = "C";
    }
  });
  city.textContent = `${weatherData.city}`;
  document.querySelector(".current").inner;
  conditionText.textContent = weatherData.conditionText;
}

function populateCurrent(weatherData) {
  document.querySelector(".current").innerHTML =
    '<div class="precipitation"></div><div class="humidity"></div><div class="windSpeed"></div>';
  const prcpt = document.querySelector(".precipitation");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".windSpeed");

  prcpt.textContent = `PRCPT : ${weatherData.precipitation}mm`;
  humidity.textContent = `Humidity : ${weatherData.humidity}%`;
  windSpeed.textContent = `WS : ${weatherData.windSpeed}km/h`;
}

searchBtn.addEventListener("click", () => {
  emptyWeatherDetails();
  addWeatherDetailsClass();
  const CompleteApiAddress = getCompleteApiAddress();

  getWeather(CompleteApiAddress)
    .then((result) => {
      console.log(result);
      repopulateDiv();
      populateCondition(result);
      populateCurrent(result);
    })
    .catch((err) => {
      errorHandler();
    });
});
