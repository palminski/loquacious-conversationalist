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
    title
    description 
  }
}
`

export const DELETE_DECK = gql`
mutation DeleteDeck($deckId: ID!) {
  deleteDeck(deckId: $deckId) {
    title
    _id
  }
}
`

export const ADD_CARD = gql`
mutation AddCard($deckId: ID!, $sideATitle: String!, $sideBTitle: String!, $sideADescription: String, $sideBDescription: String) {
  addCard(deckId: $deckId, sideATitle: $sideATitle, sideBTitle: $sideBTitle, sideADescription: $sideADescription, sideBDescription: $sideBDescription) {
    sideATitle
    sideBTitle
    sideADescription
    sideBDescription
    _id
  }
}
`

export const EDIT_CARD = gql`
mutation EditCard($deckId: ID!, $cardId: ID!, $sideATitle: String!, $sideADescription: String, $sideBTitle: String!, $sideBDescription: String) {
  editCard(deckId: $deckId, cardId: $cardId, sideATitle: $sideATitle, sideADescription: $sideADescription, sideBTitle: $sideBTitle, sideBDescription: $sideBDescription) {
    sideATitle
    sideBTitle
    sideADescription
    sideBDescription
    _id
  }
}
`

export const DELETE_CARD = gql`
mutation DeleteCard($deckId: ID!, $cardId: ID!) {
  deleteCard(deckId: $deckId, cardId: $cardId) {
    sideATitle
    sideBTitle
    sideADescription
    sideBDescription
    _id
  }
}
`