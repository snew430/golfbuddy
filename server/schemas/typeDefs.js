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
    teeTime: String
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
    hotel: [Hotel]
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

    addCourse(
      name: String!
      address: String!
      website: String!
      teeTime: String!
    ): Course

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
      hotelName: String!
      hotelAddress: String!
      hotelWebsite: String!
      hotelPhoneNumber: String!
      courseOneName: String!
      courseOneAddress: String!
      courseOneWebsite: String!
      courseOnePhoneNumber: String!
      courseOneTeeTime: String!
      courseTwoName: String!
      courseTwoAddress: String!
      courseTwoWebsite: String!
      courseTwoPhoneNumber: String!
      courseTwoTeeTime: String!
      courseThreeName: String!
      courseThreeAddress: String!
      courseThreeWebsite: String!
      courseThreePhoneNumber: String!
      courseThreeTeeTime: String!
      courseFourName: String!
      courseFourAddress: String!
      courseFourWebsite: String!
      courseFourPhoneNumber: String!
      courseFourTeeTime: String!
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
      hotelName: String
      hotelAddress: String
      hotelWebsite: String
      hotelPhoneNumber: String
      courseOneName: String
      courseOneAddress: String
      courseOneWebsite: String
      courseOnePhoneNumber: String
      courseOneTeeTime: String
      courseTwoName: String
      courseTwoAddress: String
      courseTwoWebsite: String
      courseTwoPhoneNumber: String
      courseTwoTeeTime: String
      courseThreeName: String
      courseThreeAddress: String
      courseThreeWebsite: String
      courseThreePhoneNumber: String
      courseThreeTeeTime: String
      courseFourName: String
      courseFourAddress: String
      courseFourWebsite: String
      courseFourPhoneNumber: String
      courseFourTeeTime: String
    ): Trip

    deleteTrip(id: ID!): Trip

    changeTripToActive(id: ID!): Trip

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

//move from waitlist to active
//move from active to waitlist

module.exports = typeDefs;
