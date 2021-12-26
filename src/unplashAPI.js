const fetchPhoto = async (keyword) => {
  const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=YRvL-IO7eHUAtQy7Z1Awb9J4JvOQK9mOcuubyDjrsQs`, { mode: 'cors' });
  const data = await response.json();

  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchPhoto };
