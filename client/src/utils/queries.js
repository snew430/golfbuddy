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
      singlePrice
      doublePrice
      golfOnlyPrice
    }
  }
`;

export const QUERY_TOURNAMENT = gql`
  query {
    tournament {
      _id
      name
      startDate
      endDate
      paymentDue
      hotels
      maxPlayers
      playersActive {
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
      }
      playersWaitlist {
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
