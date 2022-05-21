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
    phoneNumber: String
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
  }

  type Tournament {
    _id: ID
    name: String
    startDate: String
    endDate: String
    paymentDue: String
    singlePrice: Int
    doublePrice: Int
    golfOnlyPrice: Int
    courses: [Course]
    hotels: [Hotel]
    maxPlayers: Int
    playersActive: [Player]
    activePlayerCount: Int
    playersWaitlist: [Player]
  }

  type Query {
    players: [Player]
    courses: [Course]
    hotels: [Hotel]
    tournaments: [Tournament]
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addPlayer(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: Int!
      lodging: Int!
      preferredRoomate: String
    ): Player

    updatePlayer(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phoneNumber: Int
      preferredRoomate: String
      lodging: Int
    ): Player

    deletePlayer(id: ID!): Player

    addCourse(name: String!, address: String!, website: String!): Course

    addHotel(name: String!, address: String!, website: String!): Hotel

    editTournament(
      id: ID!
      name: String
      startDate: String
      endDate: String
      paymentDue: String
      maxPlayers: Int
      singlePrice: Int
      doublePrice: Int
      golfOnlyPrice: Int
    ): Tournament

    deleteTournament(id: ID!): Tournament

    addPlayerToActiveTournament(player: ID!, tournament: ID!): Tournament

    removeActivePlayer(player: ID!, tournament: ID!): Tournament

    addPlayerToWaitlistTournament(player: ID!, tournament: ID!): Tournament

    removeWaitlistPlayer(player: ID!, tournament: ID!): Tournament

    addCourseToTournament(course: ID!, tournament: ID!): Tournament

    removeCourseFromTourney(course: ID!, tournament: ID!): Tournament

    addHotelToTournament(hotel: ID!, tournament: ID!): Tournament

    removeHotelFromTourney(hotel: ID!, tournament: ID!): Tournament
  }
`;

//move from waitlist to active
//move from active to waitlist

// addTournament(
//   name: String!
//   startDate: String!
//   endDate: String!
//   paymentDue: String!
//   maxPlayers: Int!
//   singlePrice: Int!
//   doublePrice: Int!
//   golfOnlyPrice: Int!
// ): Tournament

module.exports = typeDefs;
