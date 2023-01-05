const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        decks: [Deck]
    }
    type Deck {
        _id: ID
        title: String
        description: String
        cards: [Card]
    }
    type Card {
        _id: ID
        side_a_title: String
        side_a_description: String
        side_b_title: String
        side_b_description: String
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

        addDeck(title: String!, description: String): User
    }
`

module.exports = typeDefs;