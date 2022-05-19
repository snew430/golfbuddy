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
    startDate: String
    endDate: String
    paymentDue: String
    courses: [Course]
    hotels: [Hotel]
    maxPlayers: Int
    playersActive: [Player]
    playersWaitlist: [Player]
  }

  type Query {
    players: [Player]
    courses: [Course]
    hotels: [Hotel]
    tournaments: [Tournament]
    currentPlayers(tournament: ID!): [Player]
    waitlistedPlayers(tournament: ID!): [Player]
  }

  type Mutation {
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
    ): Player

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
      maxPlayers: Int!
    ): Tournament

    editTournament(
      _id: ID!
      name: String
      startDate: String
      endDate: String
      paymentDue: String
      maxPlayers: Int
    ): Tournament

    deletePlayer(_id: ID!): Player

    deleteTournament(_id: ID!): Tournament

    addPlayerToTournament(player: ID!, tournament: ID!): Tournament
    addCourseToTournament(course: ID!, tournament: ID!): Tournament
    addHotelToTournament(hotel: ID!, tournament: ID!): Tournament
  }
`;

//remove player from tourney
//remove course from tourney
//remove hotel from tourney

module.exports = typeDefs;
