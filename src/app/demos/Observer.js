import { useRef, useCallback } from 'react';
import { useQueryNowPlaying, useToggleModal } from '../hooks';
import { Loading, MovieCard, Modal, Content } from '../components';

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
    <Content>
      {renderMovies}
      {isLoading && <Loading page={page} items={movies} />}
      <Modal
        infos={chosenMovie}
        isOpen={isOpenModal}
        closeModal={handleCloseModal}
      />
    </Content>
  );
};

export default Observer;
