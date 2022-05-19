import { gql } from "@apollo/client";

// ADMIN LOGIN 
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

// ADD PLAYER (MASTER)

// ADD PLAYER TO TOURNAMENT 

// UPDATE PLAYER 

// DELETE PLAYER 

// ADD COURSE 

// ADD HOTEL

// ADD TOURNAMENT 

// EDIT TOURNAMENT

// DELETE TOURNAMENT 
