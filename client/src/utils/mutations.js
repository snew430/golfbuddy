import {gql} from '@apollo/client';

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
      hotel {
        _id
        name
        website
        address
      }
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
    $file: String
  ) {
    sendMessage(
      recipients: $recipients
      subject: $subject
      message: $message
      file: $file
    ) {
      _id
    }
  }
`;

export const PAID_PLAYER = gql`
  mutation paidPlayer($player: ID!, $paid: Boolean!) {
    paidPlayer(player: $player, paid: $paid) {
      _id
      firstName
      lastName
      paid
    }
  }
`;

export const ADD_TRIP = gql`
  mutation (
    $name: String!
    $startDate: String!
    $endDate: String!
    $paymentDue: String!
    $maxPlayers: Int!
    $singlePrice: Int!
    $doublePrice: Int!
    $golfOnlyPrice: Int!
    $hotelName: String!
    $hotelAddress: String!
    $hotelWebsite: String!
    $hotelPhoneNumber: String!
    $courseOneName: String!
    $courseOneAddress: String!
    $courseOneWebsite: String!
    $courseOnePhoneNumber: String!
    $courseOneTeeTime: String!
    $courseTwoName: String!
    $courseTwoAddress: String!
    $courseTwoWebsite: String!
    $courseTwoPhoneNumber: String!
    $courseTwoTeeTime: String!
    $courseThreeName: String!
    $courseThreeAddress: String!
    $courseThreeWebsite: String!
    $courseThreePhoneNumber: String!
    $courseThreeTeeTime: String!
    $courseFourName: String!
    $courseFourAddress: String!
    $courseFourWebsite: String!
    $courseFourPhoneNumber: String!
    $courseFourTeeTime: String!
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
      hotelName: $hotelName
      hotelAddress: $hotelAddress
      hotelWebsite: $hotelWebsite
      hotelPhoneNumber: $hotelPhoneNumber
      courseOneName: $courseOneName
      courseOneAddress: $courseOneAddress
      courseOneWebsite: $courseOneWebsite
      courseOnePhoneNumber: $courseOnePhoneNumber
      courseOneTeeTime: $courseOneTeeTime
      courseTwoName: $courseTwoName
      courseTwoAddress: $courseTwoAddress
      courseTwoWebsite: $courseTwoWebsite
      courseTwoPhoneNumber: $courseTwoPhoneNumber
      courseTwoTeeTime: $courseTwoTeeTime
      courseThreeName: $courseThreeName
      courseThreeAddress: $courseThreeAddress
      courseThreeWebsite: $courseThreeWebsite
      courseThreePhoneNumber: $courseThreePhoneNumber
      courseThreeTeeTime: $courseThreeTeeTime
      courseFourName: $courseFourName
      courseFourAddress: $courseFourAddress
      courseFourWebsite: $courseFourWebsite
      courseFourPhoneNumber: $courseFourPhoneNumber
      courseFourTeeTime: $courseFourTeeTime
    ) {
      _id
      name
    }
  }
`;

export const MAKE_TRIP_ACTIVE = gql`
  mutation changeTripToActive($changeTripToActiveId: ID!) {
    changeTripToActive(id: $changeTripToActiveId) {
      _id
      name
    }
  }
`;

export const ADD_INFO = gql`
  mutation addInfo($subject: String, $header: String, $body: String!) {
    addInfo(subject: $subject, header: $header, body: $body) {
      _id
      subject
      header
      body
      place
    }
  }
`;

export const DELETE_INFO = gql`
  mutation deleteInfo($deleteInfoId: ID!) {
    deleteInfo(id: $deleteInfoId) {
      _id
      subject
      header
      body
      place
    }
  }
`;

export const EDIT_INFO = gql`
  mutation editInfo(
    $editInfoId: ID!
    $subject: String
    $header: String
    $body: String!
    $place: Int
  ) {
    editInfo(
      id: $editInfoId
      subject: $subject
      header: $header
      body: $body
      place: $place
    ) {
      _id
      subject
      header
      body
      place
    }
  }
`;

export const SWAP_INFO_PLACE = gql`
  mutation swapInfoPlace($firstId: ID!, $secondId: ID!) {
    swapInfoPlace(firstID: $firstId, secondID: $secondId) {
      _id
      subject
      header
      body
      place
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($header: String, $body: String) {
    updateNote(header: $header, body: $body) {
      header
      body
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation ($deleteTripId: ID!) {
    deleteTrip(id: $deleteTripId) {
      _id
    }
  }
`;
