const genImagePath = path => `https://image.tmdb.org/t/p/w300/${path}`;

const genRequestUrl = (apiKey, page) => `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=zh-TW&page=${page}`;

export { genImagePath, genRequestUrl };