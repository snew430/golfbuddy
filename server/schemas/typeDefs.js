const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Player {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: Int
  }

  type Course {
    name: String
    address: String
    website: String
  }

  type Hotel {
    name: String
    address: String
    website: String
    singlePrice: Int
    doublePrice: Int
  }

  type Tournament {
    name: String
    courses: [Course]
    hotels: [Hotel]
    players: [Player]
  }

  type Query {
    users: [User]
    players: [Player]
    courses: [Course]
    hotels: [Hotel]
    tournaments: [Tournament]
    currentPlayers(tournament: ID!): [Player]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: Int!
      password: String!
    ): Auth

    addPlayer(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: Int!
      preferredRoomates: String
    ): User

    updatePlayer(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      phoneNumber: Int
    ): Auth

    login(email: String!, password: String!): Auth

    addCourse(name: String!, address: String!, website: String!): Course

    addHotel(
      name: String!
      address: String!
      website: String!
      singlePrice: Int!
      doublePrice: Int!
    ): Hotel

    addTournament(
      name: String!
      startDate: String!
      endDate: String!
      paymentDue: String!
      courses: [ID]!
      hotels: [ID]!
    ): Tournament
    
    addPlayerToTourney(player: ID!, tournament: ID!): Tournament
  }
`;

//should signing up a user require password or should that be emailed?
//should addPlayerToTourney exist or add to tourney when creating Player
//should tournament contain going, waitlist, and not going?

module.exports = typeDefs;
