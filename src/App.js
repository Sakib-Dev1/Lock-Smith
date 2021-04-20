import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { auth } from './utils/firebase.config';
import axios from 'axios';

import './App.css';
import Home from './components/Home/Home/Home';
import { useContext } from 'react';
import { store } from './store/store';
import { loginAction } from './store/action/action';
import { useEffect } from 'react';
import Login from './components/Login/Login';
import UserWrapper from './components/UserWrapper/UserWrapper';
import BookOrder from './components/BookOrder/BookOrder';
import UserRoute from './components/UserRoute/UserRoute';
import CreateReview from './components/CreateReview/CreateReview';
import BookingsOfUser from './components/BookingsOfUser/BookingsOfUser';
import BookingsOfAdmin from './components/BookingsOfAdmin/BookingsOfAdmin';
import AdminWrapper from './components/AdminWrapper/AdminWrapper';
import CreateService from './components/CreateService/CreateService';
import AdminRoute from './components/AdminRoute/AdminRoute';
import ManageServices from './components/ManageServices/ManageServices';
import CreateAdmin from './components/CreateAdmin/CreateAdmin';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#ff3b3e',
    },
    primary: {
      main: '#462b34',
    },
  },
});

function App() {
  const {
    dispatch,
    state: { user: loggedInUser },
  } = useContext(store);

  const currentUser = async (authToken) => {
    console.log({ authToken });
    return axios.post(
      'http://localhost:5000/current-user',
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const res = await currentUser(idTokenResult.token);

          dispatch(loginAction(res.data, idTokenResult.token));
        }
      } catch (error) {
        console.log(error);
      }
    });

    // clean up
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <UserRoute exact path='/book/:id'>
            <UserWrapper>
              <BookOrder />
            </UserWrapper>
          </UserRoute>

          {loggedInUser &&
            (loggedInUser.role === 'user' ? (
              <UserWrapper>
                <UserRoute exact path='/create-review'>
                  <CreateReview />
                </UserRoute>

                <UserRoute exact path='/book/:id'>
                  <BookOrder />
                </UserRoute>

                <UserRoute exact path='/bookingList'>
                  <BookingsOfUser />
                </UserRoute>
              </UserWrapper>
            ) : (
              <AdminWrapper>
                <AdminRoute exact path='/addService'>
                  <CreateService />
                </AdminRoute>

                <AdminRoute exact path='/manageServices'>
                  <ManageServices />
                </AdminRoute>

                <AdminRoute exact path='/makeAdmin'>
                  <CreateAdmin />
                </AdminRoute>

                <AdminRoute exact path='/allBookings'>
                  <BookingsOfAdmin />
                </AdminRoute>
              </AdminWrapper>
            ))}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
