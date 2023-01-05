const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
    }

    type Auth {
        token: ID
        user: User
    }


    type Query {
        users: [User]
        currentUser: User
    }


    type Mutation {
        addUser(username: String!, password: String!): Auth

        loginUser(username: String!, password: String!): Auth
    }
`

module.exports = typeDefs;