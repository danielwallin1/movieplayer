import { handleActions } from 'redux-actions';

export default handleActions({
    PLAY: (state, action) => ({
        ...state,
        play: action.payload,
        stop: false
    }),
    STOP: (state) => ({
        ...state,
        stop: true,
        play: false
    }),
    AUDIO: (state, action) => ({
        ...state,
        audio: action.payload
    }),
    VOLUME: (state, action) => ({
        ...state,
        volume: action.payload
    }),
    PROGRESS: (state, action) => ({
        ...state,
        progress: action.payload
    }),
    TIME: (state, action) => ({
        ...state,
        currentTime: action.payload
    }),
    DURATION: (state, action) => ({
        ...state,
        duration: action.payload
    }),
    PLAYHEAD: (state, action) => ({
        ...state,
        playhead: !state.playhead
    }),
}, {
    play: false,
    stop: false,
    audio: true,
    volume: 0.5,
    progress: 0,
    duration: 0,
    currentTime: 0,
    playhead: false
});