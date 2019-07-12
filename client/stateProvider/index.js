import React from 'react';

export const StateProvider = (Component, initialState, lifeCycleHooks) => class extends React.Component {
    static get name() {
        return Component.name;
    }

    constructor(props) {
        super(props);
        this.state = initialState;

        Object.keys(lifeCycleHooks).forEach(
            (functionName) => {
                this[functionName] = lifeCycleHooks[functionName];
            },
        );
    }

    getParams() {
        return {
            ...this.props,
            state: this.state,
            setState: this.setState.bind(this)
        }
    }

    render() {
        if (lifeCycleHooks._constructor) {
            lifeCycleHooks._constructor(this.getParams());
        }

        return Component(this.getParams());
    }
};