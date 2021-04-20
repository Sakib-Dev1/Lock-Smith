import { createContext, useReducer } from 'react';

import reducer from './reducer';

const init = {
  orders: [],
  services: [],
  user: {},
  reviews: [],
};

const store = createContext(init);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, init);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
