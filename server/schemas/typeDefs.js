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
    lodging: String
    paid: Boolean
  }
  type Course {
    _id: ID
    name: String
    address: String
    website: String
    phoneNumber: String
  }
  type Hotel {
    _id: ID
    name: String
    address: String
    website: String
    phoneNumber: String
  }
  type Trip {
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
    trips: [Trip]
    trip(id: ID!): Trip
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addPlayer(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String
    ): Player
    updatePlayer(
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String
    ): Player

    deletePlayer(id: ID!): Player

    addCourse(name: String!, address: String!, website: String!): Course

    addHotel(name: String!, address: String!, website: String!): Hotel

    addTrip(
      name: String!
      startDate: String!
      endDate: String!
      paymentDue: String!
      maxPlayers: Int!
      singlePrice: Int!
      doublePrice: Int!
      golfOnlyPrice: Int!
    ): Trip

    editTrip(
      id: ID!
      name: String
      startDate: String
      endDate: String
      paymentDue: String
      maxPlayers: Int
      singlePrice: Int
      doublePrice: Int
      golfOnlyPrice: Int
    ): Trip
    deleteTrip(id: ID!): Trip

    addPlayerToActiveTrip(
      tripId: ID!
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String!
    ): Trip

    removeActivePlayer(player: ID!, trip: ID!): Trip
    addCurrentPlayerToActive(player: ID!, trip: ID!): Trip

    addPlayerToWaitlistTrip(
      tripId: ID!
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String!
    ): Trip

    removeWaitlistPlayer(player: ID!, trip: ID!): Trip

    addCurrentPlayerToWaitlist(player: ID!, trip: ID!): Trip

    addCourseToTrip(course: ID!, trip: ID!): Trip

    removeCourseFromTrip(course: ID!, trip: ID!): Trip

    addHotelToTrip(hotel: ID!, trip: ID!): Trip

    removeHotelFromTrip(hotel: ID!, trip: ID!): Trip

    sendMessage(recipients: String!, subject: String!, message: String!): Admin

    paidPlayer(player: ID!, paid: Boolean!): Player
  }
`;

//move from waitlist to active
//move from active to waitlist

module.exports = typeDefs;
