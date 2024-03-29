// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoose = require('mongoose');
const models = require('./models');
const passportConfig = require('./services/auth');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise;
// Connect to the mongoDB instance and log a message
mongoose.connection.on('error', err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const app = require('./app');
app.set('port', process.env.PORT || 4000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
