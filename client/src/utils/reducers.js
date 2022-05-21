import { MAKE_ACTIVE_TOURNAMENT } from "./actions";
import { useReducer } from "react";

export const reducer = (state, action) => {
  switch (action.type) {
    case MAKE_ACTIVE_TOURNAMENT:
      return {
        ...state,
        currentTournament: [...action.currentTournament],
      };
    default:
      return state;
  }
};
