import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { GET_MOVIE } from './queries';
import Player from './player';
import Controls from './controls';
import styles from './styles.scss';

const Movie = props => {
    const { pathname } = props.location;
    const id = pathname.split('/').pop().toString();

    function goHome() {
        props.history.push('/');
    }

    function swapMovie(movie, direction) {
        const idUpdater = direction === 'left' ? -1 : +1;
        let newId = parseInt(movie.id) + idUpdater;
        newId = direction === 'left'
            ? newId === 0 ? 9 : newId
            : newId > 9 ? 1 : newId;

        props.history.push(`/movie/${newId}`);
    }

    return (
        <Query query={ GET_MOVIE } variables={{ id }}>
            {({ loading, data: { movie } }) => {
                if (loading) return "";

                return (
                    <Fragment>
                        <span onClick={goHome} className="home">
                            <i className="fas fa-home"/>
                        </span>
                        <div className="movie-wrapper">
                            <span
                                id="left"
                                onClick={() => swapMovie(movie, 'left')}
                                className="toggle-left">
                                &#9001;
                            </span>
                            <h1 className="heading">{movie.name}</h1>
                            <Player
                                movieId={movie.id}
                                movieName={movie.name}
                                src={movie.manifest}/>
                            <Controls />
                            <span
                                id="right"
                                onClick={() => swapMovie(movie, 'right')}
                                className="toggle-right">
                                &#9001;
                            </span>
                        </div>
                    </Fragment>
                );
            }}
        </Query>
    );
};

const mapStateToProps = (state) => ({
    movie: state.apollo,
});

export default connect(mapStateToProps)(Movie);