import { setProgress, setPlayhead, setTime} from '../actions';

let props = null;

export const updateProps = _props => {
    props = _props;
};

export const createEventListener = (progressBar) => {
    const { dispatch } = props;
    progressBar.addEventListener('click', (event) => {
        const playPercent = event.offsetX / event.target.offsetWidth;
        const playProgress = Math.floor(playPercent * 100);
        dispatch(setTime(playPercent * props.duration));
        dispatch(setProgress(playProgress));
        dispatch(setPlayhead())
    });
};