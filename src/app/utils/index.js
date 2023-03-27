const { REACT_APP_API_KEY } = process.env;

const genImagePath = (path) => `https://image.tmdb.org/t/p/w300/${path}`;

const genRequestUrl = (page) =>
  `https://api.themoviedb.org/3/movie/now_playing?api_key=${REACT_APP_API_KEY}&language=zh-TW&page=${page}`;

export { genImagePath, genRequestUrl };
