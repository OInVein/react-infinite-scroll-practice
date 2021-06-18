import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import { useQueryNowPlaying, useToggleModal } from '../hooks';
import { Loading, MovieCard, Modal } from '../components';
import styles from './index.module.scss';

const Observer = ({ apiKey }) => {
  const {
    isLoading,
    page,
    setPage,
    isDone,
    movies,
  } = useQueryNowPlaying(apiKey);
  const {
    isOpenModal,
    chosenMovie,
    handleCloseModal,
    handleOnClickImg,
    handleErrorImg,
  } = useToggleModal();
  const observer = useRef();

  const lastElement = useCallback((node) => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || isDone) return;

      setPage(prevPage => ++prevPage);
    });

    if (node) observer.current.observe(node);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isDone]);

  const renderMovies = movies.map((infos, idx) => {
    const { id, poster_path: posterPath, title } = infos;
    const isLast = idx === movies.length - 1;
    return (
      <MovieCard
        key={id}
        {...isLast && ({ ref: lastElement })}
        title={title}
        src={posterPath}
        onClick={() => handleOnClickImg(infos)}
        onError={handleErrorImg}
      />
    );
  });

  return (
    <section className={styles.content}>
      {renderMovies}
      {isLoading && <Loading page={page} items={movies} />}
      <Modal
        infos={chosenMovie}
        isOpen={isOpenModal}
        closeModal={handleCloseModal}
      />
    </section>
  );
};

Observer.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default Observer;
