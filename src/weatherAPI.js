import { format, fromUnixTime } from 'date-fns';

const fetchCurrentWeather = async (keyword) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=metric&appid=bd22416122b49d66de8a375dd185683d`, { mode: 'cors' });
  const data = await response.json();

  return {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    temp_max: data.main.temp_max,
    temp_min: data.main.temp_min,
    windspeed: data.wind.speed,
    country: data.sys.country,
    cityName: data.name,
    location: `${data.name}, ${data.sys.country}`,
    weatherConditionIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    weatherCondition: data.weather[0].main,
    sunrise: format(fromUnixTime(data.sys.sunrise), 'H:mm a'),
    sunset: format(fromUnixTime(data.sys.sunset), 'H:mm a'),
    temp_unit: '°C',
  };
};

// eslint-disable-next-line import/prefer-default-export
export { fetchCurrentWeather };
