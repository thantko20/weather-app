import { format, fromUnixTime } from 'date-fns';
import { fetchCurrentWeather } from './weatherAPI';

const DOMHandler = (() => {
  let currentWeatherData = {};

  const searchForm = document.getElementById('city-form');
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
    console.log(data);
    location.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    highTemp.innerText = `${Math.round(data.main.temp_max)}°C`;
    lowTemp.innerText = `${Math.round(data.main.temp_min)}°C`;
    feelsLike.innerText = `${Math.round(data.main.feels_like)}°C`;
    weatherConditionIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCondition.innerText = `${data.weather[0].main}`;
    sunrise.innerText = `${format(fromUnixTime(data.sys.sunrise), 'H:mm a')}`;
    sunset.innerText = `${format(fromUnixTime(data.sys.sunset), 'H:mm a')}`;
    humidity.innerText = `${data.main.humidity}%`;
    windspeed.innerText = `${data.wind.speed}m/s`;
  };

  const load = () => {
    fetchCurrentWeather('london').then((data) => {
      currentWeatherData = data;
      updateCurrentWeather(currentWeatherData);
    }).catch(alert);
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const keyword = searchForm.cityKeyword.value;

      fetchCurrentWeather(keyword).then((data) => {
        currentWeatherData = data;
        updateCurrentWeather(currentWeatherData);
      }).catch(alert);

      searchForm.cityKeyword.value = '';
    });
  };

  return { load };
})();

export default DOMHandler;
