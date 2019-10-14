const mongoose = require('mongoose');

mongoose.plugin(schema => {
    schema.options.usePushEach = true;
});

require('./Song');
require('./Lyric');
