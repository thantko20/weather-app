import { format, fromUnixTime } from 'date-fns';
import { fetchCurrentWeather } from './weatherAPI';
import { ctof, ftoc } from './unitConverter';
import { fetchPhoto } from './unplashAPI';

const DOMHandler = (() => {
  let currentWeatherData = {};
  let currentUnit = '°C';

  const { body } = document;
  const searchForm = document.getElementById('city-form');
  const unit = document.querySelector('.units button');

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

  const updateCurrentWeather = (data) => {
    location.innerText = data.location;
    temp.innerText = `${data.temp}${currentUnit}`;
    highTemp.innerText = `${data.temp_max}${currentUnit}`;
    lowTemp.innerText = `${data.temp_min}${currentUnit}`;
    feelsLike.innerText = `${data.feelsLike}${currentUnit}`;
    weatherConditionIcon.src = data.weatherConditionIcon;
    weatherCondition.innerText = data.weatherCondition;
    sunrise.innerText = data.sunrise;
    sunset.innerText = data.sunset;
    humidity.innerText = `${data.humidity}%`;
    windspeed.innerText = `${data.windspeed}m/s`;
  };

  const updateUnit = () => {
    temp.innerText = `${Math.round(currentWeatherData.temp)}${currentUnit}`;
    highTemp.innerText = `${Math.round(currentWeatherData.temp_max)}${currentUnit}`;
    lowTemp.innerText = `${Math.round(currentWeatherData.temp_min)}${currentUnit}`;
    feelsLike.innerText = `${Math.round(currentWeatherData.feelsLike)}${currentUnit}`;
  };

  const render = (data) => {
    updateCurrentWeather(data);

    // fetchPhoto(data.name).then((photoData) => {
    //   body.style.backgroundImage = `url(${photoData.results[Math.floor(Math.random() * 10)].urls.full})`;
    // }).catch(() => {
    //   body.style.backgroundImage = 'url(../assets/default_bg.jpg)';
    // });
  };

  const changeUnit = () => {
    const dataUnit = unit.getAttribute('data-unit');

    if (dataUnit === 'celsius') {
      currentWeatherData.temp = ctof(currentWeatherData.temp);
      currentWeatherData.temp_max = ctof(currentWeatherData.temp_max);
      currentWeatherData.temp_min = ctof(currentWeatherData.temp_min);
      currentWeatherData.feelsLike = ctof(currentWeatherData.feelsLike);

      unit.setAttribute('data-unit', 'fahrenheit');
      currentUnit = '℉';
    } else {
      currentWeatherData.temp = ftoc(currentWeatherData.temp);
      currentWeatherData.temp_max = ftoc(currentWeatherData.temp_max);
      currentWeatherData.temp_min = ftoc(currentWeatherData.temp_min);
      currentWeatherData.feelsLike = ftoc(currentWeatherData.feelsLike);

      unit.setAttribute('data-unit', 'celsius');
      currentUnit = '°C';
    }
  };

  const load = () => {
    fetchCurrentWeather('london').then((data) => {
      currentWeatherData = data;
      render(currentWeatherData);
    }).catch(console.log);

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = searchForm.cityKeyword.value;

      fetchCurrentWeather(keyword).then((data) => {
        currentWeatherData = data;
        render(currentWeatherData);
      }).catch(alert);

      searchForm.cityKeyword.value = '';
    });

    unit.addEventListener('click', () => {
      changeUnit();
      unit.innerText = currentUnit;
      updateUnit();
    });
  };

  return { load };
})();

export default DOMHandler;
