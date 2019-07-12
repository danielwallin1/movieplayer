import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { chooseMovie } from '../movies/functions';
import { GET_MOVIES } from './queries';
import styles from './styles.scss';

const Movies = props => (
    <Query query={ GET_MOVIES }>
        {({ loading, data: { movies } }) => {
            if (loading) return "";

            return (
                <div className="movie-library">
                    <h1 className="heading">Movie Library</h1>
                    <ul className="movie-list">
                        {movies.map(movie => (
                            <div key={movie.id} className="list-item-wrapper">
                                <li id={movie.id}
                                    className="list-item"
                                    key={movie.id}
                                    onClick={event => chooseMovie(event, props)}>
                                    <img className="poster"
                                         alt="movie-thumbnail"
                                         src={`/static/images/movie${movie.id}.jpg`}/>
                                </li>
                                <span className="title">{movie.name}</span>
                            </div>
                        ))}
                    </ul>
                </div>
            )
        }}
    </Query>
);

export default connect()(Movies);