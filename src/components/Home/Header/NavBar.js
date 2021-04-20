import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { Wifi } from '@material-ui/icons';
import { store } from '../../../store/store';
import { useHistory } from 'react-router';
import { auth } from '../../../utils/firebase.config';
import { logOutAction } from '../../../store/action/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();

  const {
    dispatch,
    state: { user },
  } = useContext(store);

  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#1B1B1B' }} position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Wifi />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Xpress
          </Typography>

          {user?.name ? (
            <>
              <Button
                onClick={() => {
                  if (user.role === 'admin') {
                    history.push('/addService');
                  } else {
                    history.push('/bookingList');
                  }
                }}
                color='inherit'
              >
                {user.role === 'admin' ? 'Admin dashboard' : user.name}
              </Button>

              <Button
                onClick={() => {
                  auth.signOut();
                  dispatch(logOutAction());
                }}
                color='inherit'
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button onClick={() => history.push('/login')} color='inherit'>
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
