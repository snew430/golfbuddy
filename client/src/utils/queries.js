import { gql } from "@apollo/client";

export const QUERY_PLAYERS = gql`
  {
    players {
      _id
      firstName
      lastName
      email
      phoneNumber
      preferredRoomate
      lodging
      paid
    }
  }
`;

export const QUERY_ACTIVE_PLAYERS = gql`
  {
    activeTrip {
      playersActive {
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_WAITLIST_PLAYERS = gql`
  {
    activeTrip {
      playersWaitlist {
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_TRIP_PLAYERS = gql`
  {
    activeTrip {
      playersActive {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_COURSES = gql`
  {
    courses {
      _id
      name
      website
      address
    }
  }
`;

export const QUERY_HOTELS = gql`
  {
    hotels {
      _id
      name
      website
      address
    }
  }
`;

export const QUERY_RULES = gql`
  {
    info {
      _id
      subject
      header
      body
      place
    }
  }
`;

export const QUERY_TRIPS = gql`
  {
    trips {
      _id
      name
      active
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      dayOneStart
      dayTwoStart
      dayThreeStart
      dayFourStart
      courses {
        _id
        name
        address
        website
        phoneNumber
      }
      hotel {
        _id
        name
        address
        website
        phoneNumber
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
        paid
      }
      activePlayerCount
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_BASIC_TRIPS = gql`
  {
    trips {
      _id
      name
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      dayOneStart
      dayTwoStart
      dayThreeStart
      dayFourStart
      active
      maxPlayers
      activePlayerCount
    }
  }
`;

export const QUERY_TRIP = gql`
  query trip($tripId: ID!) {
    trip(id: $tripId) {
      _id
      name
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      dayOneStart
      dayTwoStart
      dayThreeStart
      dayFourStart
      courses {
        _id
        name
        address
        website
      }
      hotel {
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
        paid
      }
      activePlayerCount
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_BASIC_TRIP = gql`
  query trip($tripId: ID!) {
    trip(id: $tripId) {
      _id
      name
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      dayOneStart
      dayTwoStart
      dayThreeStart
      dayFourStart
      courses {
        _id
        name
        address
        website
      }
      hotel {
        _id
        name
        address
        website
      }
      maxPlayers
      activePlayerCount
    }
  }
`;

export const QUERY_ACTIVE_TRIP = gql`
  query activeTrip {
    activeTrip {
      _id
      name
      startDate
      endDate
      paymentDue
      singlePrice
      doublePrice
      golfOnlyPrice
      dayOneStart
      dayTwoStart
      dayThreeStart
      dayFourStart
      courses {
        _id
        name
        address
        website
        phoneNumber
      }
      hotel {
        _id
        name
        address
        website
        phoneNumber
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
        paid
      }
      activePlayerCount
      playersWaitlist {
        _id
        firstName
        lastName
        email
        phoneNumber
        preferredRoomate
        lodging
        paid
      }
    }
  }
`;

export const QUERY_NOTE = gql`
  {
    note {
      header
      body
    }
  }
`;
