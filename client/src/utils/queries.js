import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
query Users {
    users {
    username
    _id 
    }
  }
`

export const QUERY_CURRENT_USER = gql`
query CurrentUser {
    currentUser {
      username
      decks {
      _id
      title
      description
      cards {
        _id
        sideATitle
        sideADescription
        sideBTitle
        sideBDescription
      }
    }
    }
  }
`