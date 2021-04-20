import { LOGIN_SUCCESS, LOG_OUT_USER, SET_ORDERS, SET_REVIEWS, SET_SERVICES } from './action/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };

    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
