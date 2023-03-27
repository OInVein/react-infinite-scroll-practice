import { useQueryNowPlaying, useToggleModal } from '../hooks';
import { Loading, MovieCard, Modal, Content } from '../components';

const OnScrollEvent = () => {
  const { isLoading, page, setPage, isDone, movies } = useQueryNowPlaying();
  const { isOpenModal, chosenMovie, handleCloseModal, handleOnClickImg, handleErrorImg } =
    useToggleModal();

  const onScroll = (e) => {
    const {
      currentTarget: { scrollTop, clientHeight, scrollHeight },
    } = e;

    if (isLoading || isDone || clientHeight + scrollTop < scrollHeight) return;

    setPage((prevPage) => ++prevPage);
  };

  const renderMovies = movies.map((infos) => {
    const { id, poster_path: posterPath, title } = infos;
    return (
      <MovieCard
        key={id}
        title={title}
        src={posterPath}
        onClick={(e) => handleOnClickImg(e, infos)}
        onError={handleErrorImg}
      />
    );
  });

  return (
    <Content onScroll={onScroll}>
      {renderMovies}
      {isLoading && <Loading page={page} items={movies} />}
      <Modal infos={chosenMovie} isOpen={isOpenModal} closeModal={handleCloseModal} />
    </Content>
  );
};

export default OnScrollEvent;
