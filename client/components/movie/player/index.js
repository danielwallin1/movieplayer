import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { StateProvider } from '../../../stateProvider';
import { lifeCycleHooks } from './lifecycle';
import styles from './styles.scss';

const player = props => {
    const poster = `/static/images/movie${props.movieId}.jpg`;

    return (
        <div className="player-wrapper">
            <video id="video"
                preload="metadata"
                width="640"
                height="480"
                poster={poster}
                className="player">
            </video>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        play: state.player.play,
        stop: state.player.stop,
        volume: state.player.volume,
        audio: state.player.audio,
        progress: state.player.progress,
        currentTime: state.player.currentTime,
        playhead: state.player.playhead,
        duration: state.player.duration
    }
}

export default withRouter(connect(mapStateToProps)(StateProvider(player, {}, lifeCycleHooks)));