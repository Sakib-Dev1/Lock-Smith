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
import OrderCondition from '../OrderCondition/OrderCondition';
import { EditOutlined } from '@material-ui/icons';
import { getOrdersAction } from '../../store/action/action';
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

  center: {
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

export default function BookingsOfAdmin() {
  const classes = useStyles();
  const [currentStatus, setCurrentStatus] = useState('');

  const {
    dispatch,
    state: { user, orders },
  } = useContext(store);

  const onChangeHandler = (selectedStatus) => {
    setCurrentStatus(selectedStatus);
  };

  const updateOrder = async (authToken, order, id) => {
    return axios.put(
      `http://localhost:5000/orders/${id}`,
      { order },
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const getOrders = async (authToken) => {
    return axios.get('http://localhost:5000/orders', {
      headers: {
        authToken,
      },
    });
  };

  const handleUpdate = async (order) => {
    if (currentStatus === 10) {
      order.status = 'pending';
    } else if (currentStatus === 20) {
      order.status = 'on going';
    } else {
      order.status = 'done';
    }

    await updateOrder(user.token, order, order._id);

    const orders = await getOrders(user.token);

    dispatch(getOrdersAction(orders.data));
  };

  useEffect(() => {
    const loadOrders = async () => {
      const orders = await getOrders(user.token);

      dispatch(getOrdersAction(orders.data));
    };

    loadOrders();

    console.log(orders);
  }, []);

  return (
    <div className={classes.center}>
      {
        <>
          <Container maxWidth='lg'>
            <Typography
              style={{ marginBottom: '1rem', color: '#ff3b3e' }}
              variant='h4'
            >
              All Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='simple table'>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell className={classes.cell}>Name</TableCell>
                    <TableCell className={classes.cell}>Email</TableCell>

                    <TableCell className={classes.cell}>Service</TableCell>

                    <TableCell className={classes.cell}>Status</TableCell>

                    <TableCell className={classes.cell}>
                      Change Status
                    </TableCell>

                    <TableCell className={classes.cell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length > 0 &&
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.email}</TableCell>

                        <TableCell>{order.service.title}</TableCell>

                        <TableCell>{order.status}</TableCell>

                        <TableCell>
                          <OrderCondition onChangeHandler={onChangeHandler} />
                        </TableCell>

                        <TableCell>
                          <EditOutlined
                            onClick={() => handleUpdate(order)}
                            style={{ cursor: 'pointer' }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </>
      }
    </div>
  );
}
