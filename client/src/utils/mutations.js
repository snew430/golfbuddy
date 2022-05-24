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
    $lodging: String!
  ) {
    addPlayer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      lodging: $lodging
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

export const UPDATE_PLAYER = gql`
  mutation updatePlayer(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $lodging: String
  ) {
    updatePlayer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      lodging: $lodging
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

export const EDIT_TOURNAMENT = gql`
  mutation editTournament(
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
    editTournament(
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

export const ADD_TOURNAMENT = gql`
  mutation addTournament(
    $name: String!
    $startDate: String!
    $endDate: String!
    $paymentDue: String!
    $maxPlayers: Int!
    $singlePrice: Int!
    $doublePrice: Int!
    $golfOnlyPrice: Int!
  ) {
    addTournament(
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
  mutation addPlayerToActiveTournament(
    $tournamentId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $lodging: String!
  ) {
    addPlayerToActiveTournament(
      tournamentId: $tournamentId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
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
        lodging
      }
    }
  }
`;

export const ADD_CURRENT_TO_ACTIVE = gql`
  mutation addCurrentPlayerToActive($player: ID!, $tournament: ID!) {
    addCurrentPlayerToActive(player: $player, tournament: $tournament) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        lodging
      }
    }
  }
`;

export const REMOVE_ACTIVE_PLAYER = gql`
  mutation removeActivePlayer($player: ID!, $tournament: ID!) {
    removeActivePlayer(player: $player, tournament: $tournament) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        lodging
      }
    }
  }
`;

export const ADD_WAITLIST_PLAYER = gql`
  mutation addPlayerToWaitlistTournament($player: ID!, $tournament: ID!) {
    addPlayerToWaitlistTournament(player: $player, tournament: $tournament) {
      _id
      name
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        lodging
      }
    }
  }
`;

export const ADD_CURRENT_TO_WAITLIST = gql`
  mutation addCurrentPlayerToWaitlist($player: ID!, $tournament: ID!) {
    addCurrentPlayerToWaitlist(player: $player, tournament: $tournament) {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        lodging
      }
    }
  }
`;

export const REMOVE_WAITLIST_PLAYER = gql`
  mutation removeWaitlistPlayer($player: ID!, $tournament: ID!) {
    removeWaitlistPlayer(player: $player, tournament: $tournament) {
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
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
