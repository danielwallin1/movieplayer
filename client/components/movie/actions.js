export const setPlay = (isPlaying) => (dispatch) => {
    dispatch({
        type: 'PLAY',
        payload: isPlaying
    })
};

export const setStop = () => (dispatch) => {
    dispatch({ type: 'STOP' })
};

export const setProgress = (progress) => (dispatch) => {
    progress = progress || 0;
    dispatch({
        type: 'PROGRESS',
        payload: progress
    })
};

export const setVolume = (volume) => (dispatch) => {
    dispatch({
        type: 'VOLUME',
        payload: volume
    })
};

export const setAudio = (audio) => (dispatch) => {
    dispatch({
        type: 'AUDIO',
        payload: audio
    })
};

export const setDuration = (duration) => (dispatch) => {
    dispatch({
        type: 'DURATION',
        payload: duration
    })
};

export const setTime = (currentTime) => (dispatch) => {
    dispatch({
        type: 'TIME',
        payload: currentTime
    })
};

export const setPlayhead = () => (dispatch) => {
    dispatch({ type: 'PLAYHEAD' })
};

