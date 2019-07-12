import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { routerReducer } from 'react-router-redux';
import playerReducer from './components/movie/reducers';
import MovieList from './components/movies';
import Movie from './components/movie';
import styles from './styles.scss';

const history = createBrowserHistory();
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store =
    createStore(combineReducers({
        apollo: apolloReducer,
        routing: routerReducer,
        player: playerReducer,
    }), compose(composeEnhancers(applyMiddleware(thunkMiddleware)))
);

const cache = new ReduxCache({ store });

const client = new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache
});

ReactDOM.render(
    <ApolloProvider client={client} store={store}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={MovieList} />
                    <Route exact path="/movie/:id" component={Movie} />
                </Switch>
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('app')
);