export const chooseMovie = (event, props) => {
    const movieId = event.currentTarget.id;
    props.history.push(`/movie/${movieId}`);
};