import './App.css';
import logo from './assets/logo2.png';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <img
            src={logo}
            alt="SpaceX Logo"
            style={{ width: 300, margin: "auto", display: "block" }}
          />
          <Routes>
          <Route path="/" element={ <Launches/> } exact></Route>
          <Route path="/launch/:flight_number" element={ <Launch/> } exact></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;