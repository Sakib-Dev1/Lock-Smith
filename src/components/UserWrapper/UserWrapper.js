import { useContext } from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

import { BookOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { store } from '../../store/store';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '1rem',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },

  drawerPaper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    paddingTop: '2rem',
    width: drawerWidth,
    backgroundImage: 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)',
    color: '#fff',
  },

  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    marginTop: '4rem',
    width: drawerWidth,
  },

  active: {
    background: '#462b34',
  },
}));

const UserWrapper = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const items = [
    {
      text: 'Home',
      icon: <BookOutlined />,
      path: '/',
    },

    {
      text: 'Booking List',
      icon: <SubjectOutlined />,
      path: '/bookingList',
    },

    {
      text: 'Review',
      icon: <SubjectOutlined />,
      path: '/create-review',
    },
  ];

  const drawerProps = {
    anchor: isSmallScreen ? 'top' : 'left',
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        {...drawerProps}
        classes={{ paper: classes.drawerPaper }}
        variant='permanent'
      >
        <List>
          {items.map((item) => (
            <>
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon style={{ color: '#fff' }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>

      <div>{children}</div>
    </div>
  );
};

export default UserWrapper;
