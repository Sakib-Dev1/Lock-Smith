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
import axios from 'axios';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExitToApp } from '@material-ui/icons';
import { useContext, useState } from 'react';

import { uploadImageToServer } from '../../utils/imagebb.config';
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
  title: yup
    .string()
    .matches(/^([^0-9]*)$/, 'title should not contain numbers')
    .required('title is a required field'),
  description: yup
    .string()
    .matches(/^([^0-9]*)$/, 'description should not contain numbers')
    .required('description is a required field'),

  price: yup
    .string()
    .matches(/^[0-9]*$/, 'price should be a number')
    .required('price is a required field'),
});

const CreateService = () => {
  const {
    state: { user },
  } = useContext(store);
  const [status, setStaus] = useState('');
  const [imageURL, setImageURL] = useState(null);
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

  const handleImageUpload = async (e) => {
    try {
      setStaus('image is uploading...');
      const imageData = new FormData();
      imageData.set('key', '66283deb8da9fc831b0db8ea72f421f1');
      imageData.append('image', e.target.files[0]);
      const url = await uploadImageToServer(imageData);
      setImageURL(url);
      setStaus('image is uploaded!');
    } catch (error) {
      console.log(error);
    }
  };

  const createService = async (authToken, service) => {
    return axios.post(
      'http://localhost:5000/services',
      { service },
      {
        headers: {
          authToken,
        },
      }
    );
  };

  const onSubmit = async (data) => {
    console.log({ data });
    const service = {
      title: data.title,
      description: data.description,
      price: data.price,
      image: imageURL,
    };

    await createService(user.token, service);

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
                Add Service
              </Typography>
            </span>
          </Grid>
        </Typography>
        <GenericForm onSubmit={handleSubmit(onSubmit)}>
          <GenericInput
            {...register('title')}
            type='text'
            name='title'
            label='Service title'
            error={!!errors.title}
            helperText={errors?.title?.message}
          />

          <GenericInput
            {...register('description')}
            type='text'
            name='description'
            label='Service Description'
            error={!!errors.description}
            helperText={errors?.description?.message}
          />

          <GenericInput
            {...register('price')}
            type='text'
            name='price'
            label='Price'
            error={!!errors.price}
            helperText={errors?.price?.message}
          />

          <GenericInput
            {...register('image')}
            type='file'
            name='image'
            onChange={handleImageUpload}
          />

          {status && <p>{status}</p>}
          <Button
            style={{ background: '#ff3b3e', color: 'white' }}
            type='submit'
          >
            Create
          </Button>
        </GenericForm>
      </Container>
    </div>
  );
};

export default CreateService;
