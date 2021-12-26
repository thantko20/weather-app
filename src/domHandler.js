import WeatherAPI from './weatherAPI';

const DOMHandler = (() => {
  const load = () => {
    const searchForm = document.getElementById('city-form');

    searchForm.addEventListener('submit', (e) => {
      // DO SOMETHING
      e.preventDefault();
      const keyword = searchForm.cityKeyword.value;
      // eslint-disable-next-line max-len
      WeatherAPI.fetchCurrentWeather(keyword).then((data) => {
        console.log(data.date);
      });
    });
  };

  return { load };
})();

export default DOMHandler;
