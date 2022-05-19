import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation addPlayer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: Int!
    $lodging: Int!
  ) {
    addPlayer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      lodging: $lodging
    ) {
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
    $phoneNumber: Int
    $preferredRoomate: String
    $lodging: Int
  ) {
    updatePlayer(
      _id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phoneNumber: $phoneNumber
      preferredRoomate: $preferredRoomate
      lodging: $lodging
    ) {
      firstName
      lastName
      email
      phoneNumber
      preferredRoomate
      lodging
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(_id: $id) {
      firstName
      lastName
    }
  }
`;

export const ADD_COURSE = gql`
  mutation addCourse($name: String!, $address: String!, $website: String!) {
    addCourse(name: $name, address: $address, website: $website) {
      name
      address
      website
    }
  }
`;

export const ADD_HOTEL = gql`
  mutation addHotel(
    $name: String!
    $address: String!
    $website: String!
    $singlePrice: Int!
    $doublePrice: Int!
    $golfOnlyPrice: Int!
  ) {
    addHotel(
      name: $name
      address: $address
      website: $website
      singlePrice: $singlePrice
      doublePrice: $doublePrice
      golfOnlyPrice: $golfOnlyPrice
    ) {
      name
      address
      website
      singlePrice
      doublePrice
      golfOnlyPrice
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
  ) {
    editTournament(
      _id: $id
      name: $name
      startDate: $startDate
      endDate: $endDate
      paymentDue: $paymentDue
      maxPlayers: $maxPlayers
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
        singlePrice
        doublePrice
        golfOnlyPrice
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
  ) {
    addTournament(
      name: $name
      startDate: $startDate
      endDate: $endDate
      paymentDue: $paymentDue
      maxPlayers: $maxPlayers
    ) {
      _id
      name
      startDate
      endDate
      paymentDue
    }
  }
`;