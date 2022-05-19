const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Admin {
    _id: ID
    email: String
  }

  type Auth {
    token: ID!
    admin: Admin
  }

  type Player {
    _id: ID
    firstName: String
    lastName: String
    email: String
    phoneNumber: Int
    preferredRoomate: String
    lodging: Int
  }

  type Course {
    _id: ID
    name: String
    address: String
    website: String
  }

  type Hotel {
    _id: ID
    name: String
    address: String
    website: String
    singlePrice: Int
    doublePrice: Int
    golfOnlyPrice: Int
  }

  type Tournament {
    _id: ID
    name: String
    courses: [Course]
    hotels: [Hotel]
    playersActive: [Player]
    playersWaitlist: [Player]
  }

  type Query {
    admin: [Admin]
    players: [Player]
    courses: [Course]
    hotels: [Hotel]
    tournaments: [Tournament]
    currentPlayers(tournament: ID!): [Player]
    waitlistedPlayers(tournament: ID!): [Player]
  }

  type Mutation {
    addAdmin(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    addPlayer(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: Int!
      preferredRoomate: String
      lodging: Int!
    ): Player

    updatePlayer(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      phoneNumber: Int
      preferredRoomate: String
      lodging: Int
    ): Auth

    login(email: String!, password: String!): Auth

    addCourse(name: String!, address: String!, website: String!): Course

    addHotel(
      name: String!
      address: String!
      website: String!
      singlePrice: Int!
      doublePrice: Int!
      golfOnlyPrice: Int!
    ): Hotel

    addTournament(
      name: String!
      startDate: String!
      endDate: String!
      paymentDue: String!
      courses: [ID]!
      hotels: [ID]!
    ): Tournament

    editTournament(
      _id: ID!
      name: String
      startDate: String
      endDate: String
      paymentDue: String
      courses: [ID]
      hotels: [ID]
    ): Tournament

    deletePlayer(_id: ID!): Player

    deleteTournament(_id: ID!): Tournament

    addPlayerToTournament(player: ID!, tournament: ID!): Tournament
  }
`;

module.exports = typeDefs;
