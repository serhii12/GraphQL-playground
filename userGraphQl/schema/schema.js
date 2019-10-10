const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    {
        id: '23',
        firstName: 'Bill',
        age: 20,
    },
    {
        id: '423',
        firstName: 'Jade',
        age: 25,
    },
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        // companyId: { type: GraphQLID },
        // position: { type: GraphQLID },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                // code to get data from db / other source
                console.log(typeof args.id);
                return _.find(users, { id: args.id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
