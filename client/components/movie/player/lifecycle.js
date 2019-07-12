import {
    createPlayer,
    initEvents,
    reloadPlayer,
    handleVideo,
    handleAudio,
    updateProps
} from '../player/functions';
import { setPlayhead } from '../actions'

export const lifeCycleHooks = {
    _constructor: props => {
        lifeCycleHooks.props = props;
    },
    componentDidMount: () => {
        const { props } = lifeCycleHooks;
        const video = document.getElementById('video');
        updateProps(props, video);
        createPlayer();
        initEvents();
    },
    componentDidUpdate: prevProps => {
        const { props } = lifeCycleHooks;
        updateProps(props);
        handleVideo(prevProps);
        handleAudio(prevProps);

        if (props.src !== prevProps.src) {
            setPlayhead();
            reloadPlayer();
        }
    },
    componentWillUnmount: () => {
        reloadPlayer();
    }
};