import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';

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
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
