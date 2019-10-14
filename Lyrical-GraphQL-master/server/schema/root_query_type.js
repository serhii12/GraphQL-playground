const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const Lyric = mongoose.model('Lyric');
const Song = mongoose.model('Song');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        songs: {
            type: new GraphQLList(SongType),
            resolve() {
                return Song.find({});
            },
        },
        song: {
            type: SongType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id }) {
                return Song.findById(id);
            },
        },
        lyric: {
            type: LyricType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id }) {
                return Lyric.findById(id);
            },
        },
    }),
});

module.exports = RootQuery;
