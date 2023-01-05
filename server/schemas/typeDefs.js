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
        sideATitle: String
        sideADescription: String
        sideBTitle: String
        sideBDescription: String
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

        addCard(deckId: ID!, sideATitle: String!, sideADescription: String, sideBTitle: String!, sideBDescription: String): User
    }
`

module.exports = typeDefs;