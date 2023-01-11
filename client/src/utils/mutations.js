import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      user {
        username
        _id
      }
      token
    }
  }
`

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!) {
  addUser(username: $username, password: $password) {
  user {
    username
  }
  token
  }
}
`

export const ADD_DECK = gql`
mutation AddDeck($title: String!, $description: String) {
  addDeck(title: $title, description: $description) {
  username
  decks {
    title
    description
  }  
  }
}
`

export const DELETE_DECK = gql`
mutation DeleteDeck($deckId: ID!) {
  deleteDeck(deckId: $deckId) {
    username
    decks {
      title
      _id
    }
  }
}
`