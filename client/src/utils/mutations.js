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
    $lodging: Int
  ) {
    updatePlayer(
      _id: $id
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
