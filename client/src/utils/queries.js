import { gql } from "@apollo/client";

export const QUERY_PLAYERS = gql`
  query {
    players {
      _id
      firstName
      lastName
      email
      phoneNumber
      preferredRoomate
      lodging
    }
  }
`;

export const QUERY_COURSES = gql`
  query {
    courses {
      _id
      name
      website
      address
    }
  }
`;

export const QUERY_HOTELS = gql`
  query {
    hotels {
      _id
      name
      website
      address
    }
  }
`;

export const QUERY_TOURNAMENT = gql`
  query {
    tournaments {
      _id
      name
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      courses {
        _id
        name
        address
        website
      }
      hotels {
        _id
        name
        address
        website
      }
      maxPlayers
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
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