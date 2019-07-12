import { createEventListener, updateProps } from './functions';

export const lifeCycleHooks = {
    _constructor: props => {
        lifeCycleHooks.props = props;
    },
    componentDidMount: () => {
        const { props } = lifeCycleHooks;
        const progressBar = document.getElementById('progressBar');
        updateProps(props);
        createEventListener(progressBar);
    },
    componentDidUpdate: () => {
        const { props } = lifeCycleHooks;

        !props.play && props.state.playBtn === 'fa-pause' &&
            props.setState({ playBtn: 'fa-play' });

        updateProps(props);
    }
};