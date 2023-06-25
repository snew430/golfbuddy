const {gql} = require('apollo-server-express');

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
    hotel: Hotel
    maxPlayers: Int
    playersActive: [Player]
    activePlayerCount: Int
    playersWaitlist: [Player]
    active: Boolean
    dayOneStart: String
    dayTwoStart: String
    dayThreeStart: String
    dayFourStart: String
  }
  type Info {
    _id: ID
    header: String
    subject: String
    body: String
    place: Int
  }

  type Note {
    _id: ID
    header: String
    body: String
  }

  type Query {
    players: [Player]
    courses: [Course]
    hotels: [Hotel]
    trips: [Trip]
    trip(id: ID!): Trip
    info: [Info]
    activeTrip: Trip
    note: [Note]
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
      dayOneStart: String
      dayTwoStart: String
      dayThreeStart: String
      dayFourStart: String
      hotel: ID!
      courseOne: ID!
      courseTwo: ID!
      courseThree: ID!
      courseFour: ID!
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
      dayOneStart: String
      dayTwoStart: String
      dayThreeStart: String
      dayFourStart: String
    ): Trip

    deleteTrip(id: ID!): Trip

    changeTripToActive(id: ID!): Trip

    addPlayerToActiveTrip(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String!
    ): Trip

    removeActivePlayer(player: ID!): Trip
    addCurrentPlayerToActive(player: ID!): Trip

    addPlayerToWaitlistTrip(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      preferredRoomate: String
      lodging: String!
    ): Trip

    removeWaitlistPlayer(player: ID!): Trip

    addCurrentPlayerToWaitlist(player: ID!): Trip

    addCourseToTrip(course: ID!, trip: ID!): Trip

    removeCourseFromTrip(course: ID!, trip: ID!): Trip

    addHotelToTrip(hotel: ID!, trip: ID!): Trip

    removeHotelFromTrip(hotel: ID!, trip: ID!): Trip

    sendMessage(
      recipients: String!
      subject: String!
      message: String!
      file: String
    ): Admin

    paidPlayer(player: ID!, paid: Boolean!): Player

    addInfo(subject: String, header: String, body: String!, place: Int): Info

    editInfo(
      id: ID!
      subject: String
      header: String
      body: String!
      place: Int
    ): Info

    deleteInfo(id: ID!): Info

    swapInfoPlace(firstID: ID!, secondID: ID!): Info

    updateNote(header: String, body: String): Note
  }
`;

module.exports = typeDefs;
