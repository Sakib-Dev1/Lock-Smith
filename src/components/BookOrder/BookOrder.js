import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import GenericForm from '../../components/GenericForm/GenericForm';
import GenericInput from '../../components/GenericInput/GenericInput';

import { ExitToApp } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';

import { store } from '../../store/store';

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '7rem',
    },
  },

  margin: {
    marginLeft: '1rem',
    color: '#ff3b3e',
  },
}));

const BookOrder = () => {
  const { id } = useParams();
  const {
    state: { user },
  } = useContext(store);

  const [service, setService] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const classes = useStyles();

  const history = useHistory();

  const createOrder = async (authToken, order) => {
    return axios.post(
      'http://localhost:5000/orders',
      { order },
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const getServiceById = async (authToken, id) => {
    return axios.get(
      `http://localhost:5000/services/${id}`,
      // {},
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(paymentInfo);
    const order = {
      name: user.name,
      service: service._id,
    };

    await createOrder(user.token, order);

    history.push('/');
  };

  useEffect(() => {
    const loadService = async () => {
      const service = await getServiceById(user.token, id);
      console.log({ service });
      setService(service.data);
    };

    try {
      loadService();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={classes.center}>
      <Box m={12} />
      <Container maxWidth='sm'>
        <Typography style={{ color: '#ff3b3e' }} component='h2' variant='h4'>
          <Grid container direction='row' alignItems='center'>
            <ExitToApp />
            <span className={classes.margin}>
              <Typography style={{ color: '' }} variant='h4'>
                Order this service
              </Typography>
            </span>
          </Grid>
        </Typography>

        {/* <ProcessPayment handlePayment={handlePayment} /> */}

        <GenericForm onSubmit={handleSubmit}>
          <GenericInput
            type='text'
            name='name'
            label='User Name'
            value={user.name}
            readOnly={true}
          />

          <GenericInput
            type='text'
            name='email'
            label='email'
            value={user.email}
            readOnly={true}
          />

          <GenericInput
            type='text'
            name='service'
            value={service.title}
            readOnly={true}
          />

          <Typography
            variant='body2'
            color='primary'
            style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
          >
            *Your Service Charge will be ${service.price}
          </Typography>

          <Button
            style={{ background: '#ff3b3e', color: 'white' }}
            type='submit'
          >
            Save
          </Button>
        </GenericForm>
      </Container>
    </div>
  );
};

export default BookOrder;
