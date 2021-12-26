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
    location.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp)}${currentUnit}`;
    highTemp.innerText = `${Math.round(data.main.temp_max)}${currentUnit}`;
    lowTemp.innerText = `${Math.round(data.main.temp_min)}${currentUnit}`;
    feelsLike.innerText = `${Math.round(data.main.feels_like)}${currentUnit}`;
    weatherConditionIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCondition.innerText = `${data.weather[0].main}`;
    sunrise.innerText = `${format(fromUnixTime(data.sys.sunrise), 'H:mm a')}`;
    sunset.innerText = `${format(fromUnixTime(data.sys.sunset), 'H:mm a')}`;
    humidity.innerText = `${data.main.humidity}%`;
    windspeed.innerText = `${data.wind.speed}m/s`;
  };

  const updateUnit = () => {
    temp.innerText = `${Math.round(currentWeatherData.main.temp)}${currentUnit}`;
    highTemp.innerText = `${Math.round(currentWeatherData.main.temp_max)}${currentUnit}`;
    lowTemp.innerText = `${Math.round(currentWeatherData.main.temp_min)}${currentUnit}`;
    feelsLike.innerText = `${Math.round(currentWeatherData.main.feels_like)}${currentUnit}`;
  };

  const render = (data) => {
    updateCurrentWeather(data);

    fetchPhoto(data.name).then((photoData) => {
      body.style.backgroundImage = `url(${photoData.results[Math.floor(Math.random() * 10)].urls.full})`;
    });
  };

  const changeUnit = () => {
    const dataUnit = unit.getAttribute('data-unit');

    if (dataUnit === 'celsius') {
      currentWeatherData.main.temp = ctof(currentWeatherData.main.temp);
      currentWeatherData.main.temp_max = ctof(currentWeatherData.main.temp_max);
      currentWeatherData.main.temp_min = ctof(currentWeatherData.main.temp_min);
      currentWeatherData.main.feels_like = ctof(currentWeatherData.main.feels_like);

      unit.setAttribute('data-unit', 'fahrenheit');
      currentUnit = '℉';
    } else {
      currentWeatherData.main.temp = ftoc(currentWeatherData.main.temp);
      currentWeatherData.main.temp_max = ftoc(currentWeatherData.main.temp_max);
      currentWeatherData.main.temp_min = ftoc(currentWeatherData.main.temp_min);
      currentWeatherData.main.feels_like = ftoc(currentWeatherData.main.feels_like);

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
