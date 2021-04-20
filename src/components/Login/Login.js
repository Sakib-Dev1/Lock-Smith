import { Button, Container, makeStyles, Paper } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { auth, googleAuthProvider } from '../../utils/firebase.config';
import { store } from '../../store/store';
import { loginAction } from '../../store/action/action';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },

  google: {
    backgroundColor: '#462b34',
    color: '#fff',
  },
}));

const Login = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  let { from } = location.state || { from: { pathname: '/' } };

  const conditionalRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/addService');
    } else {
      history.push(from);
    }
  };

  const createOrUpdateUser = async (authToken) => {
    return axios.post(
      'http://localhost:5000/create-or-update-user',
      {},
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const idTokenResult = await result.user.getIdTokenResult();
      const res = await createOrUpdateUser(idTokenResult.token);
      dispatch(loginAction(res.data, idTokenResult.token));
      conditionalRedirect(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.name) {
      history.replace(from);
    }
  }, [user]);

  return (
    <Container>
      <div className={classes.center}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleGoogleSignIn}
          className={classes.google}
        >
          Login With Google
        </Button>
      </div>
    </Container>
  );
};

export default Login;
