const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
    {
        title: { type: String },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        lyrics: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lyric',
            },
        ],
    },
    {
        usePushEach: true,
    }
);

songSchema.statics.addLyric = function(id, content) {
    const Lyric = mongoose.model('Lyric');

    return this.findById(id).then(song => {
        const lyric = new Lyric({ content, song });
        song.lyrics.push(lyric.id);
        return Promise.all([lyric.save(), song.save()]).then(([lyric, song]) => song);
    });
};

songSchema.statics.findLyrics = function(id) {
    return this.findById(id)
        .populate('lyrics')
        .then(song => song.lyrics);
};

module.exports = mongoose.model('Song', songSchema);
