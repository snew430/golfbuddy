import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation addPlayer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $lodging: String
    $preferredRoomate: String
  ) {
    addPlayer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      lodging: $lodging
      preferredRoomate: $preferredRoomate
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      lodging
      preferredRoomate
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation updatePlayer(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $lodging: String!
    $preferredRoomate: String
  ) {
    updatePlayer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      lodging: $lodging
      preferredRoomate: $preferredRoomate
    ) {
      _id
      firstName
      lastName
      email
      phoneNumber
      lodging
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(id: $id) {
      _id
      firstName
      lastName
      email
      phoneNumber
      lodging
    }
  }
`;

export const ADD_COURSE = gql`
  mutation ($name: String!, $address: String!, $website: String!) {
    addCourse(name: $name, address: $address, website: $website) {
      _id
      name
      address
      website
    }
  }
`;

export const ADD_HOTEL = gql`
  mutation addHotel($name: String!, $address: String!, $website: String!) {
    addHotel(name: $name, address: $address, website: $website) {
      _id
      name
      address
      website
    }
  }
`;

export const EDIT_TRIP = gql`
  mutation editTrip(
    $id: ID!
    $name: String
    $startDate: String
    $endDate: String
    $paymentDue: String
    $maxPlayers: Int
    $singlePrice: Int
    $doublePrice: Int
    $golfOnlyPrice: Int
  ) {
    editTrip(
      id: $id
      name: $name
      startDate: $startDate
      endDate: $endDate
      paymentDue: $paymentDue
      maxPlayers: $maxPlayers
      singlePrice: $singlePrice
      doublePrice: $doublePrice
      golfOnlyPrice: $golfOnlyPrice
    ) {
      _id
      name
      startDate
      endDate
      paymentDue
      maxPlayers
      courses {
        _id
        name
        website
        address
      }
      hotels {
        _id
        name
        website
        address
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip(
    $name: String!
    $startDate: String!
    $endDate: String!
    $paymentDue: String!
    $maxPlayers: Int!
    $singlePrice: Int!
    $doublePrice: Int!
    $golfOnlyPrice: Int!
  ) {
    addTrip(
      name: $name
      startDate: $startDate
      endDate: $endDate
      paymentDue: $paymentDue
      maxPlayers: $maxPlayers
      singlePrice: $singlePrice
      doublePrice: $doublePrice
      golfOnlyPrice: $golfOnlyPrice
    ) {
      _id
      name
      startDate
      endDate
      paymentDue
      maxPlayers
      singlePrice
      doublePrice
      golfOnlyPrice
    }
  }
`;

export const ADD_ACTIVE_PLAYER = gql`
  mutation addPlayerToActiveTrip(
    $tripId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $preferredRoomate: String
    $lodging: String!
  ) {
    addPlayerToActiveTrip(
      tripId: $tripId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      preferredRoomate: $preferredRoomate
      lodging: $lodging
    ) {
      _id
      name
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const ADD_CURRENT_TO_ACTIVE = gql`
  mutation addCurrentPlayerToActive($player: ID!, $trip: ID!) {
    addCurrentPlayerToActive(player: $player, trip: $trip) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const REMOVE_ACTIVE_PLAYER = gql`
  mutation removeActivePlayer($player: ID!, $trip: ID!) {
    removeActivePlayer(player: $player, trip: $trip) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const ADD_WAITLIST_PLAYER = gql`
  mutation addPlayerToWaitlistTrip(
    $tripId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $preferredRoomate: String
    $lodging: String!
  ) {
    addPlayerToWaitlistTrip(
      tripId: $tripId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      preferredRoomate: $preferredRoomate
      lodging: $lodging
    ) {
      _id
      name
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const ADD_CURRENT_TO_WAITLIST = gql`
  mutation addCurrentPlayerToWaitlist($player: ID!, $trip: ID!) {
    addCurrentPlayerToWaitlist(player: $player, trip: $trip) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const REMOVE_WAITLIST_PLAYER = gql`
  mutation removeWaitlistPlayer($player: ID!, $trip: ID!) {
    removeWaitlistPlayer(player: $player, trip: $trip) {
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $recipients: String!
    $subject: String!
    $message: String!
  ) {
    sendMessage(recipients: $recipients, subject: $subject, message: $message) {
      _id
    }
  }
`;
