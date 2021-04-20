import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExitToApp } from '@material-ui/icons';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import GenericForm from '../../components/GenericForm/GenericForm';
import GenericInput from '../../components/GenericInput/GenericInput';

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

const schema = yup.object().shape({
  description: yup.string().required('description is a required field'),
});

const CreateReview = () => {
  const {
    state: { user },
  } = useContext(store);
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

  const makeReview = async (authToken, review) => {
    return axios.post(
      'http://localhost:5000/reviews',
      { review },
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const onSubmit = async (data) => {
    console.log({ data });
    const review = {
      description: data.description,
      name: user.name,
    };

    await makeReview(user.token, review);

    history.push('/');
  };

  return (
    <div className={classes.center}>
      <Box m={12} />
      <Container maxWidth='sm'>
        <Typography style={{ color: '#ff3b3e' }} component='h2' variant='h4'>
          <Grid container direction='row' alignItems='center'>
            <ExitToApp />
            <span className={classes.margin}>
              <Typography style={{ color: '#ff3b3e' }} variant='h4'>
                Give a Review
              </Typography>
            </span>
          </Grid>
        </Typography>
        <GenericForm onSubmit={handleSubmit(onSubmit)}>
          <GenericInput
            {...register('name')}
            type='text'
            name='name'
            label='User Name'
            value={user.name}
            readOnly={true}
          />

          <GenericInput
            {...register('description')}
            type='text'
            name='description'
            label='description'
            error={!!errors.description}
            helperText={errors?.description?.message}
          />

          <Button
            style={{ background: '#ff3b3e', color: 'white' }}
            type='submit'
          >
            Submit
          </Button>
        </GenericForm>
      </Container>
    </div>
  );
};

export default CreateReview;
