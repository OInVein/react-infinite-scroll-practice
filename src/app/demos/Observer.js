import { useRef, useCallback } from 'react';
import { useQueryNowPlaying, useToggleModal } from '../hooks';
import { Loading, MovieCard, Modal } from '../components';
import styles from './index.module.scss';

const Observer = () => {
  const {
    isLoading,
    page,
    setPage,
    isDone,
    movies,
  } = useQueryNowPlaying();
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
      if (entries[0].isIntersecting && !isDone) {
        setPage(prevPage => ++prevPage);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, isDone]);

  const renderMovies = movies.map((infos, idx) => {
    const { id, poster_path: posterPath, title } = infos;
    const isLast = idx === movies.length - 1;
    return (
      <div {...isLast && ({ ref: lastElement })} key={id}>
        <MovieCard
          title={title}
          src={posterPath}
          onClick={() => handleOnClickImg(infos)}
          onError={handleErrorImg}
        />
      </div>
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

export default Observer;
