import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { store } from '../../store/store';
import { getServicesAction } from '../../store/action/action';
import { Button, Container, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
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

export default function ManageServices() {
  const classes = useStyles();

  const {
    dispatch,
    state: { services, user },
  } = useContext(store);

  const getServices = async () => {
    return axios.get('http://localhost:5000/services');
  };

  const deleteServiceById = async (authToken, id) => {
    return axios.delete(
      `http://localhost:5000/services/${id}`,

      {
        headers: {
          authToken,
        },
      }
    );
  };

  useEffect(() => {
    const fetchServices = async () => {
      const allServices = await getServices();
      dispatch(getServicesAction(allServices.data));
    };

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    await deleteServiceById(user.token, id);
    const allServices = await getServices();
    dispatch(getServicesAction(allServices.data));
  };

  return (
    <div className={classes.center}>
      <Container maxWidth='lg'>
        <Typography
          style={{ marginBottom: '1rem', color: '#ff3b3e' }}
          variant='h4'
        >
          All Services
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.cell}>Service Title</TableCell>
                <TableCell className={classes.cell}>Price</TableCell>
                <TableCell className={classes.cell}>Speed</TableCell>
                <TableCell className={classes.cell}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.length > 0 &&
                services.map((service) => (
                  <TableRow key={service.title}>
                    <TableCell component='th' scope='row'>
                      {service.title}
                    </TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.speed} Mbps</TableCell>
                    <TableCell>
                      <Button onClick={async () => handleDelete(service._id)}>
                        <DeleteOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}
