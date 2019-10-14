const graphql = require('graphql');
const fetch = require('node-fetch');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, _) {
                return fetch(`http://localhost:3000/companies/${parentValue.id}/users`).then(res =>
                    res.json()
                );
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, _) {
                console.log(parentValue);
                return fetch(`http://localhost:3000/companies/${parentValue.companyId}`).then(res =>
                    res.json()
                );
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return fetch(`http://localhost:3000/users/${args.id}`).then(resp => resp.json());
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return fetch(`http://localhost:3000/companies/${args.id}`).then(resp =>
                    resp.json()
                );
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLID },
            },
            resolve(_, { firstName, age }) {
                const body = { firstName, age };

                return fetch('http://localhost:3000/users', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                }).then(res => res.json());
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, { id: userId }) {
                return fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'DELETE',
                }).then(res => res.json());
            },
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLID },
            },
            resolve(_, { id: userId, firstName, age, companyId }) {
                const body = { firstName, age, companyId };

                return fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                }).then(res => res.json());
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
