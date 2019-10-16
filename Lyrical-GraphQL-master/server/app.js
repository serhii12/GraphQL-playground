require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', error => console.log('Error connecting to MongoDB:', error));

app.use(bodyParser.json());
app.use(
    '/graphql',
    cors(),
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

module.exports = app;
