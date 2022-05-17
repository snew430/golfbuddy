import React from "react";
<<<<<<< HEAD
import { Rules, History, Nav, Tournament, SignUp, Home } from './components';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Nav />
      <Home />
      <Tournament />
      <Rules />
      <History />
      <SignUp />
    </div>
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Rules, History, Tournament } from "./pages";
import { Nav } from "./components";
import "./App.scss";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Nav />
          <Routes>
            <Route path="/" element={<Tournament />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/history" element={<History />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
>>>>>>> 65afdf0d738082cc0f183373c7c086d6a1faf409
  );
}

export default App;
