import {useState} from 'react';
import './App.css';
import {setContext} from '@apollo/client/link/context'
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';

//------[Components]------------------
import Nav from './components/Nav';

//------[Pages]-----------------------
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Decks from './pages/Decks';
import Cards from './pages/Cards';
import Review from './pages/Review';

//------[Set Up Apollo]---------------
const httpLink = createHttpLink({
  //This can be changed to '/graphql' if using proxy in package.json
  uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [pageSelected, setPageSelected] = useState('Home')

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Nav pageSelected={pageSelected} setPageSelected={setPageSelected}/>

      {pageSelected === 'Home' && <Home/>}
      {pageSelected === 'Log In' && <Login setPageSelected={setPageSelected}/>}
      {pageSelected === 'Sign Up' && <Signup setPageSelected={setPageSelected}/>}
      {pageSelected === 'Decks' && <Decks/>}
      {pageSelected === 'Cards' && <Cards/>}
      {pageSelected === 'Review' && <Review/>}

    </div>
    </ApolloProvider>
  );
}

export default App;
