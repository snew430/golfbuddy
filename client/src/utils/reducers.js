import { MAKE_ACTIVE_TRIP } from "./actions";
import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_ACTIVE_TRIP:
      return {
        ...state,
        currentTrip: [...action.currentTrip],
      };
    default:
      return state;
  }
};
