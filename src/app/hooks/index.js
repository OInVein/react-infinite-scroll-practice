import { useState, useEffect, useRef, useCallback } from 'react';
import { genRequestUrl } from '../utils';

const useQueryNowPlaying = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getNowPlayingMovies = async () => {
      try {
        const requestUrl = genRequestUrl(page);
        const response = await fetch(requestUrl);
        const { results = [] } = await response.json();

        if (results.length === 0) {
          setIsDone(true);
        } else {
          setMovies((prevMovies) => {
            const newMovies = [...prevMovies, ...results].reduce((acc, curr) => {
              const {
                id: currId,
                title: currTitle,
                overview: currOverview,
                poster_path: posterPath,
              } = curr;

              const hasDulplicateItem = acc.some(
                ({ id, title }) => `${id}${title}` === `${currId}${currTitle}`,
              );

              if (!currOverview || !posterPath || hasDulplicateItem) {
                return acc;
              }

              acc.push(curr);
              return acc;
            }, []);

            return newMovies;
          });
        }
      } catch (error) {
        console.error('fetch error: ', error);
        setIsDone(true);
      }
      setIsLoading(false);
    };

    getNowPlayingMovies();
  }, [page]);

  return {
    isDone,
    movies,
    page,
    setPage,
    isLoading,
  };
};

const useToggleModal = () => {
  const chosenMovieImgRef = useRef();
  const [chosenMovie, setChosenMovie] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const onKeyUp = (e) => {
      if (!isOpenModal) return;

      const { keyCode } = e;
      if (keyCode !== 27) return;

      handleCloseModal();
    };

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

  const handleOnClickImg = (e, movieInfos) => {
    setIsOpenModal(true);
    setChosenMovie(movieInfos);

    const { target: focusImgElement } = e;
    focusImgElement.classList.add('img-enlarge');
    chosenMovieImgRef.current = focusImgElement;
  };

  const handleErrorImg = (e) => {
    const { currentTarget } = e;
    currentTarget.parentElement.style.display = 'none';
  };

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);

    const { current: focusImgElement } = chosenMovieImgRef;
    if (!focusImgElement) return;

    focusImgElement.classList.remove('img-enlarge');
  }, []);

  return {
    chosenMovie,
    isOpenModal,
    handleCloseModal,
    handleOnClickImg,
    handleErrorImg,
  };
};

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export { useQueryNowPlaying, useToggleModal, useOnClickOutside };
