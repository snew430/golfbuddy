import React from "react";
import "./App.scss";
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
  Trip,
  SignUp,
  Home,
  Administration,
  NoMatch,
} from "./pages";

import {
  PlayerList,
  MasterList,
  NewTrip,
  AdminHome,
  Message,
  ManageTrips,
} from "./admin-pages";

import { Nav } from "./components";

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
            <Route path="/trip" element={<Trip />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/history" element={<History />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/playerlist" element={<PlayerList />} />
            <Route path="/masterlist" element={<MasterList />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/new-trip" element={<NewTrip />} />
            <Route path="/administrationhome" element={<AdminHome />} />
            <Route path="/message" element={<Message />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="/managetrips" element={<ManageTrips />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
