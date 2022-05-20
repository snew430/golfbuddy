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

export const QUERY_ACTIVE_PLAYERS = gql`
  query {
    tournaments {
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

export const QUERY_WAITLIST_PLAYERS = gql`
  query {
    tournaments {
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

export const QUERY_TOURNAMENT_PLAYERS = gql`
  query {
    tournaments {
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
  query tournament {
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
