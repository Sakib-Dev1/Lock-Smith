import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import GenericForm from '../../components/GenericForm/GenericForm';
import GenericInput from '../../components/GenericInput/GenericInput';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExitToApp } from '@material-ui/icons';
import { useContext, useState } from 'react';

import { store } from '../../store/store';
import axios from 'axios';

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

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^([^0-9]*)$/, 'email should not contain numbers')
    .required('email is a required field'),
});

const CreateAdmin = () => {
  const {
    state: { user },
  } = useContext(store);
  const [error, setError] = useState('');
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const makeAdmin = async (authToken, email) => {
    let res;
    try {
      res = await axios.put(
        'http://localhost:5000/make-admin',
        { email },
        { headers: { authToken } }
      );
    } catch (error) {
      console.log({ error });
      const { response } = error;

      res = response.data.message;
      setError(res);
    }
    return res;
  };

  const onSubmit = async (data) => {
    console.log({ data });
    const service = {
      email: data.email,
    };

    const res = await makeAdmin(user.token, service.email);

    console.log({ res });

    if (res === 'user not found') {
      setError('user not found by given email');
    } else {
      setError('');
      history.push('/');
    }
  };

  return (
    <div className={classes.center}>
      <Box m={12} />
      <Container maxWidth='sm'>
        <Typography style={{ color: '#ff3b3e' }} component='h2' variant='h4'>
          <Grid container direction='row' alignItems='center'>
            <ExitToApp />

            <span className={classes.margin}>
              <>
                <Typography style={{ color: '#ff3b3e' }} variant='h4'>
                  Make Admin
                </Typography>
                <Typography varinat='h6' style={{ color: '#e3e' }}>
                  {error}
                </Typography>
              </>
            </span>
          </Grid>
        </Typography>
        <GenericForm onSubmit={handleSubmit(onSubmit)}>
          <GenericInput
            {...register('email')}
            type='text'
            name='email'
            label='Enter email of a user'
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

          <Button
            style={{ background: '#ff3b3e', color: 'white' }}
            type='submit'
          >
            Update
          </Button>
        </GenericForm>
      </Container>
    </div>
  );
};

export default CreateAdmin;
