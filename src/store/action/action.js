import {
  LOGIN_SUCCESS,
  LOG_OUT_USER,
  SET_ORDERS,
  SET_REVIEWS,
  SET_SERVICES,
} from './actionTypes';

export const loginAction = (user, token) => {
  const { _id, name, email, role } = user;

  return {
    type: LOGIN_SUCCESS,
    payload: {
      _id,
      name,
      email,
      role,
      token,
    },
  };
};

export const logOutAction = () => {
  return {
    type: LOG_OUT_USER,
    payload: null,
  };
};

export const getServicesAction = (allServices) => {
  return {
    type: SET_SERVICES,
    payload: allServices,
  };
};

export const getReviewsAction = (allReviews) => {
  return {
    type: SET_REVIEWS,
    payload: allReviews,
  };
};

export const getOrdersAction = (allOrders) => {
  return {
    type: SET_ORDERS,
    payload: allOrders,
  };
};
