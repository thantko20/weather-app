import { fetchCurrentWeather } from './weatherAPI';
import { ctof, ftoc } from './unitConverter';
import { fetchPhoto } from './unplashAPI';

const DOMHandler = (() => {
  let currentWeatherData = {};

  const { body } = document;
  const searchForm = document.getElementById('city-form');
  const changeUnitBtn = document.querySelector('.unit');

  const location = document.getElementById('location');
  const temp = document.getElementById('temp');
  const weatherConditionIcon = document.querySelector('.weather-condition-icon');
  const weatherCondition = document.getElementById('weather-condition');
  const highTemp = document.getElementById('high');
  const lowTemp = document.getElementById('low');
  const feelsLike = document.getElementById('feels-like');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const humidity = document.getElementById('humidity');
  const windspeed = document.getElementById('windspeed');

  const updateCurrentWeather = () => {
    location.innerText = currentWeatherData.location;
    temp.innerText = `${Math.round(currentWeatherData.temp)}${currentWeatherData.temp_unit}`;
    highTemp.innerText = `${Math.round(currentWeatherData.temp_max)}${currentWeatherData.temp_unit}`;
    lowTemp.innerText = `${Math.round(currentWeatherData.temp_min)}${currentWeatherData.temp_unit}`;
    feelsLike.innerText = `${Math.round(currentWeatherData.feelsLike)}${currentWeatherData.temp_unit}`;
    weatherConditionIcon.src = currentWeatherData.weatherConditionIcon;
    weatherCondition.innerText = currentWeatherData.weatherCondition;
    sunrise.innerText = currentWeatherData.sunrise;
    sunset.innerText = currentWeatherData.sunset;
    humidity.innerText = `${currentWeatherData.humidity}%`;
    windspeed.innerText = `${currentWeatherData.windspeed}m/s`;
  };

  const render = () => {
    updateCurrentWeather();

    fetchPhoto(currentWeatherData.cityName).then((photoData) => {
      body.style.backgroundImage = `url(${photoData.results[Math.floor(Math.random() * 10)].urls.full})`;
    }).catch(() => {
      body.style.backgroundImage = 'url(../assets/default_bg.jpg)';
    });
  };

  const changeUnit = () => {
    const symbol = changeUnitBtn.getAttribute('data-current-unit');
    if (symbol === '°C') {
      currentWeatherData.temp = ctof(currentWeatherData.temp);
      currentWeatherData.temp_max = ctof(currentWeatherData.temp_max);
      currentWeatherData.temp_min = ctof(currentWeatherData.temp_min);
      currentWeatherData.feelsLike = ctof(currentWeatherData.feelsLike);

      currentWeatherData.temp_unit = '℉';
      changeUnitBtn.setAttribute('data-current-unit', '℉');
    } else {
      currentWeatherData.temp = ftoc(currentWeatherData.temp);
      currentWeatherData.temp_max = ftoc(currentWeatherData.temp_max);
      currentWeatherData.temp_min = ftoc(currentWeatherData.temp_min);
      currentWeatherData.feelsLike = ftoc(currentWeatherData.feelsLike);

      currentWeatherData.temp_unit = '°C';
      changeUnitBtn.setAttribute('data-current-unit', '°C');
    }

    updateCurrentWeather();
  };

  const handleWeatherError = () => {
    // eslint-disable-next-line no-alert
    alert('Wrong city name input or something went wrong with our servers.');
  };

  const load = () => {
    fetchCurrentWeather('london').then((data) => {
      currentWeatherData = data;
      render();
    }).catch(handleWeatherError);

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = searchForm.cityKeyword.value;

      fetchCurrentWeather(keyword).then((data) => {
        currentWeatherData = data;
        render(currentWeatherData);
      }).catch(handleWeatherError);

      searchForm.cityKeyword.value = '';
    });

    changeUnitBtn.addEventListener('click', changeUnit);
  };

  return { load };
})();

export default DOMHandler;
