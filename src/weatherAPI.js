import { fromUnixTime } from 'date-fns';

const fetchCurrentWeather = async (keyword) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=metric&appid=bd22416122b49d66de8a375dd185683d`, { mode: 'cors' });
  const data = await response.json();

  return {
    weatherCondition: data.weather.description,
    main: data.main,
    visibility: data.visibility,
    date: fromUnixTime(data.dt),
    sys: data.sys,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { fetchCurrentWeather };
