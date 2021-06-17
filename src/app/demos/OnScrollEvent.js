import PropTypes from 'prop-types';
import { useQueryNowPlaying, useToggleModal } from '../hooks';
import { Loading, MovieCard, Modal } from '../components';
import styles from './index.module.scss';

const OnScrollEvent = ({ apiKey }) => {
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

  const onScroll = (e) => {
    const {
      currentTarget: {
        scrollTop,
        clientHeight,
        scrollHeight,
      },
    } = e;

    if (
      isLoading
      || isDone
      || clientHeight + scrollTop < scrollHeight
    ) return;

    setPage(prevPage => ++prevPage);
  };

  const renderMovies = movies.map((infos) => {
    const { id, poster_path: posterPath, title } = infos;
    return (
      <MovieCard
        key={id}
        title={title}
        src={posterPath}
        onClick={() => handleOnClickImg(infos)}
        onError={handleErrorImg}
      />
    );
  });

  return (
    <section onScroll={onScroll} className={styles.content}>
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

OnScrollEvent.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default OnScrollEvent;
