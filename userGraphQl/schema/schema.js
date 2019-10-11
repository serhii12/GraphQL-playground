const graphql = require('graphql');
const fetch = require('node-fetch');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    },
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLID },
        company: {
            type: CompanyType,
            resolve(parentValue, _) {
                return fetch(`http://localhost:3000/companies/${parentValue.companyId}`).then(res =>
                    res.json()
                );
            },
        },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return fetch(`http://localhost:3000/users/${args.id}`).then(resp => resp.json());
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return fetch(`http://localhost:3000/companies/${args.id}`).then(resp =>
                    resp.json()
                );
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
