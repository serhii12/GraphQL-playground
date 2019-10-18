import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

import './index.css';

const cache = new InMemoryCache({
    dataIdFromObject: o => o.id,
});

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
});

render(
    <ApolloProvider client={client}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={SongList} />
                <Route path="songs/new" component={SongCreate} />
                <Route path="songs/:id" component={SongDetail} />
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
