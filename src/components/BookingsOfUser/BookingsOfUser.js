import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Typography } from '@material-ui/core';
import { store } from '../../store/store';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 950,

    [theme.breakpoints.down('lg')]: {
      minWidth: 500,
    },

    [theme.breakpoints.down('sm')]: {
      minWidth: 100,
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 100,
    },
  },

  middle: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10rem',

    [theme.breakpoints.down('xs')]: {
      postion: 'relative',
      paddingLeft: '0',
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: '5rem',
    },
  },

  tableHead: {
    backgroundColor: '#ff3b3e',
  },

  cell: {
    fontWeight: 900,
    color: '#fff',
  },
}));

export default function BookingsOfUser() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  const {
    state: { user },
  } = useContext(store);

  useEffect(() => {
    const getUserOrders = async (authToken) => {
      return axios.get('http://localhost:5000/orders', {
        headers: {
          authToken,
        },
      });
    };
    const fetchOrders = async () => {
      const orders = await getUserOrders(user.token);
      setOrders(orders.data);
    };

    fetchOrders();

    console.log(orders);
  }, []);

  return (
    <div className={classes.middle}>
      <>
        <Container maxWidth='lg'>
          <Typography
            style={{ marginBottom: '1rem', color: '#ff3b3e' }}
            variant='h4'
          >
            Your Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell className={classes.cell}>Service</TableCell>
                  <TableCell className={classes.cell}>Price</TableCell>
                  <TableCell className={classes.cell}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 &&
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.service.title}</TableCell>
                      <TableCell>${order.service.price}</TableCell>
                      <TableCell>{order.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
    </div>
  );
}
