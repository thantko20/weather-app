import { fetchCurrentWeather } from './weatherAPI';

const DOMHandler = (() => {
  const load = () => {
    const searchForm = document.getElementById('city-form');

    searchForm.addEventListener('submit', (e) => {
      // DO SOMETHING
      e.preventDefault();
      const keyword = searchForm.cityKeyword.value;
      // eslint-disable-next-line max-len
      fetchCurrentWeather(keyword).then((data) => {
        // We need to do something here
      });
    });
  };

  return { load };
})();

export default DOMHandler;
