import {useState, useEffect} from 'react';
import './App.css';
import {setContext} from '@apollo/client/link/context'
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';
import Auth from "./utils/auth";

//------[Components]------------------
import Nav from './components/Nav';

//------[Pages]-----------------------
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Decks from './pages/Decks';
import Cards from './pages/Cards';
import Review from './pages/Review';
import LoggedOut from './pages/LoggedOut';

//------[Router]----------------------
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//------[Set Up Apollo]---------------
const httpLink = createHttpLink({
  //This can be changed to '/graphql' if using proxy in package.json
  uri: '/graphql'
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
      {Auth.loggedIn() ?
      <>
      {pageSelected === 'Decks' && <Decks/>}
      {pageSelected === 'Cards' && <Cards/>}
      {pageSelected === 'Review' && <Review/>}
      </>
      :
      <>
      {pageSelected === 'Decks' && <LoggedOut/>}
      {pageSelected === 'Cards' && <LoggedOut/>}
      {pageSelected === 'Review' && <LoggedOut/>}
      </>
      }

    </div>
    </ApolloProvider>
  );
}

export default App;

{/* <div className="App">
      <Nav pageSelected={pageSelected} setPageSelected={setPageSelected}/>

      {pageSelected === 'Home' && <Home/>}
      {pageSelected === 'Log In' && <Login setPageSelected={setPageSelected}/>}
      {pageSelected === 'Sign Up' && <Signup setPageSelected={setPageSelected}/>}
      {Auth.loggedIn() ?
      <>
      {pageSelected === 'Decks' && <Decks/>}
      {pageSelected === 'Cards' && <Cards/>}
      {pageSelected === 'Review' && <Review/>}
      </>
      :
      <>
      {pageSelected === 'Decks' && <LoggedOut/>}
      {pageSelected === 'Cards' && <LoggedOut/>}
      {pageSelected === 'Review' && <LoggedOut/>}
      </>
      }

    </div> */}

    // <ApolloProvider client={client}>
    //   <div className="App">
    //     <Nav pageSelected={pageSelected} setPageSelected={setPageSelected} />
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/signup" element={<Signup />} />

    //       {Auth.loggedIn() ?
    //         <>
    //           <Route path="/decks" element={<Decks />} />
    //           <Route path="/cards" element={<Cards />} />
    //           <Route path="/review" element={<Review />} />
    //         </>
    //         :
    //         <>
    //           <Route path="/decks" element={<LoggedOut />} />
    //           <Route path="/cards" element={<LoggedOut />} />
    //           <Route path="/review" element={<LoggedOut />} />
    //         </>
    //       }
    //        <Route path="*" element={<NotFound />}></Route>
    //     </Routes>


    //   </div>
    // </ApolloProvider>
