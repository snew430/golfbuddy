import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import {
  Rules,
  History,
  Tournament,
  SignUp,
  Home,
  Administration,
} from "./pages";
import {
  PlayerList,
  MasterList,
  NewTournament,
  AdminHome,
} from "./admin-pages";

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
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/history" element={<History />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/playerlist" element={<PlayerList />} />
            <Route path="/masterlist" element={<MasterList />} />
            <Route path="/tourney" element={<Tournament />} />
            <Route path="/newtournament" element={<NewTournament />} />
            <Route path="/administrationhome" element={<AdminHome />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
