import shaka from 'shaka-player';
import {
    setTime,
    setPlay,
    setDuration,
    setProgress
} from '../actions';

let videoEl = null;
let props = null;

export const updateProps = (_props, _video) => {
      props = _props;

      if (_video) {
          videoEl = _video;
      }
};

export const initEvents = () => {
    videoEl.addEventListener('timeupdate', timeUpdate, false);
    videoEl.addEventListener('ended', reloadPlayer, false)
};

export const timeUpdate = () => {
    const  { dispatch } = props;
    const playProgress = videoEl.currentTime / videoEl.duration * 100;
    dispatch(setProgress(playProgress));
    dispatch(setTime(videoEl.currentTime));
};

export const createPlayer = () => {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
        const player = new shaka.Player(videoEl);

        props.setState({ player }, () => {
            player.load(props.src)
                .then(() => {
                    props.dispatch(setDuration(videoEl.duration));
                }).catch(onError);
        });
    }
};

export const reloadPlayer = () => {
    const  { dispatch } = props;
    dispatch(setTime(0));
    dispatch(setProgress(0));
    dispatch(setPlay(false));
    props.state.player.load(props.src)
        .then(() => {
            dispatch(setDuration(
                props.state.player.getMediaElement().duration
            ));
        });
};

export const handleAudio = prevProps => {
    if (props.volume !== prevProps.volume) {
        videoEl.volume = props.volume;
    }
    if (props.audio !== prevProps.audio) {
        videoEl.muted = !props.audio;
    }
};

export const handleVideo = prevProps => {
    if (props.play !== prevProps.play) {
        prevProps.play ? videoEl.pause() : videoEl.play();
    }
    if (props.playhead !== prevProps.playhead) {
        videoEl.currentTime = props.currentTime;
    }

    if (props.stop) {
        reloadPlayer();
    }
};

export const onError = error => {
    console.log('failed', error);
};

